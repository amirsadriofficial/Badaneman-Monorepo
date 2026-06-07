"use client";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { common, statusLabel } from "@/lib/locale/fa";
import { useState } from "react";
import type { GymStatus } from "@/lib/types";

const statuses: { value: GymStatus; label: string; description: string }[] = [
  { value: "open", label: statusLabel("open"), description: "باشگاه باز است و پذیرای مراجعه‌کنندگان می‌باشد" },
  { value: "closed", label: statusLabel("closed"), description: "باشگاه به‌طور موقت بسته است" },
  { value: "holiday", label: statusLabel("holiday"), description: "به دلیل تعطیلات بسته است" },
  { value: "maintenance", label: statusLabel("maintenance"), description: "در حال تعمیرات و نگهداری" },
];

export default function GymStatusPage() {
  const [current, setCurrent] = useState<GymStatus>("open");

  return (
    <div>
      <PageHeader
        title="وضعیت باشگاه"
        description="تنظیم وضعیت فعلی باشگاه — تغییرات بلافاصله در وب‌سایت عمومی نمایش داده می‌شود"
      />
      <Card>
        <CardHeader>
          <CardTitle>وضعیت فعلی: <StatusBadge status={current} /></CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {statuses.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setCurrent(s.value)}
              className={`rounded-xl border p-4 text-start transition-colors ${
                current === s.value
                  ? "border-zinc-900 bg-zinc-50"
                  : "border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <p className="font-medium text-zinc-900">{s.label}</p>
              <p className="mt-1 text-sm text-zinc-500">{s.description}</p>
            </button>
          ))}
        </CardContent>
      </Card>
      <div className="mt-4">
        <Button>{common.save}</Button>
      </div>
    </div>
  );
}
