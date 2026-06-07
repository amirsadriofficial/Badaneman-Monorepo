"use client";

import { useEffect, useState } from "react";
import { products } from "@/lib/mock-data";
import type { CartItem } from "@/lib/types";
import { Card, CardContent, SectionTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Textarea, FormField } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { common } from "@/lib/locale/fa";
import Link from "next/link";

const DELIVERY_FEE = 85000;

function loadCart(): CartItem[] {
  const stored = JSON.parse(localStorage.getItem("cart") ?? "[]") as { id: string; quantity: number }[];
  const items: CartItem[] = [];
  for (const item of stored) {
    const product = products.find((p) => p.id === item.id);
    if (product) items.push({ ...product, quantity: item.quantity });
  }
  return items;
}

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">("pickup");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setItems(loadCart());
  }, []);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + (fulfillment === "delivery" ? DELIVERY_FEE : 0);

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        <Card>
          <CardContent className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl">
              ✓
            </div>
            <h2 className="text-xl font-semibold">سفارش شما ثبت شد</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              سفارش در انتظار بررسی است. پس از تأیید پرداخت، وضعیت سفارش به‌روزرسانی می‌شود.
            </p>
            <Link href="/dashboard/orders" className="mt-6 inline-block text-primary hover:underline">
              مشاهده سفارش‌ها
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-muted-foreground">سبد خرید خالی است.</p>
        <Link href="/store" className="mt-4 inline-block text-primary hover:underline">
          بازگشت به فروشگاه
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle title="تسویه حساب" subtitle="روش تحویل و اطلاعات پرداخت" />

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          localStorage.removeItem("cart");
          setSubmitted(true);
        }}
      >
        <Card>
          <CardContent className="space-y-3">
            <h3 className="font-semibold">روش تحویل</h3>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 has-[:checked]:border-primary">
              <input
                type="radio"
                name="fulfillment"
                value="pickup"
                checked={fulfillment === "pickup"}
                onChange={() => setFulfillment("pickup")}
              />
              <div>
                <p className="font-medium">تحویل حضوری</p>
                <p className="text-sm text-muted-foreground">دریافت از باشگاه — بدون هزینه ارسال</p>
              </div>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 has-[:checked]:border-primary">
              <input
                type="radio"
                name="fulfillment"
                value="delivery"
                checked={fulfillment === "delivery"}
                onChange={() => setFulfillment("delivery")}
              />
              <div>
                <p className="font-medium">ارسال محلی</p>
                <p className="text-sm text-muted-foreground">
                  هزینه ارسال: {formatCurrency(DELIVERY_FEE)}
                </p>
              </div>
            </label>
          </CardContent>
        </Card>

        {fulfillment === "delivery" && (
          <Card>
            <CardContent className="space-y-4">
              <h3 className="font-semibold">آدرس تحویل</h3>
              <FormField label="آدرس کامل">
                <Textarea placeholder="خیابان، پلاک، واحد..." required />
              </FormField>
              <FormField label="شماره تماس">
                <Input type="tel" placeholder="۰۹۱۲۳۴۵۶۷۸۹" dir="ltr" className="text-left" required />
              </FormField>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent>
            <h3 className="mb-3 font-semibold">خلاصه سفارش</h3>
            <div className="space-y-2 text-sm">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
              {fulfillment === "delivery" && (
                <div className="flex justify-between text-muted-foreground">
                  <span>هزینه ارسال</span>
                  <span>{formatCurrency(DELIVERY_FEE)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-border pt-2 font-semibold">
                <span>جمع کل</span>
                <span className="text-primary">{formatCurrency(total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="mb-3 font-semibold">راهنمای پرداخت</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>بانک: بانک ملت</p>
              <p>شماره حساب: <span dir="ltr">۱۲۳۴۵۶۷۸۹۰</span></p>
              <p>به نام: باشگاه بدن‌من</p>
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
            href="/store/cart"
            className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-border text-sm font-medium hover:bg-muted"
          >
            {common.back}
          </Link>
          <Button type="submit" className="flex-1">
            ثبت سفارش
          </Button>
        </div>
      </form>
    </div>
  );
}
