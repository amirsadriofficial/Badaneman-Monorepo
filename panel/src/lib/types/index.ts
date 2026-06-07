export type AdminRole =
  | "super_admin"
  | "manager"
  | "content_manager"
  | "support_operator";

export type GymStatus = "open" | "closed" | "holiday" | "maintenance";

export type MembershipStatus =
  | "pending_review"
  | "approved"
  | "rejected"
  | "activated";

export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "rejected"
  | "completed";

export type OrderStatus =
  | "pending_review"
  | "approved"
  | "preparing"
  | "ready_for_pickup"
  | "shipped"
  | "completed"
  | "rejected";

export type ApplicationStatus =
  | "new"
  | "under_review"
  | "interview"
  | "rejected"
  | "hired";

export type DeliveryType = "pickup" | "delivery";

export type VideoSource = "youtube" | "aparat" | "upload";

export interface AdminUser {
  id: string;
  username: string;
  fullName: string;
  role: AdminRole;
  email: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeMemberships: number;
  monthlyReservations: number;
  storeSales: number;
  blogViews: number;
  pendingMemberships: number;
  pendingReservations: number;
  pendingOrders: number;
  newApplications: number;
}

export interface MembershipRequest {
  id: string;
  user: string;
  plan: string;
  status: MembershipStatus;
  submittedAt: string;
}

export interface ReservationRequest {
  id: string;
  user: string;
  service: string;
  date: string;
  time: string;
  status: ReservationStatus;
}

export interface Order {
  id: string;
  customer: string;
  total: number;
  deliveryType: DeliveryType;
  status: OrderStatus;
  createdAt: string;
}

export interface RecruitmentApplication {
  id: string;
  applicant: string;
  phone: string;
  position: string;
  status: ApplicationStatus;
  submittedAt: string;
}

export interface NotificationItem {
  id: string;
  type: "reservation" | "membership" | "order" | "recruitment";
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface NavItem {
  title: string;
  href?: string;
  icon: string;
  roles?: AdminRole[];
  children?: NavItem[];
}
