import { jobs } from "@/lib/mock-data";
import { Badge, Card, CardContent, LinkButton, SectionTitle } from "@/components/ui/card";
import Link from "next/link";

export default function RecruitmentPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle
        title="فرصت‌های شغلی"
        subtitle="به تیم حرفه‌ای باشگاه بدن‌من بپیوندید"
      />

      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className="transition-colors hover:border-primary/50">
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <Badge className="mt-2 bg-primary/10 text-primary">{job.department}</Badge>
              </div>
              <Link
                href={`/recruitment/apply?position=${job.id}`}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                ارسال رزومه
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <LinkButton href="/recruitment/apply">فرم درخواست همکاری</LinkButton>
      </div>
    </div>
  );
}
