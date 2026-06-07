import { ContentFormPage } from "@/components/shared/content-form-page";

export default function LandingPageManagement() {
  return (
    <ContentFormPage
      title="صفحه اصلی"
      description="مدیریت بخش قهرمان، تیترها، دکمه‌های فراخوان و محتوای ویژه"
      fields={[
        { name: "headline", label: "تیتر اصلی", defaultValue: "بدنت را متحول کن، زندگیت را متحول کن" },
        { name: "subheadline", label: "زیرتیتر", defaultValue: "تجربه ورزشی ممتاز با مربیان حرفه‌ای" },
        { name: "ctaPrimary", label: "دکمه اصلی", defaultValue: "همین حالا عضو شو" },
        { name: "ctaSecondary", label: "دکمه فرعی", defaultValue: "مشاهده امکانات" },
        { name: "featured", label: "محتوای ویژه", type: "textarea", defaultValue: "برنامه جدید کراس‌فیت از این ماه شروع می‌شود!" },
      ]}
    />
  );
}
