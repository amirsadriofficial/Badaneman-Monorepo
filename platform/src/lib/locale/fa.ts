export const statusLabels: Record<string, string> = {
  open: "باز",
  closed: "بسته",
  holiday: "تعطیل",
  maintenance: "تعمیرات",
  pending_review: "در انتظار بررسی",
  pending: "در انتظار",
  approved: "تأیید شده",
  confirmed: "تأیید شده",
  activated: "فعال",
  completed: "تکمیل شده",
  rejected: "رد شده",
  preparing: "در حال آماده‌سازی",
  ready_for_pickup: "آماده تحویل",
  shipped: "ارسال شده",
  new: "جدید",
  under_review: "در حال بررسی",
  interview: "مصاحبه",
  hired: "استخدام شده",
};

export function statusLabel(status: string) {
  return statusLabels[status] ?? status;
}

export const common = {
  login: "ورود",
  logout: "خروج",
  dashboard: "پنل کاربری",
  submit: "ارسال",
  save: "ذخیره",
  cancel: "انصراف",
  continue: "ادامه",
  back: "بازگشت",
  search: "جستجو...",
  viewAll: "مشاهده همه",
  addToCart: "افزودن به سبد",
  readMore: "ادامه مطلب",
  empty: "موردی یافت نشد.",
};
