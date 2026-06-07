import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { notifications } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { notificationTypes } from "@/lib/locale/fa";

const typeColors: Record<string, string> = {
  membership: "bg-blue-100 text-blue-800",
  reservation: "bg-purple-100 text-purple-800",
  order: "bg-orange-100 text-orange-800",
  recruitment: "bg-emerald-100 text-emerald-800",
};

export default function NotificationsPage() {
  return (
    <div>
      <PageHeader title="مرکز اعلان‌ها" description="اعلان‌های لحظه‌ای برای درخواست‌ها و درخواست‌های جدید" />
      <div className="space-y-3">
        {notifications.map((n) => (
          <Card key={n.id} className={!n.read ? "border-s-4 border-s-zinc-900" : ""}>
            <CardContent className="flex items-start justify-between p-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge className={typeColors[n.type]}>{notificationTypes[n.type] ?? n.type}</Badge>
                  {!n.read && <Badge className="bg-zinc-900 text-white">جدید</Badge>}
                </div>
                <p className="mt-2 font-medium text-zinc-900">{n.title}</p>
                <p className="mt-1 text-sm text-zinc-500">{n.message}</p>
                <p className="mt-2 text-xs text-zinc-400">{formatDate(n.createdAt)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
