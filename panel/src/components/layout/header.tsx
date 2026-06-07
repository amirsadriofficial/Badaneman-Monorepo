"use client";

import { Bell, LogOut, Menu, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { common } from "@/lib/locale/fa";
import { mockAdmin } from "@/lib/mock-data";
import { roleLabel } from "@/lib/permissions";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-zinc-200 bg-white px-4 md:h-16 md:gap-4 md:px-6">
      <Button
        variant="ghost"
        size="sm"
        className="shrink-0 md:hidden"
        onClick={onMenuClick}
        aria-label={common.menu}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="relative min-w-0 flex-1">
        <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <Input placeholder={common.search} className="ps-9" />
      </div>

      <div className="flex shrink-0 items-center gap-2 md:gap-4">
        <Button variant="ghost" size="sm" className="relative px-2" aria-label="اعلان‌ها">
          <Bell className="h-5 w-5" />
          <span className="absolute -end-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            ۳
          </span>
        </Button>
        <div className="hidden text-start sm:block">
          <p className="text-sm font-medium text-zinc-900">{mockAdmin.fullName}</p>
          <p className="text-xs text-zinc-500">{roleLabel(mockAdmin.role)}</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout} className="px-2 sm:px-3">
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">{common.logout}</span>
        </Button>
      </div>
    </header>
  );
}
