# Badaneman Backend

NestJS + Prisma REST API for the gym platform (public website + admin panel).

## Stack

- NestJS 11
- PostgreSQL + Prisma
- JWT auth (OTP for users, username/password for admins)
- Swagger at `/docs`

## Quick Start

```bash
# Start database
docker compose up -d

# Install & setup
cp .env.example .env
pnpm install
pnpm db:setup

# Run dev server
pnpm start:dev
```

API base: `http://localhost:3001/api/v1`

## Default Admin

- Username: `admin`
- Password: `admin123` (from `.env`)

## Dev OTP

In development, OTP code is always `123456` (configurable via `OTP_DEV_CODE`).

## Modules

| Module | Public | Admin |
|--------|--------|-------|
| Auth | OTP login, refresh | Admin login |
| Users | Profile | User list |
| Content | Homepage, coaches, facilities | CMS CRUD |
| Memberships | Plans, requests | Plans + request management |
| Reservations | Services, availability | Calendar, schedule |
| Store | Products, categories | Products, inventory |
| Cart | User cart | — |
| Orders | Create, list | Status management |
| Recruitment | Positions, apply | Positions, applications |
| Blog | Posts, categories, tags | Full CRUD |
| Media | Gallery, videos | Upload + CRUD |
| Notifications | — | List, mark read |
| SMS | — | Templates, logs |
| Settings | Payment, delivery, hours | All settings |
| Search | Global search | — |
| Audit | — | Activity logs |
| Reports | — | Dashboard, analytics |

## Frontend Integration

Set in platform/panel `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```
