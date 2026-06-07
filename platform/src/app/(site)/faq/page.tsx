import { faqs } from "@/lib/mock-data";
import { SectionTitle } from "@/components/ui/card";

const categoryLabels: Record<string, string> = {
  membership: "عضویت",
  reservation: "رزرو",
  store: "فروشگاه",
  general: "عمومی",
};

export default function FaqPage() {
  const grouped = faqs.reduce<Record<string, typeof faqs>>((acc, faq) => {
    const key = faq.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(faq);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle title="سوالات متداول" subtitle="پاسخ سوالات رایج درباره عضویت، رزرو و فروشگاه" />

      <div className="space-y-8">
        {Object.entries(grouped).map(([category, items]) => (
          <section key={category}>
            <h2 className="mb-4 text-lg font-semibold text-primary">
              {categoryLabels[category] ?? category}
            </h2>
            <div className="space-y-3">
              {items.map((faq) => (
                <details key={faq.q} className="rounded-xl border border-border bg-card">
                  <summary className="cursor-pointer p-4 font-medium">{faq.q}</summary>
                  <p className="border-t border-border p-4 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
