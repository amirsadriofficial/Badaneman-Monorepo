import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditAction } from '@prisma/client';
import { paginate, paginatedResult, PaginationDto } from '../../common/dto/pagination.dto';
import { AuditService } from '../../common/services/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSmsTemplateDto, UpdateSmsTemplateDto } from './dto/sms.dto';

@Injectable()
export class SmsService {
  constructor(
    private prisma: PrismaService,
    private audit: AuditService,
  ) {}

  listTemplates() {
    return this.prisma.smsTemplate.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    });
  }

  async createTemplate(dto: CreateSmsTemplateDto, adminId: string) {
    const result = await this.prisma.smsTemplate.create({ data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.create,
      entity: 'sms_template',
      entityId: result.id,
    });
    return result;
  }

  async updateTemplate(id: string, dto: UpdateSmsTemplateDto, adminId: string) {
    await this.ensureTemplate(id);
    const result = await this.prisma.smsTemplate.update({ where: { id }, data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'sms_template',
      entityId: id,
      changes: dto,
    });
    return result;
  }

  async deleteTemplate(id: string, adminId: string) {
    await this.ensureTemplate(id);
    const result = await this.prisma.smsTemplate.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    await this.audit.log({
      adminId,
      action: AuditAction.delete,
      entity: 'sms_template',
      entityId: id,
    });
    return result;
  }

  async listLogs(query: PaginationDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const { take, skip } = paginate(page, limit);
    const where = query.search
      ? {
          OR: [
            { recipient: { contains: query.search } },
            { message: { contains: query.search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      this.prisma.smsLog.findMany({
        where,
        skip,
        take,
        orderBy: { sentAt: 'desc' },
      }),
      this.prisma.smsLog.count({ where }),
    ]);

    return paginatedResult(items, total, page, limit);
  }

  private async ensureTemplate(id: string) {
    const item = await this.prisma.smsTemplate.findFirst({ where: { id, deletedAt: null } });
    if (!item) throw new NotFoundException('قالب پیامک یافت نشد');
  }
}
