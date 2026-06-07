"use client";

import { useState } from "react";
import { mockUser } from "@/lib/mock-data";
import { Card, CardContent, SectionTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select, FormField } from "@/components/ui/input";
import { common } from "@/lib/locale/fa";
import Link from "next/link";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(mockUser.name || "علی محمدی");
  const [mobile, setMobile] = useState(mockUser.mobile || "۰۹۱۲۱۲۳۴۵۶۷");
  const [gender, setGender] = useState(mockUser.gender || "male");
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/dashboard" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← بازگشت به پنل
      </Link>

      <SectionTitle title="پروفایل" subtitle="اطلاعات شخصی شما" />

      {saved && (
        <p className="mb-4 rounded-xl bg-primary/10 px-4 py-2 text-center text-sm text-primary">
          تغییرات ذخیره شد.
        </p>
      )}

      <Card>
        <CardContent>
          {editing ? (
            <form className="space-y-4" onSubmit={handleSave}>
              <FormField label="نام و نام خانوادگی">
                <Input value={name} onChange={(e) => setName(e.target.value)} required />
              </FormField>
              <FormField label="شماره موبایل">
                <Input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  dir="ltr"
                  className="text-left"
                  required
                />
              </FormField>
              <FormField label="جنسیت">
                <Select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="male">مرد</option>
                  <option value="female">زن</option>
                </Select>
              </FormField>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setEditing(false)}>
                  {common.cancel}
                </Button>
                <Button type="submit" className="flex-1">
                  {common.save}
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">نام</p>
                <p className="font-medium">{name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">موبایل</p>
                <p className="font-medium" dir="ltr">
                  {mobile}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">جنسیت</p>
                <p className="font-medium">{gender === "male" ? "مرد" : "زن"}</p>
              </div>
              <Button onClick={() => setEditing(true)} className="w-full sm:w-auto">
                ویرایش پروفایل
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
