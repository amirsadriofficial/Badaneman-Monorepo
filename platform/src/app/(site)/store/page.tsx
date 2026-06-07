"use client";

import { useMemo, useState } from "react";
import { products } from "@/lib/mock-data";
import { Card, CardContent, LinkButton, SectionTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { common } from "@/lib/locale/fa";
import Link from "next/link";

export default function StorePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("همه");

  const categories = useMemo(() => ["همه", ...new Set(products.map((p) => p.category))], []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.includes(search) || p.category.includes(search);
      const matchesCategory = category === "همه" || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle title="فروشگاه" subtitle="مکمل‌ها و لوازم ورزشی" />

      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <Input
          placeholder={common.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-11 rounded-xl border border-border bg-card px-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground">{common.empty}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => (
            <Card key={product.id} className="transition-colors hover:border-primary/50">
              <div className="flex aspect-square items-center justify-center bg-muted text-muted-foreground">
                🛍️
              </div>
              <CardContent>
                <span className="text-xs text-muted-foreground">{product.category}</span>
                <h3 className="mt-1 font-semibold">{product.name}</h3>
                <p className="mt-2 text-lg font-bold text-primary">{formatCurrency(product.price)}</p>
                <Link
                  href={`/store/${product.slug}`}
                  className="mt-3 block text-center text-sm text-primary hover:underline"
                >
                  مشاهده محصول
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <LinkButton href="/store/cart">مشاهده سبد خرید</LinkButton>
      </div>
    </div>
  );
}
