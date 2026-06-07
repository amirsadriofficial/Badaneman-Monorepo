import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { auditLogs } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function AuditLogsPage() {
  return (
    <div>
      <PageHeader title="گزارش فعالیت‌ها" description="پیگیری تمام اقدامات مهم مدیریتی" />
      <DataTable
        data={auditLogs}
        columns={[
          { key: "admin", header: "کاربر مدیر", render: (r) => r.admin },
          { key: "action", header: "عملیات", render: (r) => r.action },
          { key: "timestamp", header: "زمان", render: (r) => formatDate(r.timestamp), hideOnMobile: true },
        ]}
      />
    </div>
  );
}
