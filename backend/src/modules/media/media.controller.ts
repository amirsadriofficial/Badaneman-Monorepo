import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AdminRole } from '@prisma/client';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { randomUUID } from 'crypto';
import { CurrentAdmin } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAdminGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import {
  CreateGalleryItemDto,
  CreateVideoDto,
  UpdateGalleryItemDto,
  UpdateVideoDto,
} from './dto/media.dto';
import { MediaService } from './media.service';

const ALLOWED_MIMES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'video/mp4',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

@ApiTags('Media')
@Controller()
export class MediaController {
  constructor(private media: MediaService) {}

  @Post('media/upload')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          cb(null, getUploadDir());
        },
        filename: (_req, file, cb) => {
          cb(null, `${randomUUID()}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (ALLOWED_MIMES.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('نوع فایل مجاز نیست') as unknown as Error, false);
        }
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('فایل الزامی است');
    return this.media.uploadFile(file);
  }

  @Get('gallery')
  getGallery(@Query('category') category?: string) {
    return this.media.getGallery(category);
  }

  @Get('videos')
  getVideos() {
    return this.media.getVideos();
  }

  @Get('admin/gallery')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  adminListGallery() {
    return this.media.adminListGallery();
  }

  @Post('admin/gallery')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  createGalleryItem(@Body() dto: CreateGalleryItemDto, @CurrentAdmin() admin: { id: string }) {
    return this.media.createGalleryItem(dto, admin.id);
  }

  @Patch('admin/gallery/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  updateGalleryItem(
    @Param('id') id: string,
    @Body() dto: UpdateGalleryItemDto,
    @CurrentAdmin() admin: { id: string },
  ) {
    return this.media.updateGalleryItem(id, dto, admin.id);
  }

  @Delete('admin/gallery/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  deleteGalleryItem(@Param('id') id: string, @CurrentAdmin() admin: { id: string }) {
    return this.media.deleteGalleryItem(id, admin.id);
  }

  @Get('admin/videos')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  adminListVideos() {
    return this.media.adminListVideos();
  }

  @Post('admin/videos')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  createVideo(@Body() dto: CreateVideoDto, @CurrentAdmin() admin: { id: string }) {
    return this.media.createVideo(dto, admin.id);
  }

  @Patch('admin/videos/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  updateVideo(
    @Param('id') id: string,
    @Body() dto: UpdateVideoDto,
    @CurrentAdmin() admin: { id: string },
  ) {
    return this.media.updateVideo(id, dto, admin.id);
  }

  @Delete('admin/videos/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  deleteVideo(@Param('id') id: string, @CurrentAdmin() admin: { id: string }) {
    return this.media.deleteVideo(id, admin.id);
  }
}

function getUploadDir() {
  const dir = process.env.STORAGE_LOCAL_PATH ?? './uploads';
  const full = join(process.cwd(), dir);
  if (!existsSync(full)) mkdirSync(full, { recursive: true });
  return full;
}
