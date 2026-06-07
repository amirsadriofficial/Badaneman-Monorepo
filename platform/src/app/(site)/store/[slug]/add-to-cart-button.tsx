"use client";

import { Button } from "@/components/ui/button";

export function AddToCartButton({ productId, label }: { productId: string; label: string }) {
  return (
    <Button
      className="flex-1"
      onClick={() => {
        const existing = JSON.parse(localStorage.getItem("cart") ?? "[]") as { id: string; quantity: number }[];
        const item = existing.find((i) => i.id === productId);
        if (item) {
          item.quantity += 1;
        } else {
          existing.push({ id: productId, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(existing));
        window.location.href = "/store/cart";
      }}
    >
      {label}
    </Button>
  );
}
