# Gym Platform Backend Specification

## Overview

This backend serves both:

1. Public Gym Website
2. Administration Panel

The backend must expose a secure API layer and provide all business logic, data management, authentication, authorization, file management, notifications, and integrations required by the platform.

The architecture should be designed to support future growth and additional modules without requiring major refactoring.

---

# Architecture Goals

## Core Requirements

- Scalable
- Maintainable
- Modular
- API-first
- Secure
- SEO-friendly
- Mobile-friendly
- PWA-compatible

---

# Recommended Architecture

## Pattern

Modular Monolith

Reason:

The current project size does not justify microservices.

The backend should be separated into domain modules while remaining a single deployable application.

Example modules:

- Auth
- Users
- Content
- Memberships
- Reservations
- Store
- Orders
- Recruitment
- Blog
- Media
- SMS
- Notifications
- Settings

---

# API Design

## API Style

REST API

Optional future support:

- GraphQL
- Public API Keys

---

## Versioning

All endpoints should be versioned.

Example:

/api/v1

---

# Authentication Module

## User Authentication

Authentication method:

OTP Login

Flow:

1. User submits mobile number
2. OTP generated
3. OTP sent via SMS provider
4. User verifies OTP
5. JWT issued

---

## Admin Authentication

Authentication method:

Username/Password

Optional:

- OTP verification
- Two-factor authentication

---

## Tokens

Support:

- Access Token
- Refresh Token

---

# Authorization Module

## Roles

System roles:

- Super Admin
- Manager
- Content Manager
- Support Operator
- Customer

---

## Permissions

Permission-based authorization.

Examples:

- Manage Users
- Manage Orders
- Manage Blog
- Manage Reservations
- Manage Memberships

---

# User Module

## User Profile

Fields:

- ID
- Full Name
- Mobile Number
- Gender
- Created At
- Updated At

---

## User Dashboard Data

Support retrieval of:

- Membership requests
- Reservations
- Orders
- Recruitment applications

---

# Membership Module

## Membership Plans

Fields:

- Name
- Description
- Duration
- Price
- Active Status
- Promotional Status

---

## Membership Requests

Fields:

- User
- Membership Plan
- Receipt Image
- Notes
- Status

---

## Statuses

- Pending Review
- Approved
- Rejected
- Activated

---

## Business Rules

Memberships are activated manually outside the platform.

The system only tracks requests and approvals.

---

# Reservation Module

## Services

Supported services:

- Massage
- Solarium

---

## Reservation Entity

Fields:

- User
- Service Type
- Date
- Time Slot
- Receipt Image
- Status
- Notes

---

## Statuses

- Pending
- Confirmed
- Rejected
- Completed

---

## Reservation Rules

No overlapping reservations.

No double booking.

Unavailable slots must not be returned by APIs.

---

## Schedule Configuration

Configurable:

- Working days
- Working hours
- Slot duration
- Holidays
- Maintenance days

---

# Store Module

## Categories

Fields:

- Name
- Slug
- Description

---

## Products

Fields:

- Name
- Slug
- Description
- SKU
- Category
- Status

---

## Product Media

Support:

- Multiple Images
- Gallery
- Featured Image

---

## Variants

Examples:

- Color
- Size

Fields:

- Variant Name
- SKU
- Inventory
- Price Modifier

---

## Inventory

Track inventory per variant.

Support:

- Low stock threshold
- Out of stock tracking

---

# Cart Module

## Features

- Add item
- Remove item
- Update quantity
- Persist cart

---

# Order Module

## Delivery Methods

### Pickup

Customer collects product.

### Delivery

Courier delivery.

---

## Order Fields

- User
- Items
- Delivery Type
- Address
- Phone Number
- Delivery Fee
- Receipt Image
- Status

---

## Statuses

- Pending Review
- Approved
- Preparing
- Ready for Pickup
- Shipped
- Completed
- Rejected

---

## Business Rules

Orders are manually reviewed.

Payment proof is uploaded by customer.

---

# Recruitment Module

## Positions

Fields:

- Title
- Description
- Active Status

---

## Applications

Fields:

- Full Name
- Mobile Number
- Position
- Description
- Resume File
- Status

