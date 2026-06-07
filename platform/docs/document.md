# Gym Website Project Specification

## Overview

This project is a complete website platform for a single gym branch.

The platform includes:

- Gym introduction and marketing pages
- Membership request system
- Massage and solarium reservation system
- E-commerce store
- Recruitment section
- Blog and SEO content management
- User authentication and customer dashboard
- SMS notifications
- PWA support

**Note:** Admin panel requirements are intentionally excluded from this document and will be defined separately.

---

# General Requirements

## Responsive Design

The entire platform must be fully responsive and mobile-first.

Supported devices:

- Mobile phones
- Tablets
- Desktop browsers

## PWA Support

The website must support:

- Installable PWA
- Home screen shortcut
- Offline fallback page
- Cached static assets
- Mobile-friendly experience

## SEO Requirements

SEO is a high-priority requirement.

Requirements:

- SSR/SSG friendly architecture
- Metadata management
- Open Graph support
- Structured data (Schema.org)
- Sitemap generation
- Robots.txt generation
- Canonical URLs
- Breadcrumb support
- FAQ Schema
- Article Schema

---

# Authentication

## Login Method

Authentication must be OTP-based.

No password authentication is required.

## User Information

Required user fields:

- Full Name
- Mobile Number
- Gender

---

# Public Website

## Landing Page

### Hero Section

- Main headline
- CTA buttons
- Promotional content

### Gym Status

Display current gym status prominently:

- Open
- Closed
- Holiday
- Maintenance

### Gym Introduction

- About the gym
- Key benefits
- Highlights

### Facilities Section

Display gym facilities with:

- Images
- Descriptions
- Icons

Examples:

- Fitness Area
- CrossFit
- Solarium
- Massage
- Cafe

### Achievements Section

- Awards
- Certifications
- Competition results

### Coaches Section

Each coach includes:

- Photo
- Name
- Specialty
- Biography

### Location Section

- Address
- Google Maps integration
- Working days
- Working hours
- Contact information

---

# Gym Tour

## Gallery

- Image gallery
- Lightbox support
- Categorized media

## Videos

- Facility walkthroughs
- Coach introductions
- Promotional videos

Future consideration:

- 360° virtual tour

---

# User Dashboard

Users can access:

## Profile

- View profile
- Edit profile information

## Membership Requests

- Request history
- Current status

## Reservations

- Massage reservations
- Solarium reservations

## Orders

- Store order history
- Order statuses

---

# Membership Purchase Requests

## Membership Plans

Examples:

- Monthly
- Quarterly
- Semi-Annual
- Annual

## Promotions

Support:

- Discount campaigns
- Featured plans

## Purchase Flow

1. User selects a membership plan.
2. User sees payment instructions.
3. User transfers money manually.
4. User uploads payment receipt.
5. Request is submitted.

## Statuses

- Pending Review
- Approved
- Rejected
- Activated

Note:

Membership activation happens manually in an external system by gym staff.

---

# Reservation System

Services:

- Massage
- Solarium

There is:

- One massage operator
- One solarium device

## Reservation Flow

1. User selects service.
2. User selects available date.
3. User selects available time slot.
4. User uploads payment receipt.
5. Reservation request is submitted.
6. SMS notification is sent to manager.
7. Manager reviews and confirms manually.

## Reservation Statuses

- Pending
- Confirmed
- Rejected
- Completed

## Availability Rules

Reserved time slots must no longer appear as available.

Double booking must not be possible.

---

# E-Commerce Store

## Product Listing

Features:

- Search
- Filtering
- Categories
- Pagination

## Product Details

Each product includes:

- Name
- Slug
- Description
- Images
- Inventory
- Specifications
- Variants

## Product Variants

Examples:

- Size
- Color

Inventory must be tracked per variant.

## Shopping Cart

Support:

- Add item
- Remove item
- Update quantity

---

# Order Fulfillment

Users must choose one of the following:

## In-Person Pickup

Customer collects the product from the gym.

## Local Delivery

Customer provides:

- Address
- Contact phone number

A configurable delivery fee is added to the order total.

---

# Store Payment Flow

1. Customer places order.
2. Payment instructions are displayed.
3. Customer transfers money manually.
4. Customer uploads receipt.
5. SMS notification is sent to staff.
6. Staff reviews the order.

## Order Statuses

- Pending Review
- Approved
- Preparing
- Ready for Pickup
- Shipped
- Completed
- Rejected

---

# Recruitment Section

## Open Positions

Examples:

- Coach
- Service Staff
- Massage Therapist
- Solarium Operator

## Application Form

Required fields:

- Full Name
- Mobile Number
- Position
- Description
- Resume File Upload

## Application Statuses

- New
- Under Review
- Interview
- Rejected
- Hired

---

# Blog System

This module is critical for SEO.

## Categories

Examples:

- Fitness
- Nutrition
- Supplements
- Weight Loss
- Muscle Gain
- Women's Fitness
- Training Programs

## Features

- Categories
- Tags
- Rich text editor support
- Featured image
- Author
- Related posts
- FAQ blocks
- Internal linking

## SEO Fields

- SEO Title
- Meta Description
- Canonical URL
- Open Graph Image

---

# Video Library

Each video includes:

- Title
- Description
- Thumbnail
- Embedded video or uploaded file

Supported sources:

- YouTube
- Aparat
- Self-hosted videos

---

# SMS Notifications

SMS notifications should be triggered for:

- User registration
- Membership requests
- Reservation requests
- Reservation approval
- Reservation rejection
- Store orders
- Recruitment applications

---

# Additional Recommended Features

## Favorites

Users can save:

- Products
- Blog posts

## FAQ Pages

Dedicated FAQ sections for:

- Memberships
- Massage
- Solarium
- Orders

## Consultation Request Form

Fields:

- Full Name
- Mobile Number
- Fitness Goal

Examples:

- Weight Loss
- Muscle Gain
- General Fitness

This form allows gym staff to contact potential customers and is expected to improve conversion rates.

---

# Out of Scope

The following items are intentionally excluded from this specification:

- Admin Panel
- Multi-branch support
- Online payment gateway integration
- Mobile applications (native iOS/Android)

These may be added in future phases.
