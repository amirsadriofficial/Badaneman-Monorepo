import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { facilities } from "@/lib/mock-data";
import { common, statusLabel } from "@/lib/locale/fa";

export default function FacilitiesPage() {
  return (
    <div>
      <PageHeader title="امکانات" description="مدیریت امکانات باشگاه، تصاویر، ویدیوها و ترتیب نمایش" action={{ label: "افزودن امکانات" }} />
      <DataTable
        data={facilities}
        columns={[
          { key: "title", header: "عنوان", render: (r) => r.title },
          { key: "sortOrder", header: "ترتیب", render: (r) => r.sortOrder, hideOnMobile: true },
          { key: "video", header: "ویدیو", render: (r) => (
            <Badge className={r.hasVideo ? "bg-blue-100 text-blue-800" : "bg-zinc-100 text-zinc-600"}>
              {statusLabel(r.hasVideo ? "yes" : "no")}
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
