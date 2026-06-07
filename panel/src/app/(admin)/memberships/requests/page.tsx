import { PageHeader } from "@/components/shared/page-header";
import { DataTable, StatusBadge } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { membershipRequests } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { common } from "@/lib/locale/fa";

export default function MembershipRequestsPage() {
  return (
    <div>
      <PageHeader title="درخواست‌های عضویت" description="بررسی و تأیید درخواست‌های عضویت" />
      <DataTable
        data={membershipRequests}
        columns={[
          { key: "id", header: "شناسه", render: (r) => r.id },
          { key: "user", header: "کاربر", render: (r) => r.user },
          { key: "plan", header: "پلن", render: (r) => r.plan, hideOnMobile: true },
          { key: "date", header: "تاریخ ارسال", render: (r) => formatDate(r.submittedAt), hideOnMobile: true },
          { key: "status", header: common.status, render: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", header: common.actions, render: () => (
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="ghost" size="sm">{common.approve}</Button>
              <Button variant="ghost" size="sm">{common.reject}</Button>
              <Button variant="ghost" size="sm">{common.notes}</Button>
            </div>
          )},
        ]}
      />
    </div>
  );
}
