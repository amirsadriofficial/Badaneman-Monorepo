import { Injectable } from '@nestjs/common';
import {
  ApplicationStatus,
  MembershipStatus,
  OrderStatus,
  ReservationStatus,
} from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [
      totalUsers,
      pendingMemberships,
      pendingReservations,
      pendingOrders,
      newApplications,
      unreadNotifications,
      lowStockVariants,
    ] = await Promise.all([
      this.prisma.user.count({ where: { deletedAt: null } }),
      this.prisma.membershipRequest.count({
        where: { deletedAt: null, status: MembershipStatus.pending_review },
      }),
      this.prisma.reservation.count({
        where: { deletedAt: null, status: ReservationStatus.pending },
      }),
      this.prisma.order.count({
        where: { deletedAt: null, status: OrderStatus.pending_review },
      }),
      this.prisma.recruitmentApplication.count({
        where: { deletedAt: null, status: ApplicationStatus.new },
      }),
      this.prisma.notification.count({ where: { isRead: false } }),
      this.prisma.productVariant.count({
        where: {
          deletedAt: null,
          product: { deletedAt: null },
          stock: { lte: 5 },
        },
      }),
    ]);

    return {
      totalUsers,
      pendingMemberships,
      pendingReservations,
      pendingOrders,
      newApplications,
      unreadNotifications,
      lowStockVariants,
    };
  }

  async getAnalyticsSummary() {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [
      newUsers,
      membershipRequests,
      reservations,
      orders,
      applications,
      orderRevenue,
      blogViews,
    ] = await Promise.all([
      this.prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo }, deletedAt: null } }),
      this.prisma.membershipRequest.count({
        where: { createdAt: { gte: thirtyDaysAgo }, deletedAt: null },
      }),
      this.prisma.reservation.count({
        where: { createdAt: { gte: thirtyDaysAgo }, deletedAt: null },
      }),
      this.prisma.order.count({
        where: { createdAt: { gte: thirtyDaysAgo }, deletedAt: null },
      }),
      this.prisma.recruitmentApplication.count({
        where: { createdAt: { gte: thirtyDaysAgo }, deletedAt: null },
      }),
      this.prisma.order.aggregate({
        where: {
          createdAt: { gte: thirtyDaysAgo },
          deletedAt: null,
          status: { not: OrderStatus.rejected },
        },
        _sum: { total: true },
      }),
      this.prisma.blogArticle.aggregate({
        where: { deletedAt: null, isPublished: true },
        _sum: { views: true },
      }),
    ]);

    return {
      period: '30d',
      newUsers,
      membershipRequests,
      reservations,
      orders,
      applications,
      orderRevenue: orderRevenue._sum.total ?? 0,
      totalBlogViews: blogViews._sum.views ?? 0,
    };
  }
}
