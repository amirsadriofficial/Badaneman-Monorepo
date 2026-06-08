import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAdminGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ReportsService } from './reports.service';

@ApiTags('Reports')
@Controller('admin/reports')
@UseGuards(JwtAdminGuard, RolesGuard)
@Roles(AdminRole.super_admin, AdminRole.manager)
@ApiBearerAuth()
export class ReportsController {
  constructor(private reports: ReportsService) {}

  @Get('dashboard')
  getDashboard() {
    return this.reports.getDashboardStats();
  }

  @Get('analytics')
  getAnalytics() {
    return this.reports.getAnalyticsSummary();
  }
}
