import { PageHeader } from "@/components/shared/page-header";
import { DataTable, StatusBadge } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { reservationRequests } from "@/lib/mock-data";
import { common } from "@/lib/locale/fa";

export default function ReservationRequestsPage() {
  return (
    <div>
      <PageHeader title="درخواست‌های رزرو" description="تأیید، رد یا تکمیل درخواست‌های رزرو" />
      <DataTable
        data={reservationRequests}
        columns={[
          { key: "id", header: "شناسه", render: (r) => r.id },
          { key: "user", header: "کاربر", render: (r) => r.user },
          { key: "service", header: "خدمت", render: (r) => r.service },
          { key: "datetime", header: "تاریخ و ساعت", render: (r) => `${r.date} ${r.time}`, hideOnMobile: true },
          { key: "status", header: common.status, render: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", header: common.actions, render: () => (
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="ghost" size="sm">{common.approve}</Button>
              <Button variant="ghost" size="sm">{common.reject}</Button>
              <Button variant="ghost" size="sm">{common.complete}</Button>
            </div>
          )},
        ]}
      />
    </div>
  );
}
