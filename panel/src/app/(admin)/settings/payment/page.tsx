import { ContentFormPage } from "@/components/shared/content-form-page";

export default function PaymentSettingsPage() {
  return (
    <ContentFormPage
      title="اطلاعات پرداخت"
      description="مدیریت اطلاعات حساب بانکی و دستورالعمل پرداخت کارت به کارت"
      fields={[
        { name: "bankName", label: "نام بانک", defaultValue: "بانک ملی" },
        { name: "accountNumber", label: "شماره حساب", defaultValue: "۱۲۳۴۵۶۷۸۹۰" },
        { name: "cardNumber", label: "شماره کارت", defaultValue: "۶۰۳۷-۹۹۷۱-XXXX-XXXX" },
        { name: "instructions", label: "دستورالعمل پرداخت", type: "textarea", defaultValue: "لطفاً مبلغ دقیق را واریز کرده و رسید خود را آپلود کنید." },
      ]}
    />
  );
}