---

## Statuses

- New
- Under Review
- Interview
- Rejected
- Hired

---

# Content Module

## Landing Page Content

Manage:

- Hero Content
- Homepage Sections
- CTA Blocks

---

## Coaches

Fields:

- Name
- Biography
- Specialty
- Photo

---

## Facilities

Fields:

- Title
- Description
- Images
- Videos

---

## Achievements

Fields:

- Title
- Description
- Image

---

# Media Module

## File Upload

Supported types:

Images:

- JPG
- PNG
- WEBP

Videos:

- MP4

Documents:

- PDF
- DOC
- DOCX

---

## Media Features

- Upload
- Delete
- Replace
- Metadata Storage

---

# Blog Module

## Articles

Fields:

- Title
- Slug
- Content
- Excerpt
- Author
- Featured Image

---

## SEO Fields

- SEO Title
- Meta Description
- Canonical URL
- Open Graph Image

---

## Categories

CRUD support.

---

## Tags

CRUD support.

---

## FAQ Sections

Attach FAQs to articles.

---

## SEO Features

Support:

- Sitemap Generation
- Structured Data
- Canonical URLs

---

# Video Module

## Video Entries

Fields:

- Title
- Description
- Thumbnail
- Source Type
- Source URL

---

## Supported Sources

- YouTube
- Aparat
- Self Hosted

---

# Notification Module

## Internal Notifications

Used by admin panel.

Events:

- New Membership Request
- New Reservation
- New Order
- New Recruitment Application

---

# SMS Module

## SMS Provider Integration

Abstract provider implementation.

Support future providers without business logic changes.

---

## SMS Events

- OTP Login
- Membership Requests
- Reservation Requests
- Reservation Approval
- Reservation Rejection
- Orders
- Recruitment Applications

---

# Settings Module

## General Settings

Store:

- Gym Name
- Contact Information
- Address
- Social Media Links

---

## Working Hours

Store:

- Opening Hours
- Holidays
- Maintenance Days

---

## Payment Settings

Store:

- Bank Name
- Card Number
- Account Holder
- Payment Instructions

---

## Delivery Settings

Store:

- Delivery Fee
- Pickup Instructions

---

# Search Module

Global search support for:

- Products
- Blog Posts
- Coaches
- Facilities

---

# Audit Log Module

Track all administrative actions.

Store:

- User
- Action
- Entity
- Timestamp
- Changes

---

# Reporting Module

Provide reporting APIs for:

- Users
- Orders
- Reservations
- Membership Requests
- Recruitment Applications

---

# File Storage

Support storage abstraction.

Possible providers:

- Local Storage
- S3-Compatible Storage
- Cloud Storage Providers

The application should not depend on a specific storage provider.

---

# Security Requirements

## API Security

- JWT Authentication
- Refresh Tokens
- Rate Limiting
- Input Validation
- Request Sanitization

---

## Upload Security

- File Type Validation
- File Size Limits
- Malware Scanning Support

---

## Data Security

- Encrypted Secrets
- Secure Password Storage
- Secure Token Storage

---

# Performance Requirements

- Pagination on all large lists
- Database indexing
- Optimized image delivery
- Response caching where appropriate

---

# Database Requirements

Recommended database:

PostgreSQL

The schema should support:

- Soft Deletes
- Audit Logs
- CreatedAt
- UpdatedAt

for all major entities.

---

# Future Extensions

The architecture must allow future implementation of:

- Online Payment Gateways
- Multi-Branch Gyms
- Loyalty Programs
- Push Notifications
- CRM Integration
- Accounting Integration
- Mobile Applications
- AI-Powered Recommendations
- Multi-Language Support

---

# Recommended Technology Stack

## Backend

- Node.js
- NestJS

## Database

- PostgreSQL

## ORM

- Prisma

## Authentication

- JWT
- OTP

## Storage

- S3 Compatible Storage

## Cache

- Redis

## Background Jobs

- BullMQ

## API Documentation

- OpenAPI / Swagger

## Containerization

- Docker

## Reverse Proxy

- Nginx

This stack should be considered the baseline architecture unless there is a specific business or infrastructure reason to choose differently.
