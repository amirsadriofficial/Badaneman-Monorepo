import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { common } from "@/lib/locale/fa";

const gallery = [
  { id: "1", title: "سالن اصلی", category: "داخلی", album: "گالری اصلی" },
  { id: "2", title: "منطقه کراس‌فیت", category: "امکانات", album: "گالری اصلی" },
  { id: "3", title: "عکس تیم ۱۴۰۴", category: "رویدادها", album: "رویدادها" },
];

export default function GalleryPage() {
  return (
    <div>
      <PageHeader title="گالری تصاویر" description="مدیریت تصاویر، دسته‌بندی‌ها و آلبوم‌ها" action={{ label: "آپلود تصویر" }} />
      <DataTable
        data={gallery}
        columns={[
          { key: "title", header: "عنوان", render: (r) => r.title },
          { key: "category", header: "دسته‌بندی", render: (r) => r.category, hideOnMobile: true },
          { key: "album", header: "آلبوم", render: (r) => r.album },
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
