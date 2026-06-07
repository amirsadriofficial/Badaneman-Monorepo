"use client";

import { useSearchParams } from "next/navigation";
import { membershipPlans } from "@/lib/mock-data";
import { Card, CardContent, SectionTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, FormField } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { common } from "@/lib/locale/fa";
import Link from "next/link";
import { Suspense, useState } from "react";

const paymentInstructions = {
  bank: "بانک ملت",
  account: "۱۲۳۴۵۶۷۸۹۰",
  holder: "باشگاه بدن‌من",
  note: "لطفاً مبلغ پلن انتخابی را واریز کرده و تصویر رسید را آپلود کنید.",
};

function MembershipRequestForm() {
  const searchParams = useSearchParams();
  const defaultPlan = searchParams.get("plan") ?? membershipPlans[0].id;
  const [planId, setPlanId] = useState(defaultPlan);
  const [submitted, setSubmitted] = useState(false);

  const selectedPlan = membershipPlans.find((p) => p.id === planId) ?? membershipPlans[0];

  if (submitted) {
    return (
      <Card>
        <CardContent className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl">
            ✓
          </div>
          <h2 className="text-xl font-semibold">درخواست شما ثبت شد</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            درخواست عضویت شما در انتظار بررسی است. پس از تأیید، از طریق پیامک مطلع خواهید شد.
          </p>
          <Link href="/dashboard/memberships" className="mt-6 inline-block text-primary hover:underline">
            مشاهده وضعیت درخواست
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <Card>
        <CardContent className="space-y-4">
          <FormField label="انتخاب پلن">
            <Select value={planId} onChange={(e) => setPlanId(e.target.value)}>
              {membershipPlans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {formatCurrency(p.price)}
                </option>
              ))}
            </Select>
          </FormField>
          <div className="rounded-xl bg-muted p-4 text-sm">
            <p>
              <span className="text-muted-foreground">مبلغ قابل پرداخت: </span>
              <span className="font-semibold text-primary">{formatCurrency(selectedPlan.price)}</span>
            </p>
            <p className="mt-1 text-muted-foreground">مدت: {selectedPlan.duration}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h3 className="mb-3 font-semibold">راهنمای پرداخت</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>بانک: {paymentInstructions.bank}</p>
            <p>
              شماره حساب: <span dir="ltr">{paymentInstructions.account}</span>
            </p>
            <p>به نام: {paymentInstructions.holder}</p>
            <p className="mt-3 text-foreground">{paymentInstructions.note}</p>
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

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/membership"
          className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-border text-sm font-medium hover:bg-muted"
        >
          {common.back}
        </Link>
        <Button type="submit" className="flex-1">
          {common.submit}
        </Button>
      </div>
    </form>
  );
}

export default function MembershipRequestPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle title="درخواست عضویت" subtitle="پلن را انتخاب کنید و رسید پرداخت را ارسال کنید" />
      <Suspense fallback={<p className="text-center text-muted-foreground">در حال بارگذاری...</p>}>
        <MembershipRequestForm />
      </Suspense>
    </div>
  );
}
