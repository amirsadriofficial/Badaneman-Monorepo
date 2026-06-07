import { ContentFormPage } from "@/components/shared/content-form-page";

export default function AboutPageManagement() {
  return (
    <ContentFormPage
      title="صفحه درباره ما"
      description="مدیریت معرفی، تاریخچه، مأموریت و چشم‌انداز"
      fields={[
        { name: "intro", label: "معرفی", type: "textarea", defaultValue: "به باشگاه ورزشی ممتاز ما خوش آمدید..." },
        { name: "history", label: "تاریخچه", type: "textarea", defaultValue: "تأسیس شده در سال ۱۳۸۹، ما به یکی از برترین مراکز ورزشی منطقه تبدیل شده‌ایم..." },
        { name: "mission", label: "مأموریت", type: "textarea", defaultValue: "توانمندسازی هر عضو برای دستیابی به اهداف ورزشی خود." },
        { name: "vision", label: "چشم‌انداز", type: "textarea", defaultValue: "تبدیل شدن به برترین مقصد ورزشی در منطقه." },
      ]}
    />
  );
}
