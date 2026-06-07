import { Card, CardContent, SectionTitle, StatusBadge } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import type { OrderStatus } from "@/lib/types";

const history: { id: string; items: string; total: number; date: string; status: OrderStatus }[] = [
  { id: "ORD-1001", items: "پروتئین وی × ۱", total: 1890000, date: "2026-05-18", status: "completed" },
  { id: "ORD-1002", items: "دستکش بدنسازی × ۲، شیکر × ۱", total: 880000, date: "2026-06-02", status: "preparing" },
  { id: "ORD-1003", items: "کراتین × ۱", total: 690000, date: "2026-06-06", status: "pending_review" },
];

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/dashboard" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← بازگشت به پنل
      </Link>

      <SectionTitle title="سفارش‌ها" subtitle="تاریخچه سفارشات فروشگاه" />

      <Card>
        <CardContent className="overflow-x-auto p-0 sm:p-0">
          <table className="w-full min-w-[550px] text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="p-4 text-right font-medium">شماره سفارش</th>
                <th className="p-4 text-right font-medium">محصولات</th>
                <th className="p-4 text-right font-medium">مبلغ</th>
                <th className="p-4 text-right font-medium">تاریخ</th>
                <th className="p-4 text-right font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id} className="border-b border-border">
                  <td className="p-4 font-medium" dir="ltr">
                    {item.id}
                  </td>
                  <td className="p-4">{item.items}</td>
                  <td className="p-4">{formatCurrency(item.total)}</td>
                  <td className="p-4">{formatDate(item.date)}</td>
                  <td className="p-4">
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
