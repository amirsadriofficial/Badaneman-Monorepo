import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminRole } from '@prisma/client';
import { CurrentAdmin } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAdminGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ContentService } from './content.service';
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

@ApiTags('Content')
@Controller()
export class ContentController {
  constructor(private content: ContentService) {}

  @Get('homepage')
  getHomepage() {
    return this.content.getHomepage();
  }

  @Get('about')
  getAbout() {
    return this.content.getAbout();
  }

  @Get('coaches')
  getCoaches() {
    return this.content.getCoaches();
  }

  @Get('facilities')
  getFacilities() {
    return this.content.getFacilities();
  }

  @Get('achievements')
  getAchievements() {
    return this.content.getAchievements();
  }

  @Get('faqs')
  getFaqs() {
    return this.content.getFaqs();
  }

  @Get('gym-status')
  getGymStatus() {
    return this.content.getGymStatus();
  }

  @Put('admin/content/homepage')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  updateLanding(@Body() dto: UpdateLandingDto, @CurrentAdmin() admin: { id: string }) {
    return this.content.updateLanding(dto, admin.id);
  }

  @Put('admin/content/about')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  updateAbout(@Body() dto: UpdateAboutDto, @CurrentAdmin() admin: { id: string }) {
    return this.content.updateAbout(dto, admin.id);
  }

  @Put('admin/content/gym-status')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  updateGymStatus(@Body() dto: UpdateGymStatusDto, @CurrentAdmin() admin: { id: string }) {
    return this.content.updateGymStatus(dto, admin.id);
  }

  @Get('admin/content/achievements')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  adminListAchievements() {
    return this.content.adminListAchievements();
  }

  @Post('admin/content/achievements')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  createAchievement(@Body() dto: CreateAchievementDto, @CurrentAdmin() admin: { id: string }) {
    return this.content.createAchievement(dto, admin.id);
  }

  @Patch('admin/content/achievements/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  updateAchievement(
    @Param('id') id: string,
    @Body() dto: UpdateAchievementDto,
    @CurrentAdmin() admin: { id: string },
  ) {
    return this.content.updateAchievement(id, dto, admin.id);
  }

  @Delete('admin/content/achievements/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  deleteAchievement(@Param('id') id: string, @CurrentAdmin() admin: { id: string }) {
    return this.content.deleteAchievement(id, admin.id);
  }

  @Get('admin/content/coaches')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  adminListCoaches() {
    return this.content.adminListCoaches();
  }

  @Post('admin/content/coaches')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  createCoach(@Body() dto: CreateCoachDto, @CurrentAdmin() admin: { id: string }) {
    return this.content.createCoach(dto, admin.id);
  }

  @Patch('admin/content/coaches/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  updateCoach(
    @Param('id') id: string,
    @Body() dto: UpdateCoachDto,
    @CurrentAdmin() admin: { id: string },
  ) {
    return this.content.updateCoach(id, dto, admin.id);
  }

  @Delete('admin/content/coaches/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  deleteCoach(@Param('id') id: string, @CurrentAdmin() admin: { id: string }) {
    return this.content.deleteCoach(id, admin.id);
  }

  @Get('admin/content/facilities')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  adminListFacilities() {
    return this.content.adminListFacilities();
  }

  @Post('admin/content/facilities')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  createFacility(@Body() dto: CreateFacilityDto, @CurrentAdmin() admin: { id: string }) {
    return this.content.createFacility(dto, admin.id);
  }

  @Patch('admin/content/facilities/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  updateFacility(
    @Param('id') id: string,
    @Body() dto: UpdateFacilityDto,
    @CurrentAdmin() admin: { id: string },
  ) {
    return this.content.updateFacility(id, dto, admin.id);
  }

  @Delete('admin/content/facilities/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  deleteFacility(@Param('id') id: string, @CurrentAdmin() admin: { id: string }) {
    return this.content.deleteFacility(id, admin.id);
  }

  @Get('admin/content/faqs')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  adminListFaqs() {
    return this.content.adminListFaqs();
  }

  @Post('admin/content/faqs')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  createFaq(@Body() dto: CreateFaqDto, @CurrentAdmin() admin: { id: string }) {
    return this.content.createFaq(dto, admin.id);
  }

  @Patch('admin/content/faqs/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  updateFaq(
    @Param('id') id: string,
    @Body() dto: UpdateFaqDto,
    @CurrentAdmin() admin: { id: string },
  ) {
    return this.content.updateFaq(id, dto, admin.id);
  }

  @Delete('admin/content/faqs/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  deleteFaq(@Param('id') id: string, @CurrentAdmin() admin: { id: string }) {
    return this.content.deleteFaq(id, admin.id);
  }
}
