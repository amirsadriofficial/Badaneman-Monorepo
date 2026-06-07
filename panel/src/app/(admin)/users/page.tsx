import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { recentUsers } from "@/lib/mock-data";
import { common } from "@/lib/locale/fa";

export default function UsersPage() {
  const users = recentUsers.map((u, i) => ({ ...u, id: String(i + 1) }));

  return (
    <div>
      <PageHeader title="مدیریت کاربران" description="مشاهده و مدیریت پروفایل‌ها و فعالیت کاربران" />
      <DataTable
        title="همه کاربران"
        data={users}
        columns={[
          { key: "name", header: "نام کامل", render: (r) => r.name },
          { key: "mobile", header: "موبایل", render: (r) => r.mobile },
          { key: "gender", header: "جنسیت", render: (r) => r.gender, hideOnMobile: true },
          { key: "registeredAt", header: "تاریخ ثبت‌نام", render: (r) => r.registeredAt, hideOnMobile: true },
          { key: "actions", header: common.actions, render: () => (
            <Button variant="ghost" size="sm">مشاهده فعالیت</Button>
          )},
        ]}
      />
    </div>
  );
}
