import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { common } from "@/lib/locale/fa";

const tags = [
  { id: "1", name: "مبتدی", articles: 4 },
  { id: "2", name: "کراس‌فیت", articles: 6 },
  { id: "3", name: "تغذیه", articles: 5 },
  { id: "4", name: "ریکاوری", articles: 2 },
];

export default function TagsPage() {
  return (
    <div>
      <PageHeader title="برچسب‌های وبلاگ" description="مدیریت برچسب‌های مقالات" action={{ label: "افزودن برچسب" }} />
      <DataTable
        data={tags}
        columns={[
          { key: "name", header: "برچسب", render: (r) => `#${r.name}` },
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
