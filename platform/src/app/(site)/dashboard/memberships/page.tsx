import { membershipPlans } from "@/lib/mock-data";
import { Card, CardContent, SectionTitle, StatusBadge } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import type { MembershipStatus } from "@/lib/types";

const history: { id: string; planId: string; date: string; status: MembershipStatus }[] = [
  { id: "1", planId: "2", date: "2026-05-15", status: "activated" },
  { id: "2", planId: "1", date: "2026-06-01", status: "pending_review" },
];

export default function MembershipsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/dashboard" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← بازگشت به پنل
      </Link>

      <SectionTitle title="درخواست‌های عضویت" subtitle="تاریخچه و وضعیت عضویت‌های شما" />

      <Card>
        <CardContent className="overflow-x-auto p-0 sm:p-0">
          <table className="w-full min-w-[500px] text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="p-4 text-right font-medium">پلن</th>
                <th className="p-4 text-right font-medium">مبلغ</th>
                <th className="p-4 text-right font-medium">تاریخ</th>
                <th className="p-4 text-right font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => {
                const plan = membershipPlans.find((p) => p.id === item.planId);
                return (
                  <tr key={item.id} className="border-b border-border">
                    <td className="p-4 font-medium">{plan?.name ?? "—"}</td>
                    <td className="p-4">{plan ? formatCurrency(plan.price) : "—"}</td>
                    <td className="p-4">{formatDate(item.date)}</td>
                    <td className="p-4">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
