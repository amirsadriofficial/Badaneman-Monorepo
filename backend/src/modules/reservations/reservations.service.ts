import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AuditAction, NotificationType, ReservationStatus } from '@prisma/client';
import { paginate, paginatedResult, PaginationDto } from '../../common/dto/pagination.dto';
import { AuditService } from '../../common/services/audit.service';
import { NotificationHelperService } from '../../common/services/notification.service';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateReservationDto,
  UpdateReservationDto,
  UpdateScheduleDto,
} from './dto/reservations.dto';

@Injectable()
export class ReservationsService {
  constructor(
    private prisma: PrismaService,
    private audit: AuditService,
    private notifications: NotificationHelperService,
  ) {}

  getServices() {
    return this.prisma.reservationService.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async getAvailability(serviceId: string, dateStr: string) {
    const service = await this.prisma.reservationService.findFirst({
      where: { id: serviceId, isActive: true },
    });
    if (!service) throw new NotFoundException('سرویس یافت نشد');

    const date = new Date(dateStr);
    const dayOfWeek = date.getDay();

    const schedule = await this.prisma.reservationSchedule.findUnique({
      where: { id: 'default' },
      include: { workingDays: true, disabledDates: true },
    });
    if (!schedule) return { slots: [] };

    const disabled = schedule.disabledDates.some(
      (d) => d.date.toISOString().slice(0, 10) === dateStr,
    );
    if (disabled) return { slots: [] };

    const workingDay = schedule.workingDays.find((d) => d.dayOfWeek === dayOfWeek);
    if (!workingDay || workingDay.isClosed) return { slots: [] };

    const slots = this.generateSlots(workingDay.openTime, workingDay.closeTime, schedule.slotDuration);

    const booked = await this.prisma.reservation.findMany({
      where: {
        serviceId,
        date,
        deletedAt: null,
        status: { not: ReservationStatus.rejected },
      },
      select: { timeSlot: true },
    });
    const bookedSet = new Set(booked.map((b) => b.timeSlot));

    return { slots: slots.filter((s) => !bookedSet.has(s)) };
  }

  async createReservation(userId: string, dto: CreateReservationDto) {
    const service = await this.prisma.reservationService.findFirst({
      where: { id: dto.serviceId, isActive: true },
    });
    if (!service) throw new NotFoundException('سرویس یافت نشد');

    const date = new Date(dto.date);
    const { slots } = await this.getAvailability(dto.serviceId, dto.date);
    if (!slots.includes(dto.timeSlot)) {
      throw new BadRequestException('زمان انتخاب‌شده در دسترس نیست');
    }

    const existing = await this.prisma.reservation.findFirst({
      where: {
        serviceId: dto.serviceId,
        date,
        timeSlot: dto.timeSlot,
        deletedAt: null,
        status: { not: ReservationStatus.rejected },
      },
    });
    if (existing) throw new BadRequestException('این زمان قبلاً رزرو شده است');

    const reservation = await this.prisma.reservation.create({
      data: {
        userId,
        serviceId: dto.serviceId,
        date,
        timeSlot: dto.timeSlot,
        receiptUrl: dto.receiptUrl,
        notes: dto.notes,
      },
      include: {
        service: true,
        user: { select: { id: true, fullName: true, mobile: true } },
      },
    });

    await this.notifications.create(
      NotificationType.reservation,
      'رزرو جدید',
      `${reservation.user.fullName ?? reservation.user.mobile} رزرو ${service.name} ثبت کرد`,
      reservation.id,
    );

    return reservation;
  }

  async listReservations(query: PaginationDto, status?: ReservationStatus) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const { take, skip } = paginate(page, limit);
    const where = {
      deletedAt: null,
      ...(status ? { status } : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.reservation.findMany({
        where,
        skip,
        take,
        orderBy: [{ date: 'asc' }, { timeSlot: 'asc' }],
        include: {
          user: { select: { id: true, fullName: true, mobile: true } },
          service: true,
        },
      }),
      this.prisma.reservation.count({ where }),
    ]);

    return paginatedResult(items, total, page, limit);
  }

  async updateReservation(id: string, dto: UpdateReservationDto, adminId: string) {
    await this.ensureReservation(id);
    const result = await this.prisma.reservation.update({
      where: { id },
      data: dto,
      include: {
        user: { select: { id: true, fullName: true, mobile: true } },
        service: true,
      },
    });

    const action =
      dto.status === ReservationStatus.confirmed || dto.status === ReservationStatus.completed
        ? AuditAction.approve
        : dto.status === ReservationStatus.rejected
          ? AuditAction.reject
          : AuditAction.update;

    await this.audit.log({
      adminId,
      action,
      entity: 'reservation',
      entityId: id,
      changes: dto,
    });

    return result;
  }

  async getCalendar(from?: string, to?: string) {
    const fromDate = from ? new Date(from) : new Date();
    const toDate = to ? new Date(to) : new Date(fromDate.getTime() + 30 * 24 * 60 * 60 * 1000);

    return this.prisma.reservation.findMany({
      where: {
        deletedAt: null,
        date: { gte: fromDate, lte: toDate },
        status: { not: ReservationStatus.rejected },
      },
      orderBy: [{ date: 'asc' }, { timeSlot: 'asc' }],
      include: {
        user: { select: { id: true, fullName: true, mobile: true } },
        service: true,
      },
    });
  }

  getSchedule() {
    return this.prisma.reservationSchedule.findUnique({
      where: { id: 'default' },
      include: { workingDays: { orderBy: { dayOfWeek: 'asc' } }, disabledDates: true },
    });
  }

  async updateSchedule(dto: UpdateScheduleDto, adminId: string) {
    const schedule = await this.prisma.reservationSchedule.upsert({
      where: { id: 'default' },
      create: { id: 'default', slotDuration: dto.slotDuration ?? 30 },
      update: { slotDuration: dto.slotDuration },
    });

    if (dto.workingDays) {
      await this.prisma.workingDay.deleteMany({ where: { scheduleId: schedule.id } });
      await this.prisma.workingDay.createMany({
        data: dto.workingDays.map((d) => ({ ...d, scheduleId: schedule.id })),
      });
    }

    if (dto.disabledDates) {
      await this.prisma.disabledDate.deleteMany({ where: { scheduleId: schedule.id } });
      await this.prisma.disabledDate.createMany({
        data: dto.disabledDates.map((d) => ({
          scheduleId: schedule.id,
          date: new Date(d.date),
          reason: d.reason,
        })),
      });
    }

    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'reservation_schedule',
      entityId: schedule.id,
      changes: dto,
    });

    return this.getSchedule();
  }

  private generateSlots(openTime: string, closeTime: string, duration: number): string[] {
    const slots: string[] = [];
    const [openH, openM] = openTime.split(':').map(Number);
    const [closeH, closeM] = closeTime.split(':').map(Number);
    let current = openH * 60 + openM;
    const end = closeH * 60 + closeM;

    while (current + duration <= end) {
      const h = Math.floor(current / 60);
      const m = current % 60;
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
      current += duration;
    }

    return slots;
  }

  private async ensureReservation(id: string) {
    const item = await this.prisma.reservation.findFirst({ where: { id, deletedAt: null } });
    if (!item) throw new NotFoundException('رزرو یافت نشد');
  }
}
