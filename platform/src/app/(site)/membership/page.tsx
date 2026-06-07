import { membershipPlans } from "@/lib/mock-data";
import { Card, CardContent, LinkButton, SectionTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export default function MembershipPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle
        title="پلن‌های عضویت"
        subtitle="پلن مناسب خود را انتخاب کنید و درخواست عضویت ثبت کنید"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {membershipPlans.map((plan) => (
          <Card key={plan.id} className={plan.featured ? "border-primary ring-1 ring-primary" : ""}>
            <CardContent>
              {plan.discount && (
                <span className="mb-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  {plan.discount}
                </span>
              )}
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-2 text-2xl font-bold text-primary">{formatCurrency(plan.price)}</p>
              <p className="text-sm text-muted-foreground">{plan.duration}</p>
              <Link
                href={`/membership/request?plan=${plan.id}`}
                className="mt-4 block w-full rounded-xl bg-primary py-2.5 text-center text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                درخواست این پلن
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <LinkButton href="/membership/request">ثبت درخواست عضویت</LinkButton>
      </div>
    </div>
  );
}
