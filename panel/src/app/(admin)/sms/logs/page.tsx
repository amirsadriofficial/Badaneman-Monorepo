import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { common, statusLabel } from "@/lib/locale/fa";

const logs = [
  { id: "1", recipient: "09121111111", message: "کد تأیید شما: ۴۸۲۹", status: "delivered", sentAt: "2026-06-07T10:00:00" },
  { id: "2", recipient: "09122222222", message: "عضویت شما تأیید شد!", status: "delivered", sentAt: "2026-06-06T14:20:00" },
  { id: "3", recipient: "09123333333", message: "رزرو شما برای ۸ خرداد تأیید شد", status: "failed", sentAt: "2026-06-06T11:00:00" },
];

export default function SmsLogsPage() {
  return (
    <div>
      <PageHeader title="گزارش پیامک‌ها" description="مشاهده پیامک‌های ارسال‌شده و وضعیت تحویل" />
      <DataTable
        data={logs}
        columns={[
          { key: "recipient", header: "گیرنده", render: (r) => r.recipient },
          { key: "message", header: "پیام", render: (r) => r.message, hideOnMobile: true },
          { key: "status", header: common.status, render: (r) => (
            <Badge className={r.status === "delivered" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}>
              {statusLabel(r.status)}
            </Badge>
          )},
          { key: "sentAt", header: "تاریخ ارسال", render: (r) => formatDate(r.sentAt) },
        ]}
      />
    </div>
  );
}
