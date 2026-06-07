import { PageHeader } from "@/components/shared/page-header";
import { DataTable, StatusBadge } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { applications } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { common } from "@/lib/locale/fa";

export default function ApplicationsPage() {
  return (
    <div>
      <PageHeader title="درخواست‌های استخدام" description="بررسی درخواست‌های شغلی و به‌روزرسانی وضعیت" />
      <DataTable
        data={applications}
        columns={[
          { key: "id", header: "شناسه", render: (r) => r.id },
          { key: "applicant", header: "متقاضی", render: (r) => r.applicant },
          { key: "phone", header: "تلفن", render: (r) => r.phone, hideOnMobile: true },
          { key: "position", header: "موقعیت", render: (r) => r.position },
          { key: "date", header: "تاریخ ارسال", render: (r) => formatDate(r.submittedAt), hideOnMobile: true },
          { key: "status", header: common.status, render: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", header: common.actions, render: () => (
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="ghost" size="sm">رزومه</Button>
              <Button variant="ghost" size="sm">{common.notes}</Button>
            </div>
          )},
        ]}
      />
    </div>
  );
}
