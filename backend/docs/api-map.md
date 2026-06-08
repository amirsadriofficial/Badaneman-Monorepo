# API Map — Platform & Panel Coverage

Base URL: `/api/v1`

## Platform (Public Website)

| Feature | Endpoints |
|---------|-----------|
| OTP Login | `POST auth/otp/request`, `POST auth/otp/verify`, `POST auth/refresh`, `POST auth/logout`, `GET auth/me` |
| Homepage | `GET content/homepage` |
| About / Coaches / Facilities / Achievements / FAQ | `GET content/about`, `coaches`, `facilities`, `achievements`, `faqs` |
| Gym Status | `GET content/gym-status` |
| Membership | `GET membership-plans`, `POST membership-requests` (auth) |
| Reservations | `GET reservation-services`, `GET reservation-availability`, `POST reservations` (auth) |
| Store | `GET store/products`, `GET store/products/:slug`, `GET store/categories` |
| Cart | `GET/POST/PATCH/DELETE cart` (auth) |
| Orders | `POST orders`, `GET orders`, `GET orders/:id` (auth) |
| Recruitment | `GET recruitment/positions`, `POST recruitment/applications` |
| Blog | `GET blog/posts`, `GET blog/posts/:slug`, `GET blog/categories`, `GET blog/tags` |
| Gallery / Videos | `GET media/gallery`, `GET media/videos` |
| Settings | `GET settings/general`, `social`, `payment`, `delivery`, `hours` |
| Search | `GET search?q=` |
| Consultation | `POST content/consultation` |
| User Profile | `GET/PATCH users/me` (auth) |
| User Dashboard | `GET membership-requests`, `reservations`, `orders` (auth) |

## Panel (Admin)

| Feature | Endpoints |
|---------|-----------|
| Login | `POST admin/auth/login`, `POST admin/auth/refresh`, `POST admin/auth/logout`, `GET admin/me` |
| Dashboard | `GET admin/reports/dashboard` |
| Analytics | `GET admin/reports/analytics` |
| Content CMS | `PUT admin/content/*` (landing, about, gym-status, coaches, facilities, achievements, faqs) |
| Users | `GET admin/users` |
| Memberships | `admin/memberships/plans` CRUD, `admin/memberships/requests` list/update |
| Reservations | `admin/reservations` list/update, `admin/reservations/calendar`, `admin/reservations/schedule` |
| Store | `admin/store/products`, `categories`, `inventory` CRUD |
| Orders | `GET admin/orders`, `PATCH admin/orders/:id/status` |
| Recruitment | `admin/recruitment/positions` CRUD, `admin/recruitment/applications` list/update |
| Blog | `admin/blog/articles`, `categories`, `tags` CRUD |
| Media | `POST admin/media/upload`, gallery/videos CRUD |
| SMS | `admin/sms/templates` CRUD, `GET admin/sms/logs` |
| Notifications | `GET admin/notifications`, unread count, mark read |
| Settings | `PUT admin/settings` (general, social, payment, delivery, hours) |
| Audit Logs | `GET admin/audit-logs` |

## Cross-Cutting

- **File upload:** `POST admin/media/upload` → returns URL for receipts, resumes, images
- **Notifications:** Auto-created on new membership/reservation/order/recruitment
- **Audit:** Logged on all admin write operations
- **Roles:** `super_admin`, `manager`, `content_manager`, `support_operator`
