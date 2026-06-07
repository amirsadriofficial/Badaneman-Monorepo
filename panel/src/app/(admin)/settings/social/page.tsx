import { ContentFormPage } from "@/components/shared/content-form-page";

export default function SocialMediaPage() {
  return (
    <ContentFormPage
      title="شبکه‌های اجتماعی"
      description="مدیریت لینک‌های اینستاگرام، تلگرام، واتساپ و یوتیوب"
      fields={[
        { name: "instagram", label: "اینستاگرام", defaultValue: "https://instagram.com/badaneman" },
        { name: "telegram", label: "تلگرام", defaultValue: "https://t.me/badaneman" },
        { name: "whatsapp", label: "واتساپ", defaultValue: "https://wa.me/989121234567" },
        { name: "youtube", label: "یوتیوب", defaultValue: "https://youtube.com/@badaneman" },
      ]}
    />
  );
}
