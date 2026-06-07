import type { GymStatus } from "@/lib/types";

export const gymStatus: GymStatus = "open";

export const hero = {
  headline: "بدنت را متحول کن، زندگیت را تغییر بده",
  subheadline: "تجربه‌ای حرفه‌ای از بدنسازی با مربیان مجرب، امکانات مدرن و برنامه‌های اختصاصی",
  ctaPrimary: "درخواست عضویت",
  ctaSecondary: "مشاهده امکانات",
  promo: "برنامه جدید کراس‌فیت — ثبت‌نام از این هفته",
};

export const about = {
  title: "باشگاه بدن‌من",
  description:
    "باشگاه بدن‌من با بیش از ۱۵ سال سابقه، یکی از معتبرترین مراکز فیتنس تهران است. ما با تجهیزات مدرن، مربیان حرفه‌ای و فضایی انگیزه‌بخش، همراه شما در مسیر سلامتی و تناسب اندام هستیم.",
  benefits: ["مربیان دارای مدرک بین‌المللی", "برنامه تمرینی شخصی‌سازی شده", "کلاس‌های گروهی متنوع", "فروشگاه مکمل و لوازم ورزشی"],
};

export const facilities = [
  { id: "1", title: "سالن بدنسازی", description: "تجهیزات کامل بدنسازی و وزنه‌برداری", icon: "Dumbbell" },
  { id: "2", title: "کراس‌فیت", description: "فضای اختصاصی با تجهیزات functional training", icon: "Flame" },
  { id: "3", title: "سولاریوم", description: "دستگاه مدرن سولاریوم با استاندارد اروپایی", icon: "Sun" },
  { id: "4", title: "ماساژ", description: "اتاق ماساژ حرفه‌ای با ماساژور مجرب", icon: "Sparkles" },
  { id: "5", title: "کافه", description: "نوشیدنی‌های سالم و اسموتی پروتئینی", icon: "Coffee" },
];

export const achievements = [
  { id: "1", title: "بهترین باشگاه ۱۴۰۴", description: "جایزه باشگاه برتر تهران" },
  { id: "2", title: "گواهینامه ISO", description: "استاندارد مدیریت کیفیت" },
  { id: "3", title: "قهرمان کراس‌فیت", description: "رتبه اول مسابقات منطقه‌ای" },
];

export const coaches = [
  { id: "1", name: "احمد رضایی", specialty: "مربی ارشد بدنسازی", bio: "۱۲ سال سابقه مربیگری و قهرمان بدنسازی کشور" },
  { id: "2", name: "نیلوفر کریمی", specialty: "مربی کراس‌فیت", bio: "مدرک Level 2 CrossFit و ۸ سال تجربه" },
  { id: "3", name: "بهنام موسوی", specialty: "مربی بدنسازی", bio: "متخصص hypertrophy و تغذیه ورزشی" },
];

export const contact = {
  address: "تهران، خیابان ولیعصر، بالاتر از پارک ساعی",
  phone: "۰۲۱-۱۲۳۴۵۶۷۸",
  hours: "شنبه تا پنج‌شنبه: ۶ صبح تا ۱۰ شب | جمعه: ۸ صبح تا ۸ شب",
  email: "info@badaneman.com",
};

export const membershipPlans = [
  { id: "1", name: "ماهانه", price: 890000, duration: "۱ ماه", featured: false, discount: null },
  { id: "2", name: "سه‌ماهه", price: 2290000, duration: "۳ ماه", featured: true, discount: "۱۵٪ تخفیف" },
  { id: "3", name: "شش‌ماهه", price: 3990000, duration: "۶ ماه", featured: false, discount: null },
  { id: "4", name: "سالانه", price: 6990000, duration: "۱۲ ماه", featured: false, discount: "بهترین قیمت" },
];

export const products = [
  { id: "1", name: "پروتئین وی", slug: "whey-protein", price: 1890000, category: "مکمل", image: null, stock: 20 },
  { id: "2", name: "کراتین مونوهیدرات", slug: "creatine", price: 690000, category: "مکمل", image: null, stock: 35 },
  { id: "3", name: "دستکش بدنسازی", slug: "gym-gloves", price: 350000, category: "لوازم", image: null, stock: 50 },
  { id: "4", name: "شیکر پروتئین", slug: "shaker", price: 180000, category: "لوازم", image: null, stock: 100 },
];

export const blogPosts = [
  { id: "1", title: "۱۰ نکته برای شروع بدنسازی", slug: "beginner-tips", category: "تمرین", excerpt: "راهنمای کامل برای تازه‌کارها", author: "احمد رضایی", date: "2026-06-01", image: null },
  { id: "2", title: "راهنمای تغذیه ورزشی", slug: "nutrition-guide", category: "تغذیه", excerpt: "چه بخوریم قبل و بعد تمرین؟", author: "نیلوفر کریمی", date: "2026-05-28", image: null },
  { id: "3", title: "اهمیت ریکاوری در بدنسازی", slug: "recovery", category: "سلامت", excerpt: "چرا استراحت مهم‌تر از تمرین است", author: "بهنام موسوی", date: "2026-05-20", image: null },
];

export const jobs = [
  { id: "1", title: "مربی بدنسازی", department: "تمرین" },
  { id: "2", title: "ماساژور", department: "خدمات" },
  { id: "3", title: "اپراتور سولاریوم", department: "خدمات" },
  { id: "4", title: "خدمات", department: "عملیات" },
];

export const faqs = [
  { q: "چگونه عضویت کنم؟", a: "پلن مورد نظر را انتخاب کنید، مبلغ را واریز کرده و رسید را آپلود کنید. پس از تأیید، عضویت شما فعال می‌شود.", category: "membership" },
  { q: "آیا امکان رزرو ماساژ آنلاین وجود دارد؟", a: "بله، از بخش رزرو می‌توانید تاریخ و ساعت مناسب را انتخاب کنید.", category: "reservation" },
  { q: "هزینه ارسال محصولات چقدر است؟", a: "هزینه ارسال بسته به منطقه متغیر است و در checkout نمایش داده می‌شود.", category: "store" },
  { q: "ساعات کاری باشگاه چیست؟", a: "شنبه تا پنج‌شنبه ۶ صبح تا ۱۰ شب، جمعه ۸ صبح تا ۸ شب.", category: "general" },
];

export const gallery = [
  { id: "1", title: "سالن اصلی", category: "فضا" },
  { id: "2", title: "زون کراس‌فیت", category: "فضا" },
  { id: "3", title: "اتاق ماساژ", category: "خدمات" },
  { id: "4", title: "کافه", category: "فضا" },
];

export const videos = [
  { id: "1", title: "تور باشگاه", source: "youtube", description: "آشنایی با فضای باشگاه" },
  { id: "2", title: "معرفی مربیان", source: "aparat", description: "با تیم مربیان ما آشنا شوید" },
];

export const mockUser = {
  name: "کاربر مهمان",
  mobile: "",
  gender: "",
  loggedIn: false,
};
