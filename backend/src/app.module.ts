import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ContentModule } from './modules/content/content.module';
import { MembershipsModule } from './modules/memberships/memberships.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { StoreModule } from './modules/store/store.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';
import { RecruitmentModule } from './modules/recruitment/recruitment.module';
import { BlogModule } from './modules/blog/blog.module';
import { MediaModule } from './modules/media/media.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { SmsModule } from './modules/sms/sms.module';
import { SettingsModule } from './modules/settings/settings.module';
import { SearchModule } from './modules/search/search.module';
import { AuditModule } from './modules/audit/audit.module';
import { ReportsModule } from './modules/reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    ContentModule,
    MembershipsModule,
    ReservationsModule,
    StoreModule,
    CartModule,
    OrdersModule,
    RecruitmentModule,
    BlogModule,
    MediaModule,
    NotificationsModule,
    SmsModule,
    SettingsModule,
    SearchModule,
    AuditModule,
    ReportsModule,
  ],
})
export class AppModule {}
