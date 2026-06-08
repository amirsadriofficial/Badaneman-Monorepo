import { Injectable } from '@nestjs/common';
import { AuditAction } from '@prisma/client';
import { paginate, paginatedResult, PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditLogService {
  constructor(private prisma: PrismaService) {}

  async list(query: PaginationDto, entity?: string, action?: AuditAction) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const { take, skip } = paginate(page, limit);
    const where = {
      ...(entity ? { entity } : {}),
      ...(action ? { action } : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          admin: { select: { id: true, username: true, fullName: true } },
        },
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return paginatedResult(items, total, page, limit);
  }
}
