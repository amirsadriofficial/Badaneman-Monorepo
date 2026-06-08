import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminRole, ApplicationStatus } from '@prisma/client';
import { CurrentAdmin, CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAdminGuard, JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import {
  CreateApplicationDto,
  CreatePositionDto,
  UpdateApplicationDto,
  UpdatePositionDto,
} from './dto/recruitment.dto';
import { RecruitmentService } from './recruitment.service';

@ApiTags('Recruitment')
@Controller()
export class RecruitmentController {
  constructor(private recruitment: RecruitmentService) {}

  @Get('recruitment/positions')
  getPositions() {
    return this.recruitment.getPositions();
  }

  @Post('recruitment/applications')
  createApplication(@Body() dto: CreateApplicationDto) {
    return this.recruitment.createApplication(dto);
  }

  @Post('recruitment/applications/me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createApplicationAuth(@CurrentUser() user: { id: string }, @Body() dto: CreateApplicationDto) {
    return this.recruitment.createApplication(dto, user.id);
  }

  @Get('admin/recruitment/positions')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.support_operator)
  @ApiBearerAuth()
  adminListPositions() {
    return this.recruitment.adminListPositions();
  }

  @Post('admin/recruitment/positions')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager)
  @ApiBearerAuth()
  createPosition(@Body() dto: CreatePositionDto, @CurrentAdmin() admin: { id: string }) {
    return this.recruitment.createPosition(dto, admin.id);
  }

  @Patch('admin/recruitment/positions/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager)
  @ApiBearerAuth()
  updatePosition(
    @Param('id') id: string,
    @Body() dto: UpdatePositionDto,
    @CurrentAdmin() admin: { id: string },
  ) {
    return this.recruitment.updatePosition(id, dto, admin.id);
  }

  @Delete('admin/recruitment/positions/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager)
  @ApiBearerAuth()
  deletePosition(@Param('id') id: string, @CurrentAdmin() admin: { id: string }) {
    return this.recruitment.deletePosition(id, admin.id);
  }

  @Get('admin/recruitment/applications')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.support_operator)
  @ApiBearerAuth()
  listApplications(@Query() query: PaginationDto, @Query('status') status?: ApplicationStatus) {
    return this.recruitment.listApplications(query, status);
  }

  @Patch('admin/recruitment/applications/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.support_operator)
  @ApiBearerAuth()
  updateApplication(
    @Param('id') id: string,
    @Body() dto: UpdateApplicationDto,
    @CurrentAdmin() admin: { id: string },
  ) {
    return this.recruitment.updateApplication(id, dto, admin.id);
  }
}
