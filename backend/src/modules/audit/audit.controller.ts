import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminRole, AuditAction } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAdminGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AuditLogService } from './audit.service';

@ApiTags('Audit')
@Controller('admin/audit-logs')
@UseGuards(JwtAdminGuard, RolesGuard)
@Roles(AdminRole.super_admin, AdminRole.manager)
@ApiBearerAuth()
export class AuditController {
  constructor(private audit: AuditLogService) {}

  @Get()
  list(
    @Query() query: PaginationDto,
    @Query('entity') entity?: string,
    @Query('action') action?: AuditAction,
  ) {
    return this.audit.list(query, entity, action);
  }
}
