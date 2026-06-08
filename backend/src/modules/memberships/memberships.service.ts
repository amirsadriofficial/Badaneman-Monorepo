import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditAction, MembershipStatus, NotificationType } from '@prisma/client';
import { paginate, paginatedResult, PaginationDto } from '../../common/dto/pagination.dto';
import { AuditService } from '../../common/services/audit.service';
import { NotificationHelperService } from '../../common/services/notification.service';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateMembershipPlanDto,
  CreateMembershipRequestDto,
  UpdateMembershipPlanDto,
  UpdateMembershipRequestDto,
} from './dto/memberships.dto';

@Injectable()
export class MembershipsService {
  constructor(
    private prisma: PrismaService,
    private audit: AuditService,
    private notifications: NotificationHelperService,
  ) {}

  getPlans() {
    return this.prisma.membershipPlan.findMany({
      where: { deletedAt: null, isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async createRequest(userId: string, dto: CreateMembershipRequestDto) {
    const plan = await this.prisma.membershipPlan.findFirst({
      where: { id: dto.planId, deletedAt: null, isActive: true },
    });
    if (!plan) throw new NotFoundException('پلن عضویت یافت نشد');

    const request = await this.prisma.membershipRequest.create({
      data: { userId, planId: dto.planId, receiptUrl: dto.receiptUrl, notes: dto.notes },
      include: { plan: true, user: { select: { id: true, fullName: true, mobile: true } } },
    });

    await this.notifications.create(
      NotificationType.membership,
      'درخواست عضویت جدید',
      `${request.user.fullName ?? request.user.mobile} درخواست عضویت ${plan.name} ثبت کرد`,
      request.id,
    );

    return request;
  }

  adminListPlans() {
    return this.prisma.membershipPlan.findMany({
      where: { deletedAt: null },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async createPlan(dto: CreateMembershipPlanDto, adminId: string) {
    const result = await this.prisma.membershipPlan.create({ data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.create,
      entity: 'membership_plan',
      entityId: result.id,
    });
    return result;
  }

  async updatePlan(id: string, dto: UpdateMembershipPlanDto, adminId: string) {
    await this.ensurePlan(id);
    const result = await this.prisma.membershipPlan.update({ where: { id }, data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'membership_plan',
      entityId: id,
      changes: dto,
    });
    return result;
  }

  async deletePlan(id: string, adminId: string) {
    await this.ensurePlan(id);
    const result = await this.prisma.membershipPlan.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    await this.audit.log({
      adminId,
      action: AuditAction.delete,
      entity: 'membership_plan',
      entityId: id,
    });
    return result;
  }

  async listRequests(query: PaginationDto, status?: MembershipStatus) {
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
              { plan: { name: { contains: query.search, mode: 'insensitive' as const } } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.membershipRequest.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, fullName: true, mobile: true } },
          plan: true,
        },
      }),
      this.prisma.membershipRequest.count({ where }),
    ]);

    return paginatedResult(items, total, page, limit);
  }

  async updateRequest(id: string, dto: UpdateMembershipRequestDto, adminId: string) {
    await this.ensureRequest(id);
    const result = await this.prisma.membershipRequest.update({
      where: { id },
      data: dto,
      include: {
        user: { select: { id: true, fullName: true, mobile: true } },
        plan: true,
      },
    });

    const action =
      dto.status === MembershipStatus.approved || dto.status === MembershipStatus.activated
        ? AuditAction.approve
        : dto.status === MembershipStatus.rejected
          ? AuditAction.reject
          : AuditAction.update;

    await this.audit.log({
      adminId,
      action,
      entity: 'membership_request',
      entityId: id,
      changes: dto,
    });

    return result;
  }

  private async ensurePlan(id: string) {
    const plan = await this.prisma.membershipPlan.findFirst({ where: { id, deletedAt: null } });
    if (!plan) throw new NotFoundException('پلن عضویت یافت نشد');
  }

  private async ensureRequest(id: string) {
    const request = await this.prisma.membershipRequest.findFirst({
      where: { id, deletedAt: null },
    });
    if (!request) throw new NotFoundException('درخواست عضویت یافت نشد');
  }
}
