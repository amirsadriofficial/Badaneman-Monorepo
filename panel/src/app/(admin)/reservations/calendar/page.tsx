import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { reservationRequests } from "@/lib/mock-data";

const days = ["دوشنبه ۸", "سه‌شنبه ۹", "چهارشنبه ۱۰", "پنج‌شنبه ۱۱", "جمعه ۱۲", "شنبه ۱۳", "یکشنبه ۱۴"];
const hours = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

export default function ReservationCalendarPage() {
  return (
    <div>
      <PageHeader title="تقویم رزرو" description="نمای روزانه، هفتگی و ماهانه رزروها" />
      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <Button size="sm">روزانه</Button>
        <Button size="sm" variant="outline">هفتگی</Button>
        <Button size="sm" variant="outline">ماهانه</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>هفته ۱۷ خرداد ۱۴۰۵</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-right text-zinc-500">ساعت</th>
                {days.map((d) => (
                  <th key={d} className="p-2 text-center text-zinc-500">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour) => (
                <tr key={hour} className="border-b border-zinc-100">
                  <td className="p-2 font-medium text-zinc-600">{hour}</td>
                  {days.map((d) => {
                    const booking = reservationRequests.find(
                      (r) => r.time === hour && r.date.includes("08"),
                    );
                    return (
                      <td key={d} className="p-1">
                        {booking && hour === "10:00" && d === "دوشنبه ۸" ? (
                          <div className="rounded bg-blue-50 p-2 text-xs">
                            <p className="font-medium">{booking.user}</p>
                            <p className="text-zinc-500">{booking.service}</p>
                            <StatusBadge status={booking.status} />
                          </div>
                        ) : (
                          <div className="h-12 rounded border border-dashed border-zinc-200" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
