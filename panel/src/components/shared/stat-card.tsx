import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  variant?: "default" | "warning";
}

export function StatCard({ title, value, icon: Icon, trend, variant = "default" }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-3 p-4 sm:p-5">
        <div className="min-w-0">
          <p className="text-xs text-zinc-500 sm:text-sm">{title}</p>
          <p className="mt-1 text-xl font-bold text-zinc-900 sm:text-2xl">{value}</p>
          {trend && <p className="mt-1 text-xs text-zinc-400">{trend}</p>}
        </div>
        <div
          className={cn(
            "shrink-0 rounded-lg p-2 sm:p-2.5",
            variant === "warning" ? "bg-amber-100 text-amber-700" : "bg-zinc-100 text-zinc-600",
          )}
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
