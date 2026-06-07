import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/mock-data";
import { common, statusLabel } from "@/lib/locale/fa";

export default function InventoryPage() {
  return (
    <div>
      <PageHeader title="مدیریت موجودی" description="پیگیری موجودی انبار و هشدار کمبود" />
      <DataTable
        data={products}
        columns={[
          { key: "name", header: "محصول", render: (r) => r.name },
          { key: "sku", header: "کد کالا", render: (r) => r.sku, hideOnMobile: true },
          { key: "stock", header: "تعداد موجودی", render: (r) => r.stock },
          { key: "status", header: common.status, render: (r) => {
            if (r.stock === 0) return <Badge className="bg-red-100 text-red-800">{statusLabel("out_of_stock")}</Badge>;
            if (r.lowStock) return <Badge className="bg-amber-100 text-amber-800">{statusLabel("low_stock")}</Badge>;
            return <Badge className="bg-emerald-100 text-emerald-800">{statusLabel("in_stock")}</Badge>;
          }},
        ]}
      />
    </div>
  );
}
