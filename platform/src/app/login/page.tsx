"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, FormField } from "@/components/ui/input";
import { common } from "@/lib/locale/fa";
import Link from "next/link";

export default function LoginPage() {
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md">
        <CardContent>
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold">ورود به بدن‌من</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {step === "mobile"
                ? "شماره موبایل خود را وارد کنید"
                : "کد تأیید ارسال‌شده را وارد کنید"}
            </p>
          </div>

          {step === "mobile" ? (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (mobile.trim()) setStep("otp");
              }}
            >
              <FormField label="شماره موبایل">
                <Input
                  type="tel"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  dir="ltr"
                  className="text-left"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </FormField>
              <Button type="submit" className="w-full">
                دریافت کد تأیید
              </Button>
            </form>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = "/dashboard";
              }}
            >
              <p className="text-center text-sm text-muted-foreground">
                کد به شماره <span dir="ltr">{mobile}</span> ارسال شد
              </p>
              <FormField label="کد تأیید">
                <Input
                  type="text"
                  placeholder="۱۲۳۴۵۶"
                  dir="ltr"
                  className="text-center tracking-widest"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </FormField>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setStep("mobile")}>
                  {common.back}
                </Button>
                <Button type="submit" className="flex-1">
                  {common.login}
                </Button>
              </div>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link href="/" className="text-primary hover:underline">
              بازگشت به صفحه اصلی
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
