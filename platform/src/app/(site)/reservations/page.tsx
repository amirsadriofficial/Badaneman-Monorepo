"use client";

import { useState } from "react";
import { Card, CardContent, SectionTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select, FormField } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { common } from "@/lib/locale/fa";
import Link from "next/link";

const services = [
  { id: "massage", name: "ماساژ", price: 450000 },
  { id: "solarium", name: "سولاریوم", price: 280000 },
];

const timeSlots = ["۱۰:۰۰", "۱۱:۰۰", "۱۲:۰۰", "۱۴:۰۰", "۱۵:۰۰", "۱۶:۰۰", "۱۷:۰۰", "۱۸:۰۰"];

const paymentInstructions = {
  bank: "بانک ملت",
  account: "۱۲۳۴۵۶۷۸۹۰",
  holder: "باشگاه بدن‌من",
};

export default function ReservationsPage() {
  const [serviceId, setServiceId] = useState(services[0].id);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const service = services.find((s) => s.id === serviceId) ?? services[0];

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        <Card>
          <CardContent className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl">
              ✓
            </div>
            <h2 className="text-xl font-semibold">رزرو شما ثبت شد</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              درخواست رزرو {service.name} برای {date} ساعت {timeSlot} در انتظار تأیید است.
            </p>
            <Link href="/dashboard/reservations" className="mt-6 inline-block text-primary hover:underline">
              مشاهده رزروها
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle title="رزرو خدمات" subtitle="ماساژ و سولاریوم — تاریخ و ساعت دلخواه را انتخاب کنید" />

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <Card>
          <CardContent className="space-y-4">
            <FormField label="نوع خدمت">
              <Select value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — {formatCurrency(s.price)}
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField label="تاریخ">
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </FormField>

            <FormField label="ساعت">
              <Select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required>
                <option value="">انتخاب ساعت</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </Select>
            </FormField>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="mb-3 font-semibold">راهنمای پرداخت</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>مبلغ: <span className="font-semibold text-primary">{formatCurrency(service.price)}</span></p>
              <p>بانک: {paymentInstructions.bank}</p>
              <p>شماره حساب: <span dir="ltr">{paymentInstructions.account}</span></p>
              <p>به نام: {paymentInstructions.holder}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <FormField label="آپلود رسید پرداخت">
              <input
                type="file"
                accept="image/*,.pdf"
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm file:ml-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-1 file:text-sm file:text-primary-foreground"
                required
              />
            </FormField>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full">
          {common.submit}
        </Button>
      </form>
    </div>
  );
}
