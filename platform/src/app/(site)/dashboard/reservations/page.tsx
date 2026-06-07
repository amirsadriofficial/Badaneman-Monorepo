import { Card, CardContent, SectionTitle, StatusBadge } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import type { ReservationStatus } from "@/lib/types";

const history: { id: string; service: string; date: string; time: string; price: number; status: ReservationStatus }[] = [
  { id: "1", service: "ماساژ", date: "2026-05-20", time: "۱۴:۰۰", price: 450000, status: "completed" },
  { id: "2", service: "سولاریوم", date: "2026-06-05", time: "۱۱:۰۰", price: 280000, status: "confirmed" },
  { id: "3", service: "ماساژ", date: "2026-06-10", time: "۱۶:۰۰", price: 450000, status: "pending" },
];

export default function ReservationsDashboardPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/dashboard" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← بازگشت به پنل
      </Link>

      <SectionTitle title="رزروها" subtitle="تاریخچه رزرو ماساژ و سولاریوم" />

      <Card>
        <CardContent className="overflow-x-auto p-0 sm:p-0">
          <table className="w-full min-w-[550px] text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="p-4 text-right font-medium">خدمت</th>
                <th className="p-4 text-right font-medium">تاریخ</th>
                <th className="p-4 text-right font-medium">ساعت</th>
                <th className="p-4 text-right font-medium">مبلغ</th>
                <th className="p-4 text-right font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id} className="border-b border-border">
                  <td className="p-4 font-medium">{item.service}</td>
                  <td className="p-4">{formatDate(item.date)}</td>
                  <td className="p-4">{item.time}</td>
                  <td className="p-4">{formatCurrency(item.price)}</td>
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
