import type { NavItem } from "@/lib/types";

export const navigation: NavItem[] = [
  { title: "داشبورد", href: "/dashboard", icon: "LayoutDashboard" },
  {
    title: "محتوا",
    icon: "FileText",
    children: [
      { title: "صفحه اصلی", href: "/content/landing", icon: "Home" },
      { title: "وضعیت باشگاه", href: "/content/gym-status", icon: "Activity" },
      { title: "درباره ما", href: "/content/about", icon: "Info" },
      { title: "افتخارات", href: "/content/achievements", icon: "Trophy" },
    ],
  },
  { title: "مربیان", href: "/coaches", icon: "Users" },
  { title: "امکانات", href: "/facilities", icon: "Building2" },
  {
    title: "رسانه",
    icon: "Image",
    children: [
      { title: "گالری", href: "/media/gallery", icon: "Images" },
      { title: "ویدیوها", href: "/media/videos", icon: "Video" },
    ],
  },
  { title: "کاربران", href: "/users", icon: "UserCircle" },
  {
    title: "عضویت",
    icon: "CreditCard",
    children: [
      { title: "پلن‌ها", href: "/memberships/plans", icon: "Layers" },
      { title: "درخواست‌ها", href: "/memberships/requests", icon: "Inbox" },
    ],
  },
  {
    title: "رزرو",
    icon: "Calendar",
    children: [
      { title: "تقویم", href: "/reservations/calendar", icon: "CalendarDays" },
      { title: "درخواست‌ها", href: "/reservations/requests", icon: "Clock" },
      { title: "بازه‌های زمانی", href: "/reservations/time-slots", icon: "Timer" },
    ],
  },
  {
    title: "فروشگاه",
    icon: "ShoppingBag",
    children: [
      { title: "محصولات", href: "/store/products", icon: "Package" },
      { title: "دسته‌بندی‌ها", href: "/store/categories", icon: "Tags" },
      { title: "موجودی", href: "/store/inventory", icon: "Warehouse" },
    ],
  },
  { title: "سفارش‌ها", href: "/orders", icon: "ShoppingCart" },
  {
    title: "استخدام",
    icon: "Briefcase",
    children: [
      { title: "موقعیت‌ها", href: "/recruitment/positions", icon: "List" },
      { title: "درخواست‌ها", href: "/recruitment/applications", icon: "FileUser" },
    ],
  },
  {
    title: "وبلاگ",
    icon: "Newspaper",
    children: [
      { title: "مقالات", href: "/blog/articles", icon: "FileText" },
      { title: "دسته‌بندی‌ها", href: "/blog/categories", icon: "Folder" },
      { title: "برچسب‌ها", href: "/blog/tags", icon: "Hash" },
    ],
  },
  {
    title: "پیامک",
    icon: "MessageSquare",
    children: [
      { title: "قالب‌ها", href: "/sms/templates", icon: "Mail" },
      { title: "گزارش ارسال", href: "/sms/logs", icon: "ScrollText" },
    ],
  },
  { title: "اعلان‌ها", href: "/notifications", icon: "Bell" },
  {
    title: "تنظیمات",
    icon: "Settings",
    children: [
      { title: "عمومی", href: "/settings/general", icon: "Sliders" },
      { title: "ساعات کاری", href: "/settings/hours", icon: "Clock" },
      { title: "شبکه‌های اجتماعی", href: "/settings/social", icon: "Share2" },
      { title: "پرداخت", href: "/settings/payment", icon: "Banknote" },
      { title: "ارسال", href: "/settings/delivery", icon: "Truck" },
    ],
  },
  { title: "گزارش‌ها", href: "/analytics", icon: "BarChart3" },
  { title: "لاگ فعالیت", href: "/audit-logs", icon: "Shield" },
];
