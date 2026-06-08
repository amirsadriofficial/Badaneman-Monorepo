import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditAction } from '@prisma/client';
import { paginate, paginatedResult, PaginationDto } from '../../common/dto/pagination.dto';
import { AuditService } from '../../common/services/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateCategoryDto,
  CreateProductDto,
  CreateVariantDto,
  UpdateCategoryDto,
  UpdateInventoryDto,
  UpdateProductDto,
  UpdateVariantDto,
} from './dto/store.dto';

const productInclude = {
  category: true,
  variants: { where: { deletedAt: null } },
  images: { orderBy: { sortOrder: 'asc' as const } },
};

@Injectable()
export class StoreService {
  constructor(
    private prisma: PrismaService,
    private audit: AuditService,
  ) {}

  getCategories() {
    return this.prisma.storeCategory.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    });
  }

  async getProducts(query: PaginationDto, categorySlug?: string) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const { take, skip } = paginate(page, limit);
    const where = {
      deletedAt: null,
      isActive: true,
      ...(categorySlug ? { category: { slug: categorySlug, deletedAt: null } } : {}),
      ...(query.search
        ? {
            OR: [
              { name: { contains: query.search, mode: 'insensitive' as const } },
              { description: { contains: query.search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: productInclude,
      }),
      this.prisma.product.count({ where }),
    ]);

    return paginatedResult(items, total, page, limit);
  }

  async getProduct(slug: string) {
    const product = await this.prisma.product.findFirst({
      where: { slug, deletedAt: null, isActive: true },
      include: productInclude,
    });
    if (!product) throw new NotFoundException('محصول یافت نشد');
    return product;
  }

  adminListCategories() {
    return this.getCategories();
  }

  async createCategory(dto: CreateCategoryDto, adminId: string) {
    const result = await this.prisma.storeCategory.create({ data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.create,
      entity: 'store_category',
      entityId: result.id,
    });
    return result;
  }

  async updateCategory(id: string, dto: UpdateCategoryDto, adminId: string) {
    await this.ensureCategory(id);
    const result = await this.prisma.storeCategory.update({ where: { id }, data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'store_category',
      entityId: id,
      changes: dto,
    });
    return result;
  }

  async deleteCategory(id: string, adminId: string) {
    await this.ensureCategory(id);
    const result = await this.prisma.storeCategory.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    await this.audit.log({
      adminId,
      action: AuditAction.delete,
      entity: 'store_category',
      entityId: id,
    });
    return result;
  }

  async adminListProducts(query: PaginationDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const { take, skip } = paginate(page, limit);
    const where = {
      deletedAt: null,
      ...(query.search
        ? {
            OR: [
              { name: { contains: query.search, mode: 'insensitive' as const } },
              { sku: { contains: query.search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: productInclude,
      }),
      this.prisma.product.count({ where }),
    ]);

    return paginatedResult(items, total, page, limit);
  }

  async createProduct(dto: CreateProductDto, adminId: string) {
    const { variants, images, ...data } = dto;
    const result = await this.prisma.product.create({
      data: {
        ...data,
        variants: variants?.length ? { create: variants } : undefined,
        images: images?.length ? { create: images } : undefined,
      },
      include: productInclude,
    });
    await this.audit.log({
      adminId,
      action: AuditAction.create,
      entity: 'product',
      entityId: result.id,
    });
    return result;
  }

  async updateProduct(id: string, dto: UpdateProductDto, adminId: string) {
    await this.ensureProduct(id);
    const result = await this.prisma.product.update({
      where: { id },
      data: dto,
      include: productInclude,
    });
    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'product',
      entityId: id,
      changes: dto,
    });
    return result;
  }

  async deleteProduct(id: string, adminId: string) {
    await this.ensureProduct(id);
    const result = await this.prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    await this.audit.log({ adminId, action: AuditAction.delete, entity: 'product', entityId: id });
    return result;
  }

  async addVariant(productId: string, dto: CreateVariantDto, adminId: string) {
    await this.ensureProduct(productId);
    const result = await this.prisma.productVariant.create({
      data: { ...dto, productId },
    });
    await this.audit.log({
      adminId,
      action: AuditAction.create,
      entity: 'product_variant',
      entityId: result.id,
    });
    return result;
  }

  async updateVariant(variantId: string, dto: UpdateVariantDto, adminId: string) {
    await this.ensureVariant(variantId);
    const result = await this.prisma.productVariant.update({ where: { id: variantId }, data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'product_variant',
      entityId: variantId,
      changes: dto,
    });
    return result;
  }

  async updateInventory(variantId: string, dto: UpdateInventoryDto, adminId: string) {
    await this.ensureVariant(variantId);
    const result = await this.prisma.productVariant.update({
      where: { id: variantId },
      data: { stock: dto.stock },
    });
    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'product_variant',
      entityId: variantId,
      changes: { stock: dto.stock },
    });
    return result;
  }

  async getInventoryReport() {
    return this.prisma.productVariant.findMany({
      where: { deletedAt: null, product: { deletedAt: null } },
      include: { product: { select: { id: true, name: true, sku: true, lowStockThreshold: true } } },
      orderBy: { stock: 'asc' },
    });
  }

  private async ensureCategory(id: string) {
    const item = await this.prisma.storeCategory.findFirst({ where: { id, deletedAt: null } });
    if (!item) throw new NotFoundException('دسته‌بندی یافت نشد');
  }

  private async ensureProduct(id: string) {
    const item = await this.prisma.product.findFirst({ where: { id, deletedAt: null } });
    if (!item) throw new NotFoundException('محصول یافت نشد');
  }

  private async ensureVariant(id: string) {
    const item = await this.prisma.productVariant.findFirst({ where: { id, deletedAt: null } });
    if (!item) throw new NotFoundException('تنوع محصول یافت نشد');
  }
}
