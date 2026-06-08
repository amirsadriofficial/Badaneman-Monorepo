import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminRole, NotificationType } from '@prisma/client';
import { CurrentAdmin } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAdminGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { MarkAllReadDto } from './dto/notifications.dto';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@Controller('admin/notifications')
@UseGuards(JwtAdminGuard, RolesGuard)
@Roles(
  AdminRole.super_admin,
  AdminRole.manager,
  AdminRole.support_operator,
  AdminRole.content_manager,
)
@ApiBearerAuth()
export class NotificationsController {
  constructor(private notifications: NotificationsService) {}

  @Get()
  list(
    @Query() query: PaginationDto,
    @Query('isRead') isRead?: string,
    @Query('type') type?: NotificationType,
  ) {
    const readFilter = isRead === undefined ? undefined : isRead === 'true';
    return this.notifications.list(query, readFilter, type);
  }

  @Get('unread-count')
  unreadCount() {
    return this.notifications.getUnreadCount();
  }

  @Patch('read-all')
  markAllRead(@CurrentAdmin() admin: { id: string }, @Body() _dto: MarkAllReadDto) {
    return this.notifications.markAllRead(admin.id);
  }

  @Patch(':id/read')
  markRead(@Param('id') id: string, @CurrentAdmin() admin: { id: string }) {
    return this.notifications.markRead(id, admin.id);
  }
}
