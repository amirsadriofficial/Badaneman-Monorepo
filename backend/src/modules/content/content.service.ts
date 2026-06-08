import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditAction } from '@prisma/client';
import { AuditService } from '../../common/services/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateAchievementDto,
  CreateCoachDto,
  CreateFacilityDto,
  CreateFaqDto,
  UpdateAboutDto,
  UpdateAchievementDto,
  UpdateCoachDto,
  UpdateFacilityDto,
  UpdateFaqDto,
  UpdateGymStatusDto,
  UpdateLandingDto,
} from './dto/content.dto';

@Injectable()
export class ContentService {
  constructor(
    private prisma: PrismaService,
    private audit: AuditService,
  ) {}

  getHomepage() {
    return this.prisma.landingContent.findUnique({ where: { id: 'default' } });
  }

  getAbout() {
    return this.prisma.aboutContent.findUnique({ where: { id: 'default' } });
  }

  getGymStatus() {
    return this.prisma.gymStatusSetting.findUnique({ where: { id: 'default' } });
  }

  getCoaches() {
    return this.prisma.coach.findMany({
      where: { deletedAt: null, isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  getFacilities() {
    return this.prisma.facility.findMany({
      where: { deletedAt: null },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  getAchievements() {
    return this.prisma.achievement.findMany({
      where: { deletedAt: null },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  getFaqs() {
    return this.prisma.faq.findMany({
      where: { deletedAt: null },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async updateLanding(dto: UpdateLandingDto, adminId: string) {
    const result = await this.prisma.landingContent.upsert({
      where: { id: 'default' },
      create: {
        id: 'default',
        headline: dto.headline ?? '',
        subheadline: dto.subheadline ?? '',
        ctaPrimary: dto.ctaPrimary ?? '',
        ctaSecondary: dto.ctaSecondary ?? '',
        featured: dto.featured,
      },
      update: dto,
    });
    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'landing_content',
      entityId: result.id,
      changes: dto,
    });
    return result;
  }

  async updateAbout(dto: UpdateAboutDto, adminId: string) {
    const result = await this.prisma.aboutContent.upsert({
      where: { id: 'default' },
      create: {
        id: 'default',
        intro: dto.intro ?? '',
        history: dto.history ?? '',
        mission: dto.mission ?? '',
        vision: dto.vision ?? '',
      },
      update: dto,
    });
    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'about_content',
      entityId: result.id,
      changes: dto,
    });
    return result;
  }

  async updateGymStatus(dto: UpdateGymStatusDto, adminId: string) {
    const result = await this.prisma.gymStatusSetting.upsert({
      where: { id: 'default' },
      create: { id: 'default', status: dto.status, message: dto.message },
      update: dto,
    });
    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'gym_status',
      entityId: result.id,
      changes: dto,
    });
    return result;
  }

  async createAchievement(dto: CreateAchievementDto, adminId: string) {
    const result = await this.prisma.achievement.create({ data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.create,
      entity: 'achievement',
      entityId: result.id,
    });
    return result;
  }

  async updateAchievement(id: string, dto: UpdateAchievementDto, adminId: string) {
    await this.ensureAchievement(id);
    const result = await this.prisma.achievement.update({ where: { id }, data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'achievement',
      entityId: id,
      changes: dto,
    });
    return result;
  }

  async deleteAchievement(id: string, adminId: string) {
    await this.ensureAchievement(id);
    const result = await this.prisma.achievement.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    await this.audit.log({
      adminId,
      action: AuditAction.delete,
      entity: 'achievement',
      entityId: id,
    });
    return result;
  }

  adminListAchievements() {
    return this.prisma.achievement.findMany({
      where: { deletedAt: null },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async createCoach(dto: CreateCoachDto, adminId: string) {
    const result = await this.prisma.coach.create({ data: dto });
    await this.audit.log({ adminId, action: AuditAction.create, entity: 'coach', entityId: result.id });
    return result;
  }

  async updateCoach(id: string, dto: UpdateCoachDto, adminId: string) {
    await this.ensureCoach(id);
    const result = await this.prisma.coach.update({ where: { id }, data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'coach',
      entityId: id,
      changes: dto,
    });
    return result;
  }

  async deleteCoach(id: string, adminId: string) {
    await this.ensureCoach(id);
    const result = await this.prisma.coach.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    await this.audit.log({ adminId, action: AuditAction.delete, entity: 'coach', entityId: id });
    return result;
  }

  adminListCoaches() {
    return this.prisma.coach.findMany({
      where: { deletedAt: null },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async createFacility(dto: CreateFacilityDto, adminId: string) {
    const result = await this.prisma.facility.create({ data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.create,
      entity: 'facility',
      entityId: result.id,
    });
    return result;
  }

  async updateFacility(id: string, dto: UpdateFacilityDto, adminId: string) {
    await this.ensureFacility(id);
    const result = await this.prisma.facility.update({ where: { id }, data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'facility',
      entityId: id,
      changes: dto,
    });
    return result;
  }

  async deleteFacility(id: string, adminId: string) {
    await this.ensureFacility(id);
    const result = await this.prisma.facility.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    await this.audit.log({ adminId, action: AuditAction.delete, entity: 'facility', entityId: id });
    return result;
  }

  adminListFacilities() {
    return this.prisma.facility.findMany({
      where: { deletedAt: null },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async createFaq(dto: CreateFaqDto, adminId: string) {
    const result = await this.prisma.faq.create({ data: dto });
    await this.audit.log({ adminId, action: AuditAction.create, entity: 'faq', entityId: result.id });
    return result;
  }

  async updateFaq(id: string, dto: UpdateFaqDto, adminId: string) {
    await this.ensureFaq(id);
    const result = await this.prisma.faq.update({ where: { id }, data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'faq',
      entityId: id,
      changes: dto,
    });
    return result;
  }

  async deleteFaq(id: string, adminId: string) {
    await this.ensureFaq(id);
    const result = await this.prisma.faq.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    await this.audit.log({ adminId, action: AuditAction.delete, entity: 'faq', entityId: id });
    return result;
  }

  adminListFaqs() {
    return this.prisma.faq.findMany({
      where: { deletedAt: null },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  private async ensureAchievement(id: string) {
    const item = await this.prisma.achievement.findFirst({ where: { id, deletedAt: null } });
    if (!item) throw new NotFoundException('دستاورد یافت نشد');
  }

  private async ensureCoach(id: string) {
    const item = await this.prisma.coach.findFirst({ where: { id, deletedAt: null } });
    if (!item) throw new NotFoundException('مربی یافت نشد');
  }

  private async ensureFacility(id: string) {
    const item = await this.prisma.facility.findFirst({ where: { id, deletedAt: null } });
    if (!item) throw new NotFoundException('امکانات یافت نشد');
  }

  private async ensureFaq(id: string) {
    const item = await this.prisma.faq.findFirst({ where: { id, deletedAt: null } });
    if (!item) throw new NotFoundException('سؤال متداول یافت نشد');
  }
}
