import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { statusLabel } from "@/lib/locale/fa";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        className,
      )}
      {...props}
    />
  );
}

export function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending_review: "bg-amber-100 text-amber-800",
    pending: "bg-amber-100 text-amber-800",
    approved: "bg-blue-100 text-blue-800",
    confirmed: "bg-blue-100 text-blue-800",
    activated: "bg-emerald-100 text-emerald-800",
    completed: "bg-emerald-100 text-emerald-800",
    rejected: "bg-red-100 text-red-800",
    preparing: "bg-purple-100 text-purple-800",
    ready_for_pickup: "bg-indigo-100 text-indigo-800",
    shipped: "bg-cyan-100 text-cyan-800",
    new: "bg-sky-100 text-sky-800",
    under_review: "bg-amber-100 text-amber-800",
    interview: "bg-violet-100 text-violet-800",
    hired: "bg-emerald-100 text-emerald-800",
    open: "bg-emerald-100 text-emerald-800",
    closed: "bg-red-100 text-red-800",
    holiday: "bg-orange-100 text-orange-800",
    maintenance: "bg-yellow-100 text-yellow-800",
    delivered: "bg-emerald-100 text-emerald-800",
    failed: "bg-red-100 text-red-800",
  };

  return (
    <Badge className={cn(colors[status] ?? "bg-zinc-100 text-zinc-700")}>
      {statusLabel(status)}
    </Badge>
  );
}
