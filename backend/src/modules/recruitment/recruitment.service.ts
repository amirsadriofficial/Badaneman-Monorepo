import { Injectable, NotFoundException } from '@nestjs/common';
import { ApplicationStatus, AuditAction, NotificationType } from '@prisma/client';
import { paginate, paginatedResult, PaginationDto } from '../../common/dto/pagination.dto';
import { AuditService } from '../../common/services/audit.service';
import { NotificationHelperService } from '../../common/services/notification.service';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateApplicationDto,
  CreatePositionDto,
  UpdateApplicationDto,
  UpdatePositionDto,
} from './dto/recruitment.dto';

@Injectable()
export class RecruitmentService {
  constructor(
    private prisma: PrismaService,
    private audit: AuditService,
    private notifications: NotificationHelperService,
  ) {}

  getPositions() {
    return this.prisma.recruitmentPosition.findMany({
      where: { deletedAt: null, isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createApplication(dto: CreateApplicationDto, userId?: string) {
    const position = await this.prisma.recruitmentPosition.findFirst({
      where: { id: dto.positionId, deletedAt: null, isActive: true },
    });
    if (!position) throw new NotFoundException('موقعیت شغلی یافت نشد');

    const application = await this.prisma.recruitmentApplication.create({
      data: {
        userId,
        fullName: dto.fullName,
        mobile: dto.mobile,
        positionId: dto.positionId,
        description: dto.description,
        resumeUrl: dto.resumeUrl,
      },
      include: { position: true },
    });

    await this.notifications.create(
      NotificationType.recruitment,
      'درخواست استخدام جدید',
      `${dto.fullName} برای ${position.title} درخواست داد`,
      application.id,
    );

    return application;
  }

  adminListPositions() {
    return this.prisma.recruitmentPosition.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createPosition(dto: CreatePositionDto, adminId: string) {
    const result = await this.prisma.recruitmentPosition.create({ data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.create,
      entity: 'recruitment_position',
      entityId: result.id,
    });
    return result;
  }

  async updatePosition(id: string, dto: UpdatePositionDto, adminId: string) {
    await this.ensurePosition(id);
    const result = await this.prisma.recruitmentPosition.update({ where: { id }, data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'recruitment_position',
      entityId: id,
      changes: dto,
    });
    return result;
  }

  async deletePosition(id: string, adminId: string) {
    await this.ensurePosition(id);
    const result = await this.prisma.recruitmentPosition.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    await this.audit.log({
      adminId,
      action: AuditAction.delete,
      entity: 'recruitment_position',
      entityId: id,
    });
    return result;
  }

  async listApplications(query: PaginationDto, status?: ApplicationStatus) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const { take, skip } = paginate(page, limit);
    const where = {
      deletedAt: null,
      ...(status ? { status } : {}),
      ...(query.search
        ? {
            OR: [
              { fullName: { contains: query.search, mode: 'insensitive' as const } },
              { mobile: { contains: query.search } },
              { position: { title: { contains: query.search, mode: 'insensitive' as const } } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.recruitmentApplication.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: { position: true, user: { select: { id: true, fullName: true, mobile: true } } },
      }),
      this.prisma.recruitmentApplication.count({ where }),
    ]);

    return paginatedResult(items, total, page, limit);
  }

  async updateApplication(id: string, dto: UpdateApplicationDto, adminId: string) {
    await this.ensureApplication(id);
    const result = await this.prisma.recruitmentApplication.update({
      where: { id },
      data: dto,
      include: { position: true },
    });

    const action =
      dto.status === ApplicationStatus.hired || dto.status === ApplicationStatus.interview
        ? AuditAction.approve
        : dto.status === ApplicationStatus.rejected
          ? AuditAction.reject
          : AuditAction.update;

    await this.audit.log({
      adminId,
      action,
      entity: 'recruitment_application',
      entityId: id,
      changes: dto,
    });

    return result;
  }

  private async ensurePosition(id: string) {
    const item = await this.prisma.recruitmentPosition.findFirst({
      where: { id, deletedAt: null },
    });
    if (!item) throw new NotFoundException('موقعیت شغلی یافت نشد');
  }

  private async ensureApplication(id: string) {
    const item = await this.prisma.recruitmentApplication.findFirst({
      where: { id, deletedAt: null },
    });
    if (!item) throw new NotFoundException('درخواست استخدام یافت نشد');
  }
}
