import { Injectable } from '@nestjs/common';
import { AuditAction } from '@prisma/client';
import { AuditService } from '../../common/services/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import {
  UpdateAllSettingsDto,
  UpdateDeliverySettingsDto,
  UpdateGeneralSettingsDto,
  UpdatePaymentSettingsDto,
  UpdateSocialSettingsDto,
  UpdateWorkingHoursDto,
} from './dto/settings.dto';

@Injectable()
export class SettingsService {
  constructor(
    private prisma: PrismaService,
    private audit: AuditService,
  ) {}

  getGeneral() {
    return this.prisma.generalSettings.findUnique({ where: { id: 'default' } });
  }

  getSocial() {
    return this.prisma.socialSettings.findUnique({ where: { id: 'default' } });
  }

  getPayment() {
    return this.prisma.paymentSettings.findUnique({ where: { id: 'default' } });
  }

  getDelivery() {
    return this.prisma.deliverySettings.findUnique({ where: { id: 'default' } });
  }

  getHours() {
    return this.prisma.reservationSchedule.findUnique({
      where: { id: 'default' },
      include: { workingDays: { orderBy: { dayOfWeek: 'asc' } } },
    });
  }

  async updateGeneral(dto: UpdateGeneralSettingsDto, adminId: string) {
    const result = await this.prisma.generalSettings.upsert({
      where: { id: 'default' },
      create: { id: 'default', gymName: dto.gymName ?? 'Badaneman', ...dto },
      update: dto,
    });
    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'general_settings',
      entityId: result.id,
      changes: dto,
    });
    return result;
  }

  async updateSocial(dto: UpdateSocialSettingsDto, adminId: string) {
    const result = await this.prisma.socialSettings.upsert({
      where: { id: 'default' },
      create: { id: 'default', ...dto },
      update: dto,
    });
    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'social_settings',
      entityId: result.id,
      changes: dto,
    });
    return result;
  }

  async updatePayment(dto: UpdatePaymentSettingsDto, adminId: string) {
    const result = await this.prisma.paymentSettings.upsert({
      where: { id: 'default' },
      create: { id: 'default', ...dto },
      update: dto,
    });
    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'payment_settings',
      entityId: result.id,
      changes: dto,
    });
    return result;
  }

  async updateDelivery(dto: UpdateDeliverySettingsDto, adminId: string) {
    const result = await this.prisma.deliverySettings.upsert({
      where: { id: 'default' },
      create: { id: 'default', ...dto },
      update: dto,
    });
    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'delivery_settings',
      entityId: result.id,
      changes: dto,
    });
    return result;
  }

  async updateHours(dto: UpdateWorkingHoursDto, adminId: string) {
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

    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'working_hours',
      entityId: schedule.id,
      changes: dto,
    });

    return this.getHours();
  }

  async updateAll(dto: UpdateAllSettingsDto, adminId: string) {
    const results: Record<string, unknown> = {};

    if (dto.general) results.general = await this.updateGeneral(dto.general, adminId);
    if (dto.social) results.social = await this.updateSocial(dto.social, adminId);
    if (dto.payment) results.payment = await this.updatePayment(dto.payment, adminId);
    if (dto.delivery) results.delivery = await this.updateDelivery(dto.delivery, adminId);
    if (dto.hours) results.hours = await this.updateHours(dto.hours, adminId);

    return results;
  }
}
