"use client";

import { useSearchParams } from "next/navigation";
import { jobs } from "@/lib/mock-data";
import { Card, CardContent, SectionTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select, FormField } from "@/components/ui/input";
import { common } from "@/lib/locale/fa";
import Link from "next/link";
import { Suspense, useState } from "react";

function ApplicationForm() {
  const searchParams = useSearchParams();
  const defaultPosition = searchParams.get("position") ?? jobs[0].id;
  const [positionId, setPositionId] = useState(defaultPosition);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <Card>
        <CardContent className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl">
            ✓
          </div>
          <h2 className="text-xl font-semibold">درخواست شما ثبت شد</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            رزومه شما دریافت شد و در صورت تأیید اولیه، با شما تماس گرفته خواهد شد.
          </p>
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
          <FormField label="نام و نام خانوادگی">
            <Input placeholder="نام کامل" required />
          </FormField>

          <FormField label="شماره موبایل">
            <Input type="tel" placeholder="۰۹۱۲۳۴۵۶۷۸۹" dir="ltr" className="text-left" required />
          </FormField>

          <FormField label="موقعیت شغلی">
            <Select value={positionId} onChange={(e) => setPositionId(e.target.value)}>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="توضیحات">
            <Textarea placeholder="سوابق کاری، مهارت‌ها و انگیزه همکاری..." required />
          </FormField>

          <FormField label="آپلود رزومه">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm file:ml-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-1 file:text-sm file:text-primary-foreground"
              required
            />
          </FormField>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/recruitment"
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

export default function ApplyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle title="درخواست همکاری" subtitle="فرم زیر را تکمیل کنید و رزومه خود را ارسال کنید" />
      <Suspense fallback={<p className="text-center text-muted-foreground">در حال بارگذاری...</p>}>
        <ApplicationForm />
      </Suspense>
    </div>
  );
}
