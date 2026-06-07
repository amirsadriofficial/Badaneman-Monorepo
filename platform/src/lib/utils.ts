import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium" }).format(new Date(date));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}
