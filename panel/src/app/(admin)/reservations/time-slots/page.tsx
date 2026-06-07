import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, Input, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { common, statusLabel } from "@/lib/locale/fa";

const weekDays = ["دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه", "یکشنبه"];

export default function TimeSlotsPage() {
  return (
    <div>
      <PageHeader title="مدیریت بازه‌های زمانی" description="تنظیم روزهای کاری، ساعات، مدت بازه و تاریخ‌های غیرفعال" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>برنامه کاری</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {weekDays.map((day) => (
              <div key={day} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <span className="w-28 text-sm font-medium text-zinc-700">{day}</span>
                <Input type="time" defaultValue="09:00" className="w-32" />
                <span className="text-zinc-400">تا</span>
                <Input type="time" defaultValue="21:00" className="w-32" />
              </div>
            ))}
            <FormField label="مدت بازه (دقیقه)">
              <Select defaultValue="30">
                <option value="15">۱۵ دقیقه</option>
                <option value="30">۳۰ دقیقه</option>
                <option value="60">۶۰ دقیقه</option>
              </Select>
            </FormField>
            <Button>{common.save}</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>تاریخ‌های غیرفعال</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <FormField label="افزودن تاریخ تعطیل / تعمیرات">
              <Input type="date" />
            </FormField>
            <FormField label="دلیل">
              <Select>
                <option value="holiday">{statusLabel("holiday")}</option>
                <option value="maintenance">{statusLabel("maintenance")}</option>
              </Select>
            </FormField>
            <Button variant="outline">افزودن تاریخ غیرفعال</Button>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li className="rounded-lg border p-3">۲۵ خرداد ۱۴۰۵ — {statusLabel("holiday")}</li>
              <li className="rounded-lg border p-3">۱۰ تیر ۱۴۰۵ — {statusLabel("maintenance")}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
