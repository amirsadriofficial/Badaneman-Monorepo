"use client";

import {
  Activity,
  Banknote,
  BarChart3,
  Bell,
  Briefcase,
  Building2,
  Calendar,
  CalendarDays,
  ChevronDown,
  Clock,
  CreditCard,
  FileText,
  FileUser,
  Folder,
  Hash,
  Home,
  Image,
  Images,
  Inbox,
  Info,
  Layers,
  LayoutDashboard,
  List,
  Mail,
  MessageSquare,
  Newspaper,
  Package,
  ScrollText,
  Settings,
  Share2,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Sliders,
  Tags,
  Timer,
  Truck,
  Trophy,
  UserCircle,
  Users,
  Video,
  Warehouse,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { navigation } from "@/lib/navigation";
import type { NavItem } from "@/lib/types";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  FileText,
  Home,
  Activity,
  Info,
  Trophy,
  Users,
  Building2,
  Image,
  Images,
  Video,
  UserCircle,
  CreditCard,
  Layers,
  Inbox,
  Calendar,
  CalendarDays,
  Clock,
  Timer,
  ShoppingBag,
  Package,
  Tags,
  Warehouse,
  ShoppingCart,
  Briefcase,
  List,
  FileUser,
  Newspaper,
  Folder,
  Hash,
  MessageSquare,
  Mail,
  ScrollText,
  Bell,
  Settings,
  Sliders,
  Share2,
  Banknote,
  Truck,
  BarChart3,
  Shield,
};

function NavIcon({ name }: { name: string }) {
  const Icon = iconMap[name] ?? FileText;
  return <Icon className="h-4 w-4 shrink-0" />;
}

function NavLink({
  item,
  depth = 0,
  onNavigate,
}: {
  item: NavItem;
  depth?: number;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(
    item.children?.some((c) => c.href && pathname.startsWith(c.href)) ?? false,
  );

  if (item.children) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
            depth > 0 && "ps-6",
          )}
        >
          <NavIcon name={item.icon} />
          <span className="flex-1 text-start">{item.title}</span>
          <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", open && "rotate-180")} />
        </button>
        {open && (
          <div className="mt-1 space-y-0.5 ps-3">
            {item.children.map((child) => (
              <NavLink key={child.title} item={child} depth={depth + 1} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    );
  }

  const active =
    item.href === pathname ||
    (item.href !== "/dashboard" && item.href != null && pathname.startsWith(item.href));

  return (
    <Link
      href={item.href ?? "#"}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        depth > 0 && "ps-9",
        active
          ? "bg-zinc-900 text-white"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
      )}
    >
      <NavIcon name={item.icon} />
      {item.title}
    </Link>
  );
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname]);

  return (
    <aside
      className={cn(
        "flex w-72 flex-col border-e border-zinc-200 bg-white",
        "fixed inset-y-0 start-0 z-40 max-w-[85vw] shadow-xl transition-transform duration-300",
        "md:static md:z-auto md:w-64 md:max-w-none md:translate-x-0 md:shadow-none",
        open
          ? "translate-x-0"
          : "max-md:-translate-x-full max-md:rtl:translate-x-full",
      )}
    >
      <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-4 md:h-16 md:px-6">
        <Link href="/dashboard" className="flex items-center gap-2" onClick={onClose}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-sm font-bold text-white">
            ب
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900">بدن‌من</p>
            <p className="text-xs text-zinc-500">پنل مدیریت</p>
          </div>
        </Link>
        <button
          type="button"
          aria-label="بستن منو"
          className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 md:hidden"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto overscroll-contain p-3 md:p-4">
        {navigation.map((item) => (
          <NavLink key={item.title} item={item} onNavigate={onClose} />
        ))}
      </nav>
    </aside>
  );
}
