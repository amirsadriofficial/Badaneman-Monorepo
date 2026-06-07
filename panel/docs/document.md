# Gym Administration Panel Specification

## Overview

This project is the administrative back-office system for the Gym Website Platform.

The admin panel is responsible for managing:

- Website content
- Membership requests
- Reservations
- Store operations
- Recruitment applications
- Blog content
- Media assets
- SMS notifications
- General website settings

The admin panel is a standalone application with its own authentication and authorization system.

---

# General Requirements

## Responsive Design

The admin panel should be fully responsive and usable on:

- Desktop
- Tablet

Mobile support is optional but preferred.

---

## Role-Based Access Control (RBAC)

Support multiple admin roles.

Suggested roles:

### Super Admin

Full access to all modules.

### Manager

Can manage operations, reservations, orders, and memberships.

### Content Manager

Can manage:

- Blog
- Pages
- Media
- Videos

### Support Operator

Can manage:

- Membership requests
- Reservations
- Orders
- Recruitment applications

---

# Authentication

## Admin Login

Authentication methods:

- Username + Password
- Optional OTP verification

---

# Dashboard

## Overview Widgets

Display:

- New membership requests
- Pending reservations
- Pending orders
- Recruitment applications
- Recent users
- Website statistics

---

## Quick Statistics

Examples:

- Total users
- Active memberships
- Monthly reservations
- Store sales
- Blog views

---

# Website Content Management

## Landing Page Management

Manage:

- Hero section
- Headlines
- CTA buttons
- Featured content

---

## Gym Status Management

Administrators can manually set:

- Open
- Closed
- Holiday
- Maintenance

Status must immediately appear on the public website.

---

## About Page

Manage:

- Introduction content
- History
- Mission
- Vision

---

## Achievements

CRUD operations for:

- Awards
- Certifications
- Competitions
- Honors

Each item supports:

- Title
- Description
- Image

---

# Coaches Management

Manage coaches.

Fields:

- Name
- Photo
- Position
- Biography
- Experience
- Social links

Operations:

- Create
- Edit
- Delete
- Reorder

---

# Facilities Management

Manage gym facilities.

Examples:

- Fitness Area
- CrossFit
- Solarium
- Massage
- Cafe

Fields:

- Title
- Description
- Images
- Videos
- Sort order

---

# Media Management

## Gallery

Manage:

- Images
- Categories
- Albums

Operations:

- Upload
- Edit
- Delete

---

## Videos

Manage:

- Video title
- Description
- Thumbnail
- Source type

Supported sources:

- YouTube
- Aparat
- Uploaded video

---

# User Management

## User Profiles

View and manage users.

Fields:

- Full name
- Mobile number
- Gender
- Registration date

---

## User Activity

View:

- Orders
- Reservations
- Membership requests

---

# Membership Management

## Membership Plans

Manage plans.

Fields:

- Name
- Description
- Price
- Duration
- Promotional status

Operations:

- Create
- Edit
- Delete

---

## Membership Requests

View all requests.

Fields:

- User
- Plan
- Payment receipt
- Submission date

Actions:

- Approve
- Reject
- Add notes

---

## Membership Statuses

- Pending Review
- Approved
- Rejected
- Activated

---

# Reservation Management

Services:

- Massage
- Solarium

---

## Calendar View

Display reservations in:

- Daily view
- Weekly view
- Monthly view

---

## Reservation Requests

Fields:

- User
- Service
- Date
- Time
- Receipt
- Notes

Actions:

- Approve
- Reject
- Complete

---

## Reservation Statuses

- Pending
- Confirmed
- Rejected
- Completed

---

## Time Slot Management

Configure:

- Working days
- Working hours
- Slot duration
- Disabled dates

Examples:

- Holidays
- Maintenance days

---

# Store Management

## Product Management

Fields:

- Name
- Slug
- Description
- Category
- Images
- Inventory
- SKU

Operations:

- Create
- Edit
- Delete

---

## Product Variants

Support:

- Size
- Color
- Custom attributes

Each variant includes:

- Inventory
- SKU
- Price adjustment

---

## Categories

Manage product categories.

Operations:

- Create
- Edit
- Delete

---

## Inventory Management

Track:

- Stock quantity
- Low stock alerts
- Out of stock status

---

# Order Management

## Orders

View:

- Customer information
- Products
- Delivery method
- Payment receipt

---

## Delivery Types

### Pickup

Customer collects product.

### Delivery

Customer receives product by courier.

---

## Order Actions

- Approve
- Reject
- Mark as Preparing
- Mark as Ready
- Mark as Shipped
- Mark as Completed

---

## Order Statuses

- Pending Review
- Approved
- Preparing
- Ready for Pickup
- Shipped
- Completed
- Rejected

---

# Recruitment Management

## Job Positions

Manage available positions.

Examples:

- Coach
- Service Staff
- Massage Therapist
- Solarium Operator

Operations:

- Create
- Edit
- Delete

---

## Applications

View submitted applications.

Fields:

- Applicant name
- Phone number
- Position
- Description
- Resume file

Actions:

- Change status
- Add notes

---

## Application Statuses

- New
- Under Review
- Interview
- Rejected
- Hired

---

# Blog Management

## Articles

Manage blog posts.

Fields:

- Title
- Slug
- Content
- Category
- Tags
- Author
- Featured image

---

## SEO Fields

Support:

- SEO title
- Meta description
- Canonical URL
- Open Graph image

---

## Categories

CRUD operations for article categories.

---

## Tags

CRUD operations for tags.

---

## FAQ Blocks

Manage FAQ sections attached to blog posts.

---

# SMS Management

## SMS Templates

Manage templates for:

- Registration
- Membership requests
- Reservations
- Orders
- Recruitment

---

## SMS Logs

View:

- Recipient
- Message
- Status
- Sent date

---

# Notification Center

Display real-time notifications for:

- New reservation requests
- New membership requests
- New orders
- New job applications

---

# Website Settings

## General Settings

Manage:

- Gym name
- Logo
- Contact information
- Address

---

## Working Hours

Manage:

- Daily opening hours
- Holidays
- Temporary closures

---

## Social Media

Manage:

- Instagram
- Telegram
- WhatsApp
- YouTube

---

## Payment Information

Manage:

- Bank account information
- Card-to-card payment instructions

---

## Delivery Settings

Manage:

- Courier fee
- Pickup instructions

---

# Analytics

## Reporting Dashboard

View statistics for:

- Membership requests
- Reservations
- Orders
- Revenue
- User registrations

---

## Export

Support exporting:

- Users
- Orders
- Reservations
- Membership requests
- Recruitment applications

Formats:

- Excel
- CSV

---

# Audit Logs

Track all important administrative actions.

Examples:

- Content changes
- Order approvals
- Reservation updates
- Membership approvals

Store:

- Admin user
- Action
- Timestamp

---

# Future Extensions

The architecture should support future additions:

- Online payment gateways
- Multi-branch gyms
- Loyalty programs
- Push notifications
- Native mobile applications
- CRM integration
- Accounting integration
