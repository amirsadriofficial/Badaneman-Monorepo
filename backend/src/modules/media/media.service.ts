import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuditAction } from '@prisma/client';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { AuditService } from '../../common/services/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateGalleryItemDto,
  CreateVideoDto,
  UpdateGalleryItemDto,
  UpdateVideoDto,
} from './dto/media.dto';

@Injectable()
export class MediaService {
  private uploadDir: string;

  constructor(
    private prisma: PrismaService,
    private audit: AuditService,
    private config: ConfigService,
  ) {
    this.uploadDir = this.config.get<string>('STORAGE_LOCAL_PATH', './uploads');
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(file: Express.Multer.File) {
    const url = `/uploads/${file.filename}`;

    const mediaFile = await this.prisma.mediaFile.create({
      data: {
        filename: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        url,
      },
    });

    return mediaFile;
  }

  getGallery(category?: string) {
    return this.prisma.galleryItem.findMany({
      where: {
        deletedAt: null,
        ...(category ? { category } : {}),
      },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  getVideos() {
    return this.prisma.video.findMany({
      where: { deletedAt: null },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  adminListGallery() {
    return this.getGallery();
  }

  async createGalleryItem(dto: CreateGalleryItemDto, adminId: string) {
    const result = await this.prisma.galleryItem.create({ data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.create,
      entity: 'gallery_item',
      entityId: result.id,
    });
    return result;
  }

  async updateGalleryItem(id: string, dto: UpdateGalleryItemDto, adminId: string) {
    await this.ensureGalleryItem(id);
    const result = await this.prisma.galleryItem.update({ where: { id }, data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'gallery_item',
      entityId: id,
      changes: dto,
    });
    return result;
  }

  async deleteGalleryItem(id: string, adminId: string) {
    await this.ensureGalleryItem(id);
    const result = await this.prisma.galleryItem.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    await this.audit.log({
      adminId,
      action: AuditAction.delete,
      entity: 'gallery_item',
      entityId: id,
    });
    return result;
  }

  adminListVideos() {
    return this.getVideos();
  }

  async createVideo(dto: CreateVideoDto, adminId: string) {
    const result = await this.prisma.video.create({ data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.create,
      entity: 'video',
      entityId: result.id,
    });
    return result;
  }

  async updateVideo(id: string, dto: UpdateVideoDto, adminId: string) {
    await this.ensureVideo(id);
    const result = await this.prisma.video.update({ where: { id }, data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'video',
      entityId: id,
      changes: dto,
    });
    return result;
  }

  async deleteVideo(id: string, adminId: string) {
    await this.ensureVideo(id);
    const result = await this.prisma.video.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    await this.audit.log({ adminId, action: AuditAction.delete, entity: 'video', entityId: id });
    return result;
  }

  getUploadDestination() {
    return join(process.cwd(), this.uploadDir);
  }

  private async ensureGalleryItem(id: string) {
    const item = await this.prisma.galleryItem.findFirst({ where: { id, deletedAt: null } });
    if (!item) throw new NotFoundException('آیتم گالری یافت نشد');
  }

  private async ensureVideo(id: string) {
    const item = await this.prisma.video.findFirst({ where: { id, deletedAt: null } });
    if (!item) throw new NotFoundException('ویدیو یافت نشد');
  }
}
