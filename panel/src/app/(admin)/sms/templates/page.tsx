import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { smsTemplates } from "@/lib/mock-data";
import { common, statusLabel } from "@/lib/locale/fa";

export default function SmsTemplatesPage() {
  return (
    <div>
      <PageHeader title="قالب‌های پیامک" description="مدیریت قالب‌های پیامک برای ثبت‌نام، عضویت، رزرو، سفارش و استخدام" action={{ label: "افزودن قالب" }} />
      <DataTable
        data={smsTemplates}
        columns={[
          { key: "name", header: "قالب", render: (r) => r.name },
          { key: "category", header: "دسته‌بندی", render: (r) => r.category, hideOnMobile: true },
          { key: "status", header: common.status, render: (r) => (
            <Badge className={r.active ? "bg-emerald-100 text-emerald-800" : "bg-zinc-100 text-zinc-600"}>
              {statusLabel(r.active ? "active" : "inactive")}
            </Badge>
          )},
          { key: "actions", header: common.actions, render: () => (
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="ghost" size="sm">{common.edit}</Button>
              <Button variant="ghost" size="sm">{common.preview}</Button>
            </div>
          )},
        ]}
      />
    </div>
  );
}
