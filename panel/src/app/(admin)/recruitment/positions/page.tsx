import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { common, statusLabel } from "@/lib/locale/fa";

const positions = [
  { id: "1", title: "مربی", department: "آموزش", active: true },
  { id: "2", title: "ماساژور", department: "خدمات", active: true },
  { id: "3", title: "اپراتور سولاریوم", department: "خدمات", active: false },
  { id: "4", title: "خدمات", department: "عملیات", active: true },
];

export default function PositionsPage() {
  return (
    <div>
      <PageHeader title="موقعیت‌های شغلی" description="مدیریت موقعیت‌های استخدامی موجود" action={{ label: "افزودن موقعیت" }} />
      <DataTable
        data={positions}
        columns={[
          { key: "title", header: "موقعیت", render: (r) => r.title },
          { key: "department", header: "بخش", render: (r) => r.department, hideOnMobile: true },
          { key: "status", header: common.status, render: (r) => (
            <Badge className={r.active ? "bg-emerald-100 text-emerald-800" : "bg-zinc-100 text-zinc-600"}>
              {statusLabel(r.active ? "active" : "closed")}
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
