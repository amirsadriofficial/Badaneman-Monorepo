import type {
  AdminUser,
  ApplicationStatus,
  DashboardStats,
  MembershipRequest,
  MembershipStatus,
  NotificationItem,
  Order,
  OrderStatus,
  RecruitmentApplication,
  ReservationRequest,
  ReservationStatus,
} from "@/lib/types";

export const mockAdmin: AdminUser = {
  id: "1",
  username: "admin",
  fullName: "امیر صدری",
  role: "super_admin",
  email: "admin@gym.com",
};

export const dashboardStats: DashboardStats = {
  totalUsers: 1248,
  activeMemberships: 342,
  monthlyReservations: 186,
  storeSales: 24500000,
  blogViews: 8420,
  pendingMemberships: 12,
  pendingReservations: 8,
  pendingOrders: 5,
  newApplications: 3,
};

export const membershipRequests: MembershipRequest[] = [
  { id: "MR-001", user: "سارا احمدی", plan: "طلایی ۳ ماهه", status: "pending_review", submittedAt: "2026-06-07T10:30:00" },
  { id: "MR-002", user: "علی رضایی", plan: "نقره‌ای ۱ ماهه", status: "approved", submittedAt: "2026-06-06T14:15:00" },
  { id: "MR-003", user: "مریم کریمی", plan: "پلاتینیوم ۶ ماهه", status: "activated", submittedAt: "2026-06-05T09:00:00" },
  { id: "MR-004", user: "حسین محمدی", plan: "طلایی ۳ ماهه", status: "rejected", submittedAt: "2026-06-04T16:45:00" },
];

export const reservationRequests: ReservationRequest[] = [
  { id: "RS-101", user: "ندا حسینی", service: "ماساژ", date: "2026-06-08", time: "10:00", status: "pending" },
  { id: "RS-102", user: "رضا تهرانی", service: "سولاریوم", date: "2026-06-08", time: "14:30", status: "confirmed" },
  { id: "RS-103", user: "فاطمه کاظمی", service: "ماساژ", date: "2026-06-09", time: "11:00", status: "completed" },
];

export const orders: Order[] = [
  { id: "ORD-501", customer: "کریم باقری", total: 890000, deliveryType: "pickup", status: "pending_review", createdAt: "2026-06-07T08:00:00" },
  { id: "ORD-502", customer: "لیلا صادقی", total: 1450000, deliveryType: "delivery", status: "preparing", createdAt: "2026-06-06T19:30:00" },
  { id: "ORD-503", customer: "امید رحیمی", total: 520000, deliveryType: "pickup", status: "completed", createdAt: "2026-06-05T12:00:00" },
];

export const applications: RecruitmentApplication[] = [
  { id: "APP-01", applicant: "محسن ابراهیمی", phone: "09121234567", position: "مربی", status: "new", submittedAt: "2026-06-07T07:00:00" },
  { id: "APP-02", applicant: "زهرا موسوی", phone: "09129876543", position: "ماساژور", status: "under_review", submittedAt: "2026-06-06T11:00:00" },
  { id: "APP-03", applicant: "پویا کریمی", phone: "09131112233", position: "خدمات", status: "interview", submittedAt: "2026-06-04T15:00:00" },
];

export const notifications: NotificationItem[] = [
  { id: "n1", type: "membership", title: "درخواست عضویت جدید", message: "سارا احمدی پلن طلایی ۳ ماهه ثبت کرد", createdAt: "2026-06-07T10:30:00", read: false },
  { id: "n2", type: "reservation", title: "رزرو جدید", message: "ندا حسینی ماساژ ۸ خرداد رزرو کرد", createdAt: "2026-06-07T09:15:00", read: false },
  { id: "n3", type: "order", title: "سفارش جدید", message: "سفارش ORD-501 در انتظار بررسی", createdAt: "2026-06-07T08:00:00", read: true },
  { id: "n4", type: "recruitment", title: "درخواست استخدام", message: "محسن ابراهیمی برای موقعیت مربی درخواست داد", createdAt: "2026-06-07T07:00:00", read: false },
];

export const recentUsers = [
  { name: "سارا احمدی", mobile: "09121111111", gender: "زن", registeredAt: "۱۴۰۵/۰۳/۱۷" },
  { name: "علی رضایی", mobile: "09122222222", gender: "مرد", registeredAt: "۱۴۰۵/۰۳/۱۶" },
  { name: "مریم کریمی", mobile: "09123333333", gender: "زن", registeredAt: "۱۴۰۵/۰۳/۱۵" },
];

export const coaches = [
  { id: "1", name: "مربی احمد", position: "مربی ارشد", experience: "۱۲ سال", active: true },
  { id: "2", name: "مربی نیلوفر", position: "کراس‌فیت", experience: "۸ سال", active: true },
  { id: "3", name: "مربی بهنام", position: "بدنسازی", experience: "۶ سال", active: false },
];

export const facilities = [
  { id: "1", title: "سالن بدنسازی", sortOrder: 1, hasVideo: true },
  { id: "2", title: "زون کراس‌فیت", sortOrder: 2, hasVideo: false },
  { id: "3", title: "سولاریوم", sortOrder: 3, hasVideo: true },
  { id: "4", title: "اتاق ماساژ", sortOrder: 4, hasVideo: false },
  { id: "5", title: "کافه", sortOrder: 5, hasVideo: false },
];

export const membershipPlans = [
  { id: "1", name: "نقره‌ای ۱ ماهه", price: 490000, duration: "۱ ماه", promotional: false },
  { id: "2", name: "طلایی ۳ ماهه", price: 1290000, duration: "۳ ماه", promotional: true },
  { id: "3", name: "پلاتینیوم ۶ ماهه", price: 2190000, duration: "۶ ماه", promotional: false },
];

export const products = [
  { id: "1", name: "پروتئین شیک", category: "مکمل", sku: "SUP-001", stock: 45, lowStock: false },
  { id: "2", name: "حوله باشگاه", category: "لوازم", sku: "ACC-012", stock: 8, lowStock: true },
  { id: "3", name: "دستکش تمرین", category: "لوازم", sku: "ACC-003", stock: 0, lowStock: true },
];

export const blogArticles = [
  { id: "1", title: "۱۰ نکته برای مبتدیان", category: "تمرین", author: "مربی احمد", views: 1240, published: true },
  { id: "2", title: "راهنمای تغذیه ۱۴۰۵", category: "تغذیه", author: "مربی نیلوفر", views: 890, published: true },
  { id: "3", title: "تکنیک‌های ریکاوری", category: "سلامت", author: "مدیر", views: 0, published: false },
];

export const smsTemplates = [
  { id: "1", name: "کد OTP ثبت‌نام", category: "ثبت‌نام", active: true },
  { id: "2", name: "تأیید عضویت", category: "عضویت", active: true },
  { id: "3", name: "تأیید رزرو", category: "رزرو", active: true },
  { id: "4", name: "آماده تحویل سفارش", category: "سفارش", active: true },
];

export const auditLogs = [
  { id: "1", admin: "امیر صدری", action: "تأیید عضویت MR-002", timestamp: "2026-06-06T14:20:00" },
  { id: "2", admin: "امیر صدری", action: "به‌روزرسانی بخش قهرمان صفحه اصلی", timestamp: "2026-06-06T10:00:00" },
  { id: "3", admin: "مدیر عملیات", action: "تکمیل سفارش ORD-503", timestamp: "2026-06-05T16:30:00" },
];

export type StatusType =
  | MembershipStatus
  | ReservationStatus
  | OrderStatus
  | ApplicationStatus;
