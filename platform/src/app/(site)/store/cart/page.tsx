"use client";

import { useEffect, useState } from "react";
import { products } from "@/lib/mock-data";
import type { CartItem } from "@/lib/types";
import { Card, CardContent, LinkButton, SectionTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { common } from "@/lib/locale/fa";
import Link from "next/link";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const stored = JSON.parse(localStorage.getItem("cart") ?? "[]") as { id: string; quantity: number }[];
  const items: CartItem[] = [];
  for (const item of stored) {
    const product = products.find((p) => p.id === item.id);
    if (product) items.push({ ...product, quantity: item.quantity });
  }
  return items;
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(
    "cart",
    JSON.stringify(items.map((i) => ({ id: i.id, quantity: i.quantity }))),
  );
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setLoaded(true);
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function updateQuantity(id: string, delta: number) {
    setItems((prev) => {
      const next = prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0);
      saveCart(next);
      return next;
    });
  }

  function removeItem(id: string) {
    setItems((prev) => {
      const next = prev.filter((item) => item.id !== id);
      saveCart(next);
      return next;
    });
  }

  if (!loaded) {
    return <p className="py-16 text-center text-muted-foreground">در حال بارگذاری...</p>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle title="سبد خرید" subtitle="محصولات انتخابی شما" />

      {items.length === 0 ? (
        <Card>
          <CardContent className="text-center">
            <p className="text-muted-foreground">سبد خرید شما خالی است.</p>
            <LinkButton href="/store" className="mt-4">
              بازگشت به فروشگاه
            </LinkButton>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardContent className="overflow-x-auto p-0 sm:p-0">
              <table className="w-full min-w-[500px] text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="p-4 text-right font-medium">محصول</th>
                    <th className="p-4 text-right font-medium">قیمت</th>
                    <th className="p-4 text-right font-medium">تعداد</th>
                    <th className="p-4 text-right font-medium">جمع</th>
                    <th className="p-4 text-right font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-border">
                      <td className="p-4 font-medium">{item.name}</td>
                      <td className="p-4">{formatCurrency(item.price)}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                            −
                          </Button>
                          <span>{item.quantity}</span>
                          <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                            +
                          </Button>
                        </div>
                      </td>
                      <td className="p-4 text-primary">{formatCurrency(item.price * item.quantity)}</td>
                      <td className="p-4">
                        <Button size="sm" variant="ghost" onClick={() => removeItem(item.id)}>
                          حذف
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-lg font-semibold">
              جمع کل: <span className="text-primary">{formatCurrency(total)}</span>
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/store"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-border px-5 text-sm font-medium hover:bg-muted"
              >
                {common.back}
              </Link>
              <LinkButton href="/store/checkout">{common.continue}</LinkButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
