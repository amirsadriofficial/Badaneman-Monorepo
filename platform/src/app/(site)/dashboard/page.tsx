import { mockUser } from "@/lib/mock-data";
import { Card, CardContent, SectionTitle } from "@/components/ui/card";
import Link from "next/link";
import { User, CreditCard, Calendar, ShoppingBag } from "lucide-react";

const links = [
  { href: "/dashboard/profile", title: "پروفایل", description: "مشاهده و ویرایش اطلاعات شخصی", icon: User },
  { href: "/dashboard/memberships", title: "عضویت‌ها", description: "تاریخچه درخواست‌های عضویت", icon: CreditCard },
  { href: "/dashboard/reservations", title: "رزروها", description: "رزرو ماساژ و سولاریوم", icon: Calendar },
  { href: "/dashboard/orders", title: "سفارش‌ها", description: "تاریخچه سفارشات فروشگاه", icon: ShoppingBag },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle title="پنل کاربری" subtitle={`خوش آمدید، ${mockUser.name}`} />

      <div className="grid gap-4 sm:grid-cols-2">
        {links.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="h-full transition-colors hover:border-primary/50">
              <CardContent className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
