import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { common } from "@/lib/locale/fa";

const achievements = [
  { id: "1", title: "بهترین باشگاه ۱۴۰۴", description: "جایزه تناسب اندام شهر", category: "جایزه" },
  { id: "2", title: "گواهی ISO 9001", description: "گواهی مدیریت کیفیت", category: "گواهینامه" },
  { id: "3", title: "مسابقات منطقه‌ای کراس‌فیت", description: "رتبه اول تیمی", category: "مسابقه" },
];

export default function AchievementsPage() {
  return (
    <div>
      <PageHeader title="افتخارات" description="مدیریت جوایز، گواهینامه‌ها، مسابقات و افتخارات" action={{ label: "افزودن افتخار" }} />
      <DataTable
        data={achievements}
        columns={[
          { key: "title", header: "عنوان", render: (r) => r.title },
          { key: "description", header: "توضیحات", render: (r) => r.description, hideOnMobile: true },
          { key: "category", header: "دسته‌بندی", render: (r) => r.category },
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
