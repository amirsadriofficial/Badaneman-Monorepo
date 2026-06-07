import { ContentFormPage } from "@/components/shared/content-form-page";

export default function DeliverySettingsPage() {
  return (
    <ContentFormPage
      title="تنظیمات تحویل"
      description="مدیریت هزینه پیک و دستورالعمل تحویل حضوری"
      fields={[
        { name: "courierFee", label: "هزینه پیک", defaultValue: "۵" },
        { name: "pickupInstructions", label: "دستورالعمل تحویل حضوری", type: "textarea", defaultValue: "سفارش خود را در ساعات کاری از پذیرش تحویل بگیرید." },
        { name: "deliveryInstructions", label: "دستورالعمل ارسال", type: "textarea", defaultValue: "ارسال در محدوده تهران، ۱ تا ۲ روز کاری." },
      ]}
    />
  );
}
