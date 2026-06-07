import type { AdminRole } from "@/lib/types";

const rolePermissions: Record<AdminRole, string[]> = {
  super_admin: ["*"],
  manager: [
    "dashboard",
    "memberships",
    "reservations",
    "store",
    "orders",
    "users",
    "recruitment",
    "notifications",
    "analytics",
  ],
  content_manager: [
    "dashboard",
    "content",
    "coaches",
    "facilities",
    "media",
    "blog",
    "settings",
  ],
  support_operator: [
    "dashboard",
    "memberships",
    "reservations",
    "orders",
    "recruitment",
    "users",
    "notifications",
  ],
};

export function canAccess(role: AdminRole, module: string): boolean {
  const permissions = rolePermissions[role];
  return permissions.includes("*") || permissions.includes(module);
}

export function roleLabel(role: AdminRole): string {
  const labels: Record<AdminRole, string> = {
    super_admin: "مدیر کل",
    manager: "مدیر",
    content_manager: "مدیر محتوا",
    support_operator: "پشتیبان",
  };
  return labels[role];
}
