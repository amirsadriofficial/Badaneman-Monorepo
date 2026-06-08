"use client";

import { Menu } from "lucide-react";
import { AdminMenu } from "@/components/layout/admin-menu";
import { NotificationDropdown } from "@/components/layout/notification-dropdown";
import { Button } from "@/components/ui/button";
import { common } from "@/lib/locale/fa";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
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

      <div className="ms-auto flex shrink-0 items-center gap-1 md:gap-2">
        <NotificationDropdown />
        <AdminMenu />
      </div>
    </header>
  );
}
