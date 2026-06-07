"use client";

import { Menu, Moon, ShoppingCart, Sun, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { navigation } from "@/lib/navigation";
import { common } from "@/lib/locale/fa";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
            ب
          </div>
          <span className="text-lg font-bold">بدن‌من</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="تغییر تم"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link href="/store/cart" className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          <Link href="/login" className="hidden sm:block">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4" />
              {common.login}
            </Button>
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="منو"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <>
          <button type="button" className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setOpen(false)} aria-label="بستن" />
          <div className="fixed inset-y-0 start-0 z-50 w-72 max-w-[85vw] border-e border-border bg-background p-4 shadow-xl lg:hidden">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-bold">منو</span>
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-2 hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm",
                    pathname === item.href ? "bg-primary/10 text-primary" : "hover:bg-muted",
                  )}
                >
                  {item.title}
                </Link>
              ))}
              <Link href="/login" onClick={() => setOpen(false)} className="mt-2">
                <Button className="w-full">{common.login}</Button>
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
