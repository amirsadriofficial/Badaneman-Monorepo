import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationType } from '@prisma/client';
import { paginate, paginatedResult, PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async list(query: PaginationDto, isRead?: boolean, type?: NotificationType) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const { take, skip } = paginate(page, limit);
    const where = {
      ...(isRead !== undefined ? { isRead } : {}),
      ...(type ? { type } : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.notification.count({ where }),
    ]);

    return paginatedResult(items, total, page, limit);
  }

  getUnreadCount() {
    return this.prisma.notification.count({ where: { isRead: false } });
  }

  async markRead(id: string, adminId: string) {
    const notification = await this.prisma.notification.findUnique({ where: { id } });
    if (!notification) throw new NotFoundException('اعلان یافت نشد');

    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true, readById: adminId },
    });
  }

  async markAllRead(adminId: string) {
    await this.prisma.notification.updateMany({
      where: { isRead: false },
      data: { isRead: true, readById: adminId },
    });
    return { message: 'همه اعلان‌ها خوانده شد' };
  }
}
