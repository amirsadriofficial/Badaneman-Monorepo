"use client";

import { ChevronDown, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { common } from "@/lib/locale/fa";
import { mockAdmin } from "@/lib/mock-data";
import { roleLabel } from "@/lib/permissions";
import { cn } from "@/lib/utils";

const menuItems = [{ href: "/settings/general", label: "تنظیمات", icon: Settings }] as const;

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return parts[0][0] + parts[1][0];
  return name.slice(0, 2);
}

export function AdminMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  async function handleLogout() {
    setOpen(false);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className="flex min-w-44 items-center gap-2.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 transition-colors hover:bg-zinc-100 sm:min-w-52"
        aria-label="منوی کاربر"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-medium text-white">
          {getInitials(mockAdmin.fullName)}
        </span>
        <div className="min-w-0 flex-1 text-start">
          <p className="truncate text-sm font-medium text-zinc-900">{mockAdmin.fullName}</p>
          <p className="truncate text-xs text-zinc-500">{roleLabel(mockAdmin.role)}</p>
        </div>
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 text-zinc-400 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="absolute end-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg">
          <div className="border-b border-zinc-100 px-4 py-3">
            <p className="text-sm font-semibold text-zinc-900">{mockAdmin.fullName}</p>
            <p className="mt-0.5 text-xs text-zinc-500">{roleLabel(mockAdmin.role)}</p>
            <p className="mt-1 text-xs text-zinc-400">{mockAdmin.email}</p>
          </div>

          <ul className="p-1.5">
            {menuItems.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100"
                  onClick={() => setOpen(false)}
                >
                  <Icon className="h-4 w-4 text-zinc-400" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-zinc-100 p-1.5">
            <button
              type="button"
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              {common.logout}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
