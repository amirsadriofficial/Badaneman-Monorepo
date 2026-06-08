import { PrismaClient, AdminRole, ReservationServiceType, VideoSource } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD ?? 'admin123';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash,
      fullName: 'امیر صدری',
      email: 'admin@gym.com',
      role: AdminRole.super_admin,
    },
  });

  await prisma.generalSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      gymName: 'بدن‌من',
      phone: '021-12345678',
      email: 'info@badaneman.com',
      address: 'تهران، خیابان ولیعصر',
    },
  });

  await prisma.socialSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      instagram: 'https://instagram.com/badaneman',
      telegram: 'https://t.me/badaneman',
      whatsapp: '09120000000',
      youtube: 'https://youtube.com/badaneman',
    },
  });

  await prisma.paymentSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      bankName: 'ملت',
      cardNumber: '6104-3377-1234-5678',
      accountHolder: 'باشگاه بدن‌من',
      instructions: 'پس از واریز، تصویر رسید را آپلود کنید.',
    },
  });

  await prisma.deliverySettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      courierFee: 85000,
      pickupInstructions: 'تحویل از باشگاه بین ساعات ۱۰ تا ۲۰',
      deliveryInstructions: 'ارسال در تهران ۲۴ تا ۴۸ ساعت',
    },
  });

  await prisma.landingContent.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      headline: 'بدن سالم، زندگی شاد',
      subheadline: 'باشگاه تخصصی بدنسازی و فیتنس',
      ctaPrimary: 'عضویت',
      ctaSecondary: 'رزرو خدمات',
      featured: 'پلن طلایی ۳ ماهه',
    },
  });

  await prisma.aboutContent.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      intro: 'باشگاه بدن‌من با بیش از ۱۵ سال سابقه',
      history: 'تأسیس ۱۳۸۸',
      mission: 'ارتقای سلامت جامعه',
      vision: 'برترین باشگاه تهران',
    },
  });

  await prisma.gymStatusSetting.upsert({
    where: { id: 'default' },
    update: {},
    create: { id: 'default', status: 'open' },
  });

  await prisma.reservationSchedule.upsert({
    where: { id: 'default' },
    update: {},
    create: { id: 'default', slotDuration: 30 },
  });

  for (let day = 0; day < 7; day++) {
    await prisma.workingDay.upsert({
      where: { scheduleId_dayOfWeek: { scheduleId: 'default', dayOfWeek: day } },
      update: {},
      create: {
        scheduleId: 'default',
        dayOfWeek: day,
        openTime: day === 5 ? '00:00' : '10:00',
        closeTime: day === 5 ? '00:00' : '20:00',
        isClosed: day === 5,
      },
    });
  }

  await prisma.reservationService.upsert({
    where: { type: ReservationServiceType.massage },
    update: {},
    create: {
      name: 'ماساژ',
      type: ReservationServiceType.massage,
      price: 450000,
      description: 'ماساژ درمانی و ریلکسی',
    },
  });

  await prisma.reservationService.upsert({
    where: { type: ReservationServiceType.solarium },
    update: {},
    create: {
      name: 'سولاریوم',
      type: ReservationServiceType.solarium,
      price: 280000,
      description: 'سولاریوم حرفه‌ای',
    },
  });

  const plans = [
    { name: 'پلن نقره‌ای ۱ ماهه', durationDays: 30, price: 1500000 },
    { name: 'پلن طلایی ۳ ماهه', durationDays: 90, price: 3800000, isPromotional: true },
    { name: 'پلن الماسی ۶ ماهه', durationDays: 180, price: 6500000 },
  ];

  for (const plan of plans) {
    const existing = await prisma.membershipPlan.findFirst({ where: { name: plan.name } });
    if (!existing) {
      await prisma.membershipPlan.create({ data: plan });
    }
  }

  const category = await prisma.storeCategory.upsert({
    where: { slug: 'supplements' },
    update: {},
    create: { name: 'مکمل‌ها', slug: 'supplements', description: 'مکمل‌های ورزشی' },
  });

  const product = await prisma.product.upsert({
    where: { slug: 'whey-protein' },
    update: {},
    create: {
      name: 'پروتئین وی',
      slug: 'whey-protein',
      sku: 'WHEY-001',
      description: 'پروتئین وی با کیفیت بالا',
      categoryId: category.id,
      lowStockThreshold: 5,
    },
  });

  await prisma.productVariant.upsert({
    where: { sku: 'WHEY-001-2KG' },
    update: {},
    create: {
      productId: product.id,
      name: '۲ کیلوگرم',
      sku: 'WHEY-001-2KG',
      stock: 25,
      priceModifier: 0,
    },
  });

  const blogCat = await prisma.blogCategory.upsert({
    where: { slug: 'training' },
    update: {},
    create: { name: 'تمرین', slug: 'training' },
  });

  await prisma.blogArticle.upsert({
    where: { slug: 'beginner-guide' },
    update: {},
    create: {
      title: 'راهنمای مبتدیان بدنسازی',
      slug: 'beginner-guide',
      excerpt: 'شروع درست در بدنسازی',
      content: 'محتوای کامل مقاله...',
      author: 'مربی احمد',
      categoryId: blogCat.id,
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  const position = await prisma.recruitmentPosition.upsert({
    where: { id: 'seed-coach' },
    update: {},
    create: {
      id: 'seed-coach',
      title: 'مربی بدنسازی',
      department: 'مربیگری',
      description: 'نیاز به مربی با سابقه',
      isActive: true,
    },
  });

  await prisma.coach.createMany({
    data: [
      { name: 'مربی احمد', position: 'مربی ارشد', experience: '۱۲ سال', specialty: 'بدنسازی' },
      { name: 'مربی نیلوفر', position: 'کراس‌فیت', experience: '۸ سال', specialty: 'کراس‌فیت' },
    ],
    skipDuplicates: true,
  });

  await prisma.facility.createMany({
    data: [
      { title: 'سالن بدنسازی', description: 'تجهیزات مدرن', sortOrder: 1 },
      { title: 'استخر', description: 'استخر المپیک', sortOrder: 2, hasVideo: true },
    ],
    skipDuplicates: true,
  });

  await prisma.faq.createMany({
    data: [
      { question: 'ساعات کاری؟', answer: 'شنبه تا پنجشنبه ۱۰ تا ۲۰', category: 'عمومی' },
      { question: 'هزینه عضویت؟', answer: 'از ۱.۵ میلیون تومان', category: 'عضویت' },
    ],
    skipDuplicates: true,
  });

  await prisma.video.createMany({
    data: [
      {
        title: 'تور باشگاه',
        source: VideoSource.youtube,
        sourceUrl: 'https://youtube.com/watch?v=example',
        description: 'معرفی امکانات',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.smsTemplate.createMany({
    data: [
      { name: 'OTP ورود', category: 'auth', body: 'کد تأیید: {{code}}' },
      { name: 'تأیید رزرو', category: 'reservation', body: 'رزرو شما تأیید شد.' },
    ],
    skipDuplicates: true,
  });

  console.log('Seed completed. Admin: admin /', adminPassword);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
