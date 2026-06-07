import { blogPosts, faqs } from "@/lib/mock-data";
import { Badge, Card, CardContent, LinkButton } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const articleContent: Record<string, { body: string[]; seo: { title: string; description: string; canonical: string; ogImage: string }; articleFaqs: { q: string; a: string }[] }> = {
  "beginner-tips": {
    body: [
      "شروع بدنسازی می‌تواند هیجان‌انگیز و در عین حال چالش‌برانگیز باشد. مهم‌ترین نکته این است که با برنامه‌ای منظم و تدریجی شروع کنید.",
      "۱. با وزنه‌های سبک شروع کنید و فرم صحیح را یاد بگیرید. ۲. حتماً گرم‌کردن و سردکردن را فراموش نکنید. ۳. استراحت کافی بین جلسات تمرین داشته باشید.",
      "۴. تغذیه متعادل و پروتئین کافی مصرف کنید. ۵. خواب منظم برای ریکاوری ضروری است. ۶. از مقایسه خود با دیگران بپرهیزید.",
      "۷. با مربی مشورت کنید و برنامه شخصی‌سازی شده بگیرید. ۸. ثبات مهم‌تر از شدت تمرین است. ۹. آب کافی بنوشید. ۱۰. پیشرفت را ثبت کنید.",
    ],
    seo: {
      title: "۱۰ نکته طلایی برای شروع بدنسازی | بدن‌من",
      description: "راهنمای کامل مبتدیان بدنسازی — نکات تمرین، تغذیه و ریکاوری برای شروعی موفق.",
      canonical: "https://badaneman.com/blog/beginner-tips",
      ogImage: "/og/beginner-tips.jpg",
    },
    articleFaqs: [
      { q: "چند روز در هفته تمرین کنم؟", a: "برای مبتدیان ۳ تا ۴ روز در هفته کافی است." },
      { q: "آیا نیاز به مکمل دارم؟", a: "در ابتدا تغذیه متعادل مهم‌تر است. مکمل‌ها بعداً قابل بررسی هستند." },
    ],
  },
  "nutrition-guide": {
    body: [
      "تغذیه نقش کلیدی در نتیجه تمرینات دارد. قبل از تمرین کربوهیدرات سبک و پروتئین کم مصرف کنید.",
      "بعد از تمرین ترکیب پروتئین و کربوهیدرات به ریکاوری عضلانی کمک می‌کند. اسموتی پروتئین یا وعده غذایی متعادل ایده‌آل است.",
      "آب کافی در طول روز و حین تمرین فراموش نشود. از رژیم‌های شدید و غیرعلمی پرهیز کنید.",
    ],
    seo: {
      title: "راهنمای تغذیه ورزشی | بدن‌من",
      description: "چه بخوریم قبل و بعد تمرین؟ راهنمای عملی تغذیه برای ورزشکاران.",
      canonical: "https://badaneman.com/blog/nutrition-guide",
      ogImage: "/og/nutrition-guide.jpg",
    },
    articleFaqs: [
      { q: "چه زمانی بعد تمرین غذا بخورم؟", a: "تا ۱ ساعت بعد تمرین بهترین زمان جذب مواد مغذی است." },
    ],
  },
  recovery: {
    body: [
      "ریکاوری بخشی جدایی‌ناپذیر از پیشرفت است. عضلات در زمان استراحت رشد می‌کنند، نه حین تمرین.",
      "خواب ۷ تا ۹ ساعته، ماساژ، کشش و استراحت فعال به بهبود ریکاوری کمک می‌کند.",
      "Overtraining می‌تواند منجر به آسیب و توقف پیشرفت شود. به سیگنال‌های بدن گوش دهید.",
    ],
    seo: {
      title: "اهمیت ریکاوری در بدنسازی | بدن‌من",
      description: "چرا استراحت مهم‌تر از تمرین است — راهنمای ریکاوری برای ورزشکاران.",
      canonical: "https://badaneman.com/blog/recovery",
      ogImage: "/og/recovery.jpg",
    },
    articleFaqs: [
      { q: "آیا روز استراحت لازم است؟", a: "بله، حداقل ۱ تا ۲ روز استراحت در هفته توصیه می‌شود." },
    ],
  },
};

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = articleContent[slug];
  if (!content) return {};
  return {
    title: content.seo.title,
    description: content.seo.description,
    alternates: { canonical: content.seo.canonical },
    openGraph: { images: [content.seo.ogImage] },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const content = articleContent[slug];
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/blog" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← بازگشت به وبلاگ
      </Link>

      <Badge className="bg-primary/10 text-primary">{post.category}</Badge>
      <h1 className="mt-3 text-3xl font-bold">{post.title}</h1>
      <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
        <span>{post.author}</span>
        <span>{formatDate(post.date)}</span>
      </div>

      <div className="my-8 flex aspect-video items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        تصویر شاخص
      </div>

      {content ? (
        <article className="prose prose-invert max-w-none space-y-4">
          {content.body.map((paragraph) => (
            <p key={paragraph.slice(0, 20)} className="leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </article>
      ) : (
        <p className="text-muted-foreground">{post.excerpt}</p>
      )}

      {content && (
        <Card className="mt-10">
          <CardContent>
            <h2 className="mb-4 font-semibold">اطلاعات سئو</h2>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-muted-foreground">عنوان سئو</dt>
                <dd>{content.seo.title}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">توضیحات متا</dt>
                <dd>{content.seo.description}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">آدرس کانونیکال</dt>
                <dd dir="ltr" className="text-left">{content.seo.canonical}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">تصویر Open Graph</dt>
                <dd dir="ltr" className="text-left">{content.seo.ogImage}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      )}

      {(content?.articleFaqs ?? faqs.slice(0, 2)).length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold">سوالات متداول</h2>
          <div className="space-y-3">
            {(content?.articleFaqs ?? faqs.slice(0, 2).map((f) => ({ q: f.q, a: f.a }))).map((faq) => (
              <details key={faq.q} className="rounded-xl border border-border bg-card">
                <summary className="cursor-pointer p-4 font-medium">{faq.q}</summary>
                <p className="border-t border-border p-4 text-sm text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold">مقالات مرتبط</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Card key={r.id}>
                <CardContent>
                  <Badge className="bg-muted text-muted-foreground">{r.category}</Badge>
                  <h3 className="mt-2 font-medium">{r.title}</h3>
                  <Link href={`/blog/${r.slug}`} className="mt-2 block text-sm text-primary hover:underline">
                    مطالعه مقاله
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      <div className="mt-10 text-center">
        <LinkButton href="/consultation">درخواست مشاوره رایگان</LinkButton>
      </div>
    </div>
  );
}
