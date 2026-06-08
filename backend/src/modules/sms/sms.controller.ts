import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminRole } from '@prisma/client';
import { CurrentAdmin } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAdminGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateSmsTemplateDto, UpdateSmsTemplateDto } from './dto/sms.dto';
import { SmsService } from './sms.service';

@ApiTags('SMS')
@Controller('admin/sms')
@UseGuards(JwtAdminGuard, RolesGuard)
@Roles(AdminRole.super_admin, AdminRole.manager)
@ApiBearerAuth()
export class SmsController {
  constructor(private sms: SmsService) {}

  @Get('templates')
  listTemplates() {
    return this.sms.listTemplates();
  }

  @Post('templates')
  createTemplate(@Body() dto: CreateSmsTemplateDto, @CurrentAdmin() admin: { id: string }) {
    return this.sms.createTemplate(dto, admin.id);
  }

  @Patch('templates/:id')
  updateTemplate(
    @Param('id') id: string,
    @Body() dto: UpdateSmsTemplateDto,
    @CurrentAdmin() admin: { id: string },
  ) {
    return this.sms.updateTemplate(id, dto, admin.id);
  }

  @Delete('templates/:id')
  deleteTemplate(@Param('id') id: string, @CurrentAdmin() admin: { id: string }) {
    return this.sms.deleteTemplate(id, admin.id);
  }

  @Get('logs')
  listLogs(@Query() query: PaginationDto) {
    return this.sms.listLogs(query);
  }
}
