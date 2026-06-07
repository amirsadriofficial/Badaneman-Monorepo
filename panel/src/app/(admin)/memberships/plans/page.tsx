import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { membershipPlans } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { common, statusLabel } from "@/lib/locale/fa";

export default function MembershipPlansPage() {
  return (
    <div>
      <PageHeader title="پلن‌های عضویت" description="ایجاد و مدیریت پلن‌های عضویت" action={{ label: "افزودن پلن" }} />
      <DataTable
        data={membershipPlans}
        columns={[
          { key: "name", header: "نام", render: (r) => r.name },
          { key: "price", header: "قیمت", render: (r) => formatCurrency(r.price) },
          { key: "duration", header: "مدت", render: (r) => r.duration, hideOnMobile: true },
          { key: "promo", header: "تبلیغاتی", render: (r) => (
            <Badge className={r.promotional ? "bg-orange-100 text-orange-800" : "bg-zinc-100 text-zinc-600"}>
              {statusLabel(r.promotional ? "yes" : "no")}
            </Badge>
          )},
          { key: "actions", header: common.actions, render: () => (
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="ghost" size="sm">{common.edit}</Button>
              <Button variant="ghost" size="sm">{common.delete}</Button>
            </div>
          )},
        ]}
      />
    </div>
  );
}
