"use client";

import { useState } from "react";
import { Card, CardContent, SectionTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select, FormField } from "@/components/ui/input";
import { common } from "@/lib/locale/fa";

const fitnessGoals = [
  { value: "weight_loss", label: "کاهش وزن" },
  { value: "muscle_gain", label: "افزایش حجم عضلانی" },
  { value: "general", label: "تناسب اندام عمومی" },
  { value: "endurance", label: "افزایش استقامت" },
];

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        <Card>
          <CardContent className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl">
              ✓
            </div>
            <h2 className="text-xl font-semibold">درخواست مشاوره ثبت شد</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle
        title="مشاوره رایگان"
        subtitle="هدف ورزشی خود را مشخص کنید — ما با شما تماس می‌گیریم"
      />

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

            <FormField label="هدف ورزشی">
              <Select required defaultValue="">
                <option value="" disabled>
                  انتخاب کنید
                </option>
                {fitnessGoals.map((goal) => (
                  <option key={goal.value} value={goal.value}>
                    {goal.label}
                  </option>
                ))}
              </Select>
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
