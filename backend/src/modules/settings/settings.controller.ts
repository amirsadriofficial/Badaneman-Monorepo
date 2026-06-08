import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminRole } from '@prisma/client';
import { CurrentAdmin } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAdminGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { UpdateAllSettingsDto } from './dto/settings.dto';
import { SettingsService } from './settings.service';

@ApiTags('Settings')
@Controller()
export class SettingsController {
  constructor(private settings: SettingsService) {}

  @Get('settings/general')
  getGeneral() {
    return this.settings.getGeneral();
  }

  @Get('settings/social')
  getSocial() {
    return this.settings.getSocial();
  }

  @Get('settings/payment')
  getPayment() {
    return this.settings.getPayment();
  }

  @Get('settings/delivery')
  getDelivery() {
    return this.settings.getDelivery();
  }

  @Get('settings/hours')
  getHours() {
    return this.settings.getHours();
  }

  @Put('admin/settings')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager)
  @ApiBearerAuth()
  updateAll(@Body() dto: UpdateAllSettingsDto, @CurrentAdmin() admin: { id: string }) {
    return this.settings.updateAll(dto, admin.id);
  }
}
