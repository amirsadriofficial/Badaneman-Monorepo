import { ContentFormPage } from "@/components/shared/content-form-page";

export default function GeneralSettingsPage() {
  return (
    <ContentFormPage
      title="تنظیمات عمومی"
      description="مدیریت نام باشگاه، لوگو، اطلاعات تماس و آدرس"
      fields={[
        { name: "gymName", label: "نام باشگاه", defaultValue: "بادانمان فیتنس" },
        { name: "phone", label: "شماره تلفن", defaultValue: "۰۲۱-۱۲۳۴۵۶۷۸" },
        { name: "email", label: "ایمیل", defaultValue: "info@badaneman.com" },
        { name: "address", label: "آدرس", type: "textarea", defaultValue: "تهران، خیابان ولیعصر" },
      ]}
    />
  );
}
