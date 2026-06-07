import {
  about,
  achievements,
  coaches,
  contact,
  facilities,
  gallery,
  gymStatus,
  hero,
  membershipPlans,
} from "@/lib/mock-data";
import { Card, CardContent, LinkButton, SectionTitle, StatusBadge } from "@/components/ui/card";
import { Dumbbell, Flame, Sun, Sparkles, Coffee, MapPin, Phone, Clock } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const facilityIcons: Record<string, React.ReactNode> = {
  Dumbbell: <Dumbbell className="h-8 w-8 text-primary" />,
  Flame: <Flame className="h-8 w-8 text-primary" />,
  Sun: <Sun className="h-8 w-8 text-primary" />,
  Sparkles: <Sparkles className="h-8 w-8 text-primary" />,
  Coffee: <Coffee className="h-8 w-8 text-primary" />,
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <div className="mb-6 flex justify-center sm:justify-start">
            <StatusBadge status={gymStatus} />
          </div>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {hero.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">{hero.subheadline}</p>
          <div className="mt-4 inline-block rounded-xl bg-primary/10 px-4 py-2 text-sm text-primary">
            {hero.promo}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/membership">{hero.ctaPrimary}</LinkButton>
            <LinkButton href="#facilities" variant="outline">{hero.ctaSecondary}</LinkButton>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionTitle title={about.title} subtitle="آشنایی با باشگاه بدن‌من" />
        <p className="mx-auto max-w-3xl text-center text-muted-foreground">{about.description}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {about.benefits.map((b) => (
            <Card key={b}><CardContent className="text-center text-sm">{b}</CardContent></Card>
          ))}
        </div>
      </section>

      {/* Facilities */}
      <section id="facilities" className="border-y border-border bg-card/50 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="امکانات باشگاه" subtitle="فضاهای مجهز برای هر نوع تمرین" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f) => (
              <Card key={f.id} className="transition-colors hover:border-primary/50">
                <CardContent>
                  <div className="mb-4">{facilityIcons[f.icon]}</div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionTitle title="افتخارات" subtitle="دستاوردهای باشگاه بدن‌من" />
        <div className="grid gap-4 sm:grid-cols-3">
          {achievements.map((a) => (
            <Card key={a.id} className="border-primary/20">
              <CardContent className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">🏆</div>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Coaches */}
      <section id="coaches" className="border-y border-border bg-card/50 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="مربیان ما" subtitle="تیم حرفه‌ای همراه شما" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coaches.map((c) => (
              <Card key={c.id}>
                <CardContent>
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted text-2xl">👤</div>
                  <h3 className="font-semibold">{c.name}</h3>
                  <p className="text-sm text-primary">{c.specialty}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{c.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Membership preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionTitle title="پلن‌های عضویت" subtitle="پلن مناسب خود را انتخاب کنید" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {membershipPlans.map((p) => (
            <Card key={p.id} className={p.featured ? "border-primary ring-1 ring-primary" : ""}>
              <CardContent>
                {p.discount && <span className="mb-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{p.discount}</span>}
                <h3 className="font-semibold">{p.name}</h3>
                <p className="mt-1 text-2xl font-bold text-primary">{formatCurrency(p.price)}</p>
                <p className="text-sm text-muted-foreground">{p.duration}</p>
                <Link href="/membership" className="mt-4 block text-center text-sm text-primary hover:underline">انتخاب پلن</Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Gallery preview */}
      <section className="border-y border-border bg-card/50 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="گالری تصاویر" subtitle="نگاهی به فضای باشگاه" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.map((g) => (
              <div key={g.id} className="flex aspect-square items-center justify-center rounded-2xl bg-muted text-sm text-muted-foreground">
                {g.title}
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <LinkButton href="/tour/gallery">مشاهده گالری</LinkButton>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionTitle title="موقعیت و تماس" />
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="space-y-4">
              <div className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-primary" /><span>{contact.address}</span></div>
              <div className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-primary" /><span dir="ltr">{contact.phone}</span></div>
              <div className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-primary" /><span>{contact.hours}</span></div>
            </CardContent>
          </Card>
          <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-border bg-muted text-muted-foreground">
            نقشه Google Maps
          </div>
        </div>
      </section>
    </>
  );
}
