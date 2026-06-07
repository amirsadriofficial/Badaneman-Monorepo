import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { common } from "@/lib/locale/fa";

const sourceLabels: Record<string, string> = {
  youtube: "یوتیوب",
  aparat: "آپارات",
  upload: "آپلود",
};

const videos = [
  { id: "1", title: "تور باشگاه", source: "youtube", description: "تور مجازی از امکانات ما" },
  { id: "2", title: "معرفی کراس‌فیت", source: "aparat", description: "معرفی برنامه کراس‌فیت" },
  { id: "3", title: "مصاحبه با مربی", source: "upload", description: "آشنایی با مربی ارشد" },
];

export default function VideosPage() {
  return (
    <div>
      <PageHeader title="ویدیوها" description="مدیریت ویدیوها از یوتیوب، آپارات یا آپلود مستقیم" action={{ label: "افزودن ویدیو" }} />
      <DataTable
        data={videos}
        columns={[
          { key: "title", header: "عنوان", render: (r) => r.title },
          { key: "source", header: "منبع", render: (r) => (
            <Badge className="bg-zinc-100 text-zinc-700">{sourceLabels[r.source] ?? r.source}</Badge>
          )},
          { key: "description", header: "توضیحات", render: (r) => r.description, hideOnMobile: true },
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
