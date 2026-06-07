import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { common } from "@/lib/locale/fa";

const categories = [
  { id: "1", name: "مکمل‌ها", slug: "supplements", products: 12 },
  { id: "2", name: "لوازم جانبی", slug: "accessories", products: 8 },
  { id: "3", name: "پوشاک", slug: "apparel", products: 15 },
];

export default function CategoriesPage() {
  return (
    <div>
      <PageHeader title="دسته‌بندی محصولات" description="مدیریت دسته‌بندی‌های محصولات" action={{ label: "افزودن دسته‌بندی" }} />
      <DataTable
        data={categories}
        columns={[
          { key: "name", header: "نام", render: (r) => r.name },
          { key: "slug", header: "نامک", render: (r) => r.slug, hideOnMobile: true },
          { key: "products", header: "محصولات", render: (r) => r.products },
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
