import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { common } from "@/lib/locale/fa";

const days = ["دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه", "یکشنبه"];

export default function WorkingHoursPage() {
  return (
    <div>
      <PageHeader title="ساعات کاری" description="مدیریت ساعات باز بودن روزانه، تعطیلات و بسته‌شدن موقت" />
      <Card>
        <CardHeader><CardTitle>برنامه روزانه</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {days.map((day) => (
            <div key={day} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <span className="w-28 text-sm font-medium">{day}</span>
              <Input type="time" defaultValue="06:00" className="w-32" />
              <span className="text-zinc-400">—</span>
              <Input type="time" defaultValue="22:00" className="w-32" />
            </div>
          ))}
          <Button className="mt-4 w-full sm:w-auto">{common.save}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
