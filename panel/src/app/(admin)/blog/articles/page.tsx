import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogArticles } from "@/lib/mock-data";
import { common, statusLabel } from "@/lib/locale/fa";

export default function ArticlesPage() {
  return (
    <div>
      <PageHeader title="مقالات وبلاگ" description="مدیریت پست‌های وبلاگ با فیلدهای سئو و بلوک پرسش و پاسخ" action={{ label: "مقاله جدید" }} />
      <DataTable
        data={blogArticles}
        columns={[
          { key: "title", header: "عنوان", render: (r) => r.title },
          { key: "category", header: "دسته‌بندی", render: (r) => r.category, hideOnMobile: true },
          { key: "author", header: "نویسنده", render: (r) => r.author, hideOnMobile: true },
          { key: "views", header: "بازدید", render: (r) => r.views.toLocaleString("fa-IR") },
          { key: "status", header: common.status, render: (r) => (
            <Badge className={r.published ? "bg-emerald-100 text-emerald-800" : "bg-zinc-100 text-zinc-600"}>
              {statusLabel(r.published ? "published" : "draft")}
            </Badge>
          )},
          { key: "actions", header: common.actions, render: () => (
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="ghost" size="sm">{common.edit}</Button>
              <Button variant="ghost" size="sm">سئو</Button>
            </div>
          )},
        ]}
      />
    </div>
  );
}
