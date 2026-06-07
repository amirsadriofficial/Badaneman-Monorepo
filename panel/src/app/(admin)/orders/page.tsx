import { PageHeader } from "@/components/shared/page-header";
import { DataTable, StatusBadge } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { orders } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { common, statusLabel } from "@/lib/locale/fa";

export default function OrdersPage() {
  return (
    <div>
      <PageHeader title="مدیریت سفارش‌ها" description="بررسی سفارش‌ها، تأیید و به‌روزرسانی وضعیت تحویل" />
      <DataTable
        data={orders}
        columns={[
          { key: "id", header: "شناسه سفارش", render: (r) => r.id },
          { key: "customer", header: "مشتری", render: (r) => r.customer },
          { key: "total", header: "مبلغ", render: (r) => formatCurrency(r.total) },
          { key: "delivery", header: "تحویل", render: (r) => (
            <Badge className="bg-zinc-100 text-zinc-700">{statusLabel(r.deliveryType)}</Badge>
          ), hideOnMobile: true },
          { key: "date", header: "تاریخ", render: (r) => formatDate(r.createdAt), hideOnMobile: true },
          { key: "status", header: common.status, render: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", header: common.actions, render: () => (
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="ghost" size="sm">{common.approve}</Button>
              <Button variant="ghost" size="sm">{statusLabel("preparing")}</Button>
              <Button variant="ghost" size="sm">{common.complete}</Button>
            </div>
          )},
        ]}
      />
    </div>
  );
}
