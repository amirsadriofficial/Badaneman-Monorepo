import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/mock-data";
import { common } from "@/lib/locale/fa";

export default function ProductsPage() {
  return (
    <div>
      <PageHeader title="محصولات" description="مدیریت محصولات فروشگاه، انواع، تصاویر و موجودی" action={{ label: "افزودن محصول" }} />
      <DataTable
        data={products}
        columns={[
          { key: "name", header: "نام", render: (r) => r.name },
          { key: "category", header: "دسته‌بندی", render: (r) => r.category, hideOnMobile: true },
          { key: "sku", header: "کد کالا", render: (r) => r.sku, hideOnMobile: true },
          { key: "stock", header: "موجودی", render: (r) => (
            <Badge className={r.stock === 0 ? "bg-red-100 text-red-800" : r.lowStock ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}>
              {r.stock}
            </Badge>
          )},
          { key: "actions", header: common.actions, render: () => (
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="ghost" size="sm">{common.edit}</Button>
              <Button variant="ghost" size="sm">انواع</Button>
            </div>
          )},
        ]}
      />
    </div>
  );
}
