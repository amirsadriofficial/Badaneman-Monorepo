import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { common } from "@/lib/locale/fa";

const categories = [
  { id: "1", name: "تمرین", slug: "training", articles: 8 },
  { id: "2", name: "تغذیه", slug: "nutrition", articles: 5 },
  { id: "3", name: "سلامت", slug: "health", articles: 3 },
];

export default function BlogCategoriesPage() {
  return (
    <div>
      <PageHeader title="دسته‌بندی‌های وبلاگ" description="مدیریت دسته‌بندی‌های مقالات" action={{ label: "افزودن دسته‌بندی" }} />
      <DataTable
        data={categories}
        columns={[
          { key: "name", header: "نام", render: (r) => r.name },
          { key: "slug", header: "نامک", render: (r) => r.slug, hideOnMobile: true },
          { key: "articles", header: "مقالات", render: (r) => r.articles },
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
