import Link from "next/link";
import {
  Briefcase,
  Calendar,
  CreditCard,
  Eye,
  ShoppingCart,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { DataTable, StatusBadge } from "@/components/shared/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  dashboardStats,
  membershipRequests,
  notifications,
  orders,
  recentUsers,
  reservationRequests,
} from "@/lib/mock-data";
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="داشبورد"
        description="نمای کلی عملیات باشگاه و اقدامات در انتظار"
      />

      <div className="mb-4 grid gap-3 sm:mb-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        <StatCard title="کل کاربران" value={formatNumber(dashboardStats.totalUsers)} icon={Users} trend="+۱۲٪ این ماه" />
        <StatCard title="عضویت فعال" value={formatNumber(dashboardStats.activeMemberships)} icon={CreditCard} />
        <StatCard title="رزرو ماهانه" value={formatNumber(dashboardStats.monthlyReservations)} icon={Calendar} />
        <StatCard title="فروش فروشگاه" value={formatCurrency(dashboardStats.storeSales)} icon={ShoppingCart} />
      </div>

      <div className="mb-4 grid gap-3 sm:mb-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        <StatCard title="عضویت در انتظار" value={formatNumber(dashboardStats.pendingMemberships)} icon={CreditCard} variant="warning" />
        <StatCard title="رزرو در انتظار" value={formatNumber(dashboardStats.pendingReservations)} icon={Calendar} variant="warning" />
        <StatCard title="سفارش در انتظار" value={formatNumber(dashboardStats.pendingOrders)} icon={ShoppingCart} variant="warning" />
        <StatCard title="درخواست استخدام" value={formatNumber(dashboardStats.newApplications)} icon={Briefcase} variant="warning" />
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="space-y-4 sm:space-y-6 lg:col-span-2">
          <DataTable
            title="درخواست‌های عضویت اخیر"
            data={membershipRequests.slice(0, 4)}
            columns={[
              { key: "id", header: "شناسه", render: (r) => r.id },
              { key: "user", header: "کاربر", render: (r) => r.user },
              { key: "plan", header: "پلن", render: (r) => r.plan, hideOnMobile: true },
              { key: "status", header: "وضعیت", render: (r) => <StatusBadge status={r.status} /> },
            ]}
          />
          <DataTable
            title="کاربران اخیر"
            data={recentUsers.map((u, i) => ({ ...u, id: String(i) }))}
            columns={[
              { key: "name", header: "نام", render: (r) => r.name },
              { key: "mobile", header: "موبایل", render: (r) => r.mobile },
              { key: "gender", header: "جنسیت", render: (r) => r.gender, hideOnMobile: true },
              { key: "registeredAt", header: "تاریخ ثبت", render: (r) => r.registeredAt, hideOnMobile: true },
            ]}
          />
        </div>

        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
              <CardTitle className="text-sm sm:text-base">آمار سریع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-4 sm:px-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">بازدید وبلاگ</span>
                <span className="font-semibold">{formatNumber(dashboardStats.blogViews)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">درآمد فروشگاه</span>
                <span className="font-semibold">{formatCurrency(dashboardStats.storeSales)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
              <CardTitle className="text-sm sm:text-base">اعلان‌ها</CardTitle>
              <Link href="/notifications">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3 px-4 sm:px-6">
              {notifications.slice(0, 4).map((n) => (
                <div key={n.id} className="rounded-lg border border-zinc-100 p-3">
                  <p className="text-sm font-medium text-zinc-900">{n.title}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{n.message}</p>
                  <p className="mt-1 text-xs text-zinc-400">{formatDate(n.createdAt)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-2">
        <DataTable
          title="رزروهای در انتظار"
          data={reservationRequests.filter((r) => r.status === "pending")}
          columns={[
            { key: "user", header: "کاربر", render: (r) => r.user },
            { key: "service", header: "خدمت", render: (r) => r.service },
            { key: "date", header: "تاریخ", render: (r) => `${r.date} ${r.time}` },
            { key: "status", header: "وضعیت", render: (r) => <StatusBadge status={r.status} /> },
          ]}
        />
        <DataTable
          title="سفارش‌های در انتظار"
          data={orders.filter((o) => o.status === "pending_review")}
          columns={[
            { key: "id", header: "سفارش", render: (r) => r.id },
            { key: "customer", header: "مشتری", render: (r) => r.customer },
            { key: "total", header: "مبلغ", render: (r) => formatCurrency(r.total) },
            { key: "status", header: "وضعیت", render: (r) => <StatusBadge status={r.status} /> },
          ]}
        />
      </div>
    </div>
  );
}
