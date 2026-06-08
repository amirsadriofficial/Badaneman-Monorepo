import { Body, Controller, Get, Param, Patch, Post, Query, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminRole, ReservationStatus } from '@prisma/client';
import { CurrentAdmin, CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAdminGuard, JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import {
  AvailabilityQueryDto,
  CalendarQueryDto,
  CreateReservationDto,
  UpdateReservationDto,
  UpdateScheduleDto,
} from './dto/reservations.dto';
import { ReservationsService } from './reservations.service';

@ApiTags('Reservations')
@Controller()
export class ReservationsController {
  constructor(private reservations: ReservationsService) {}

  @Get('reservation-services')
  getServices() {
    return this.reservations.getServices();
  }

  @Get('reservation-availability')
  getAvailability(@Query() query: AvailabilityQueryDto) {
    return this.reservations.getAvailability(query.serviceId, query.date);
  }

  @Post('reservations')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createReservation(@CurrentUser() user: { id: string }, @Body() dto: CreateReservationDto) {
    return this.reservations.createReservation(user.id, dto);
  }

  @Get('admin/reservations')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.support_operator)
  @ApiBearerAuth()
  listReservations(@Query() query: PaginationDto, @Query('status') status?: ReservationStatus) {
    return this.reservations.listReservations(query, status);
  }

  @Patch('admin/reservations/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.support_operator)
  @ApiBearerAuth()
  updateReservation(
    @Param('id') id: string,
    @Body() dto: UpdateReservationDto,
    @CurrentAdmin() admin: { id: string },
  ) {
    return this.reservations.updateReservation(id, dto, admin.id);
  }

  @Get('admin/reservations/calendar')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.support_operator)
  @ApiBearerAuth()
  getCalendar(@Query() query: CalendarQueryDto) {
    return this.reservations.getCalendar(query.from, query.to);
  }

  @Get('admin/reservation-schedule')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager)
  @ApiBearerAuth()
  getSchedule() {
    return this.reservations.getSchedule();
  }

  @Put('admin/reservation-schedule')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager)
  @ApiBearerAuth()
  updateSchedule(@Body() dto: UpdateScheduleDto, @CurrentAdmin() admin: { id: string }) {
    return this.reservations.updateSchedule(dto, admin.id);
  }
}
