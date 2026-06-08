import { Global, Module } from '@nestjs/common';
import { RolesGuard } from './guards/roles.guard';
import { AuditService } from './services/audit.service';
import { NotificationHelperService } from './services/notification.service';

@Global()
@Module({
  providers: [AuditService, NotificationHelperService, RolesGuard],
  exports: [AuditService, NotificationHelperService, RolesGuard],
})
export class CommonModule {}
