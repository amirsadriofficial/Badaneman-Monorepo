import { products } from "@/lib/mock-data";
import { Badge, Card, CardContent, LinkButton } from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { common } from "@/lib/locale/fa";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "./add-to-cart-button";

const productDetails: Record<string, { description: string; specs: string[]; variants: string }> = {
  "whey-protein": {
    description: "پروتئین وی با کیفیت بالا، مناسب ریکاوری بعد از تمرین. هر اسکوپ ۲۵ گرم پروتئین.",
    specs: ["وزن: ۲ کیلوگرم", "طعم: شکلاتی", "برند: بدن‌من"],
    variants: "طعم‌ها: شکلاتی، وانیلی، توت‌فرنگی | اندازه: ۱kg، ۲kg",
  },
  creatine: {
    description: "کراتین مونوهیدرات خالص برای افزایش قدرت و حجم عضلانی.",
    specs: ["وزن: ۳۰۰ گرم", "نوع: مونوهیدرات", "برند: بدن‌من"],
    variants: "اندازه: ۳۰۰g، ۵۰۰g",
  },
  "gym-gloves": {
    description: "دستکش بدنسازی با پد محافظ کف دست، مناسب تمرینات سنگین.",
    specs: ["جنس: چرم مصنوعی", "قابل شستشو"],
    variants: "سایز: S، M، L، XL",
  },
  shaker: {
    description: "شیکر پروتئین با درب ضدنشت و توری مخلوط‌کن داخلی.",
    specs: ["حجم: ۷۰۰ میلی‌لیتر", "BPA Free"],
    variants: "رنگ: مشکی، آبی، قرمز",
  },
};

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const detail = productDetails[slug] ?? {
    description: "محصول با کیفیت باشگاه بدن‌من.",
    specs: [],
    variants: "بدون تنوع",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/store" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← بازگشت به فروشگاه
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex aspect-square items-center justify-center rounded-2xl border border-border bg-muted text-6xl text-muted-foreground">
          🛍️
        </div>

        <div>
          <Badge className="bg-muted text-muted-foreground">{product.category}</Badge>
          <h1 className="mt-3 text-3xl font-bold">{product.name}</h1>
          <p className="mt-4 text-2xl font-bold text-primary">{formatCurrency(product.price)}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            موجودی: {formatNumber(product.stock)} عدد
          </p>
          <p className="mt-4 text-muted-foreground">{detail.description}</p>

          {detail.specs.length > 0 && (
            <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
              {detail.specs.map((spec) => (
                <li key={spec}>• {spec}</li>
              ))}
            </ul>
          )}

          <Card className="mt-6">
            <CardContent>
              <h3 className="font-semibold">تنوع محصول</h3>
              <p className="mt-2 text-sm text-muted-foreground">{detail.variants}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                موجودی به ازای هر تنوع جداگانه مدیریت می‌شود.
              </p>
            </CardContent>
          </Card>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <AddToCartButton productId={product.id} label={common.addToCart} />
            <LinkButton href="/store/cart" variant="outline">
              مشاهده سبد خرید
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
