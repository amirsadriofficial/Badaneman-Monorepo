import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, CreditCard, Download, ShoppingCart, Users } from "lucide-react";
import { dashboardStats } from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { common } from "@/lib/locale/fa";

const months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"];

const exportItems = [
  "کاربران",
  "سفارش‌ها",
  "رزروها",
  "درخواست‌های عضویت",
  "درخواست‌های استخدام",
];

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader title="آمار و گزارش‌گیری" description="مشاهده آمار و خروجی گرفتن از داده‌ها" />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="درخواست‌های عضویت" value={formatNumber(dashboardStats.pendingMemberships + 30)} icon={CreditCard} />
        <StatCard title="رزروها" value={formatNumber(dashboardStats.monthlyReservations)} icon={BarChart3} />
        <StatCard title="سفارش‌ها" value={formatNumber(dashboardStats.pendingOrders + 45)} icon={ShoppingCart} />
        <StatCard title="کاربران جدید" value={formatNumber(dashboardStats.totalUsers)} icon={Users} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>نمای کلی درآمد</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {months.map((month, i) => (
                <div key={month} className="flex items-center gap-3">
                  <span className="w-16 text-sm text-zinc-500">{month}</span>
                  <div className="h-3 flex-1 rounded-full bg-zinc-100">
                    <div className="h-3 rounded-full bg-zinc-900" style={{ width: `${40 + i * 10}%` }} />
                  </div>
                  <span className="text-sm font-medium">{formatCurrency(15000 + i * 3000)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>خروجی داده‌ها</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {exportItems.map((item) => (
              <div key={item} className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm font-medium">{item}</span>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button variant="outline" size="sm"><Download className="h-3 w-3" /> {common.exportExcel}</Button>
                  <Button variant="outline" size="sm"><Download className="h-3 w-3" /> {common.exportCsv}</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
