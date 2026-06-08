import { Injectable } from '@nestjs/common';
import { AuditAction, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async log(params: {
    adminId?: string;
    action: AuditAction;
    entity: string;
    entityId?: string;
    changes?: unknown;
  }) {
    return this.prisma.auditLog.create({
      data: {
        ...params,
        changes: params.changes as Prisma.InputJsonValue | undefined,
      },
    });
  }
}
