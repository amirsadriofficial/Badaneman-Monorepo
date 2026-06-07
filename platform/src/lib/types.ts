export type GymStatus = "open" | "closed" | "holiday" | "maintenance";

export type MembershipStatus = "pending_review" | "approved" | "rejected" | "activated";
export type ReservationStatus = "pending" | "confirmed" | "rejected" | "completed";
export type OrderStatus = "pending_review" | "approved" | "preparing" | "ready_for_pickup" | "shipped" | "completed" | "rejected";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  image: string | null;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}
