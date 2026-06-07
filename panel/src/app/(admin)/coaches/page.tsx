import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { coaches } from "@/lib/mock-data";
import { common, statusLabel } from "@/lib/locale/fa";

export default function CoachesPage() {
  return (
    <div>
      <PageHeader title="مربیان" description="مدیریت پروفایل مربیان، عکس‌ها و لینک‌های شبکه‌های اجتماعی" action={{ label: "افزودن مربی" }} />
      <DataTable
        data={coaches}
        columns={[
          { key: "name", header: "نام", render: (r) => r.name },
          { key: "position", header: "سمت", render: (r) => r.position },
          { key: "experience", header: "سابقه", render: (r) => r.experience, hideOnMobile: true },
          { key: "status", header: common.status, render: (r) => (
            <Badge className={r.active ? "bg-emerald-100 text-emerald-800" : "bg-zinc-100 text-zinc-600"}>
              {statusLabel(r.active ? "active" : "inactive")}
            </Badge>
          )},
          { key: "actions", header: common.actions, render: () => (
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="ghost" size="sm">{common.edit}</Button>
              <Button variant="ghost" size="sm">تغییر ترتیب</Button>
            </div>
          )},
        ]}
      />
    </div>
  );
}
