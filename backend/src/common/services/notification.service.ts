import { Injectable } from '@nestjs/common';
import { NotificationType } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotificationHelperService {
  constructor(private prisma: PrismaService) {}

  async create(type: NotificationType, title: string, message: string, entityId?: string) {
    return this.prisma.notification.create({
      data: { type, title, message, entityId },
    });
  }
}
