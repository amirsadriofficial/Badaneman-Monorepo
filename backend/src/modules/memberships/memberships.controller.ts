import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminRole, MembershipStatus } from '@prisma/client';
import { CurrentAdmin, CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAdminGuard, JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import {
  CreateMembershipPlanDto,
  CreateMembershipRequestDto,
  UpdateMembershipPlanDto,
  UpdateMembershipRequestDto,
} from './dto/memberships.dto';
import { MembershipsService } from './memberships.service';

@ApiTags('Memberships')
@Controller()
export class MembershipsController {
  constructor(private memberships: MembershipsService) {}

  @Get('membership-plans')
  getPlans() {
    return this.memberships.getPlans();
  }

  @Post('membership-requests')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createRequest(@CurrentUser() user: { id: string }, @Body() dto: CreateMembershipRequestDto) {
    return this.memberships.createRequest(user.id, dto);
  }

  @Get('admin/membership-plans')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.support_operator)
  @ApiBearerAuth()
  adminListPlans() {
    return this.memberships.adminListPlans();
  }

  @Post('admin/membership-plans')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager)
  @ApiBearerAuth()
  createPlan(@Body() dto: CreateMembershipPlanDto, @CurrentAdmin() admin: { id: string }) {
    return this.memberships.createPlan(dto, admin.id);
  }

  @Patch('admin/membership-plans/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager)
  @ApiBearerAuth()
  updatePlan(
    @Param('id') id: string,
    @Body() dto: UpdateMembershipPlanDto,
    @CurrentAdmin() admin: { id: string },
  ) {
    return this.memberships.updatePlan(id, dto, admin.id);
  }

  @Delete('admin/membership-plans/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager)
  @ApiBearerAuth()
  deletePlan(@Param('id') id: string, @CurrentAdmin() admin: { id: string }) {
    return this.memberships.deletePlan(id, admin.id);
  }

  @Get('admin/membership-requests')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.support_operator)
  @ApiBearerAuth()
  listRequests(@Query() query: PaginationDto, @Query('status') status?: MembershipStatus) {
    return this.memberships.listRequests(query, status);
  }

  @Patch('admin/membership-requests/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.support_operator)
  @ApiBearerAuth()
  updateRequest(
    @Param('id') id: string,
    @Body() dto: UpdateMembershipRequestDto,
    @CurrentAdmin() admin: { id: string },
  ) {
    return this.memberships.updateRequest(id, dto, admin.id);
  }
}
