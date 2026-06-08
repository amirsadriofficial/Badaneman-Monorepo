"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { common, notificationTypes } from "@/lib/locale/fa";
import { notifications } from "@/lib/mock-data";
import { formatDate, formatNumber } from "@/lib/utils";

const typeColors: Record<string, string> = {
  membership: "bg-blue-100 text-blue-800",
  reservation: "bg-purple-100 text-purple-800",
  order: "bg-orange-100 text-orange-800",
  recruitment: "bg-emerald-100 text-emerald-800",
};

const unreadNotifications = notifications.filter((n) => !n.read);

export function NotificationDropdown() {
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

  const unreadCount = unreadNotifications.length;

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="relative px-2"
        aria-label="اعلان‌ها"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -end-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] text-white">
            {formatNumber(unreadCount)}
          </span>
        )}
      </Button>

      {open && (
        <div className="absolute end-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
            <p className="text-sm font-semibold text-zinc-900">اعلان‌های خوانده‌نشده</p>
            {unreadCount > 0 && (
              <Badge className="bg-red-100 text-red-700">{formatNumber(unreadCount)} مورد</Badge>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {unreadNotifications.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-zinc-500">اعلان خوانده‌نشده‌ای ندارید.</p>
            ) : (
              <ul className="divide-y divide-zinc-100">
                {unreadNotifications.map((n) => (
                  <li key={n.id} className="px-4 py-3 hover:bg-zinc-50">
                    <div className="flex items-center gap-2">
                      <Badge className={typeColors[n.type]}>{notificationTypes[n.type] ?? n.type}</Badge>
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900" />
                    </div>
                    <p className="mt-1.5 text-sm font-medium text-zinc-900">{n.title}</p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-zinc-500">{n.message}</p>
                    <p className="mt-1.5 text-xs text-zinc-400">{formatDate(n.createdAt)}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-zinc-100 p-2">
            <Link
              href="/notifications"
              className="block rounded-lg px-3 py-2 text-center text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
              onClick={() => setOpen(false)}
            >
              {common.viewAll}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
