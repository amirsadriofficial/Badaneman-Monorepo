import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AuditAction, DeliveryType, NotificationType, OrderStatus } from '@prisma/client';
import { paginate, paginatedResult, PaginationDto } from '../../common/dto/pagination.dto';
import { AuditService } from '../../common/services/audit.service';
import { NotificationHelperService } from '../../common/services/notification.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/orders.dto';

const orderInclude = {
  items: {
    include: {
      product: { select: { id: true, name: true, slug: true } },
      variant: { select: { id: true, name: true, sku: true } },
    },
  },
};

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private audit: AuditService,
    private notifications: NotificationHelperService,
  ) {}

  async createOrder(userId: string, dto: CreateOrderDto) {
    if (dto.deliveryType === DeliveryType.delivery && !dto.address) {
      throw new BadRequestException('آدرس تحویل الزامی است');
    }

    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: { include: { variants: { where: { deletedAt: null } } } },
            variant: true,
          },
        },
      },
    });

    if (!cart?.items.length) throw new BadRequestException('سبد خرید خالی است');

    const deliverySettings = await this.prisma.deliverySettings.findUnique({
      where: { id: 'default' },
    });
    const deliveryFee =
      dto.deliveryType === DeliveryType.delivery ? (deliverySettings?.courierFee ?? 0) : 0;

    let total = deliveryFee;
    const orderItems: {
      productId: string;
      variantId?: string;
      name: string;
      quantity: number;
      unitPrice: number;
      total: number;
    }[] = [];

    for (const item of cart.items) {
      if (item.product.deletedAt || !item.product.isActive) {
        throw new BadRequestException(`محصول ${item.product.name} در دسترس نیست`);
      }

      const variant = item.variantId
        ? item.variant ?? item.product.variants.find((v) => v.id === item.variantId)
        : item.product.variants[0];

      if (!variant) throw new BadRequestException('تنوع محصول یافت نشد');
      if (variant.stock < item.quantity) {
        throw new BadRequestException(`موجودی ${item.product.name} کافی نیست`);
      }

      const unitPrice = variant.priceModifier;
      const lineTotal = unitPrice * item.quantity;
      total += lineTotal;

      orderItems.push({
        productId: item.productId,
        variantId: variant.id,
        name: `${item.product.name}${variant.name ? ` - ${variant.name}` : ''}`,
        quantity: item.quantity,
        unitPrice,
        total: lineTotal,
      });
    }

    const order = await this.prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          userId,
          deliveryType: dto.deliveryType,
          address: dto.address,
          phone: dto.phone,
          deliveryFee,
          total,
          receiptUrl: dto.receiptUrl,
          notes: dto.notes,
          items: { create: orderItems },
        },
        include: orderInclude,
      });

      for (const item of cart.items) {
        if (item.variantId) {
          await tx.productVariant.update({
            where: { id: item.variantId },
            data: { stock: { decrement: item.quantity } },
          });
        }
      }

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      return created;
    });

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { fullName: true, mobile: true },
    });

    await this.notifications.create(
      NotificationType.order,
      'سفارش جدید',
      `${user.fullName ?? user.mobile} سفارش جدید ثبت کرد`,
      order.id,
    );

    return order;
  }

  async getUserOrders(userId: string, query: PaginationDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const { take, skip } = paginate(page, limit);
    const where = { userId, deletedAt: null };

    const [items, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: orderInclude,
      }),
      this.prisma.order.count({ where }),
    ]);

    return paginatedResult(items, total, page, limit);
  }

  async adminListOrders(query: PaginationDto, status?: OrderStatus) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const { take, skip } = paginate(page, limit);
    const where = {
      deletedAt: null,
      ...(status ? { status } : {}),
      ...(query.search
        ? {
            OR: [
              { user: { fullName: { contains: query.search, mode: 'insensitive' as const } } },
              { user: { mobile: { contains: query.search } } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          ...orderInclude,
          user: { select: { id: true, fullName: true, mobile: true } },
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    return paginatedResult(items, total, page, limit);
  }

  async updateOrderStatus(id: string, dto: UpdateOrderStatusDto, adminId: string) {
    const order = await this.prisma.order.findFirst({ where: { id, deletedAt: null } });
    if (!order) throw new NotFoundException('سفارش یافت نشد');

    const result = await this.prisma.order.update({
      where: { id },
      data: dto,
      include: {
        ...orderInclude,
        user: { select: { id: true, fullName: true, mobile: true } },
      },
    });

    const action =
      dto.status === OrderStatus.approved ||
      dto.status === OrderStatus.completed ||
      dto.status === OrderStatus.ready_for_pickup ||
      dto.status === OrderStatus.shipped
        ? AuditAction.approve
        : dto.status === OrderStatus.rejected
          ? AuditAction.reject
          : AuditAction.update;

    await this.audit.log({
      adminId,
      action,
      entity: 'order',
      entityId: id,
      changes: dto,
    });

    return result;
  }
}
