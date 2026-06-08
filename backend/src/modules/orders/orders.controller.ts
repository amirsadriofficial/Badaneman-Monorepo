import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminRole, OrderStatus } from '@prisma/client';
import { CurrentAdmin, CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAdminGuard, JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/orders.dto';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller()
export class OrdersController {
  constructor(private orders: OrdersService) {}

  @Post('orders')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createOrder(@CurrentUser() user: { id: string }, @Body() dto: CreateOrderDto) {
    return this.orders.createOrder(user.id, dto);
  }

  @Get('orders')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getUserOrders(@CurrentUser() user: { id: string }, @Query() query: PaginationDto) {
    return this.orders.getUserOrders(user.id, query);
  }

  @Get('admin/orders')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.support_operator)
  @ApiBearerAuth()
  adminListOrders(@Query() query: PaginationDto, @Query('status') status?: OrderStatus) {
    return this.orders.adminListOrders(query, status);
  }

  @Patch('admin/orders/:id/status')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.support_operator)
  @ApiBearerAuth()
  updateOrderStatus(
    @Param('id') id: string,
    @Body() dto: UpdateOrderStatusDto,
    @CurrentAdmin() admin: { id: string },
  ) {
    return this.orders.updateOrderStatus(id, dto, admin.id);
  }
}
