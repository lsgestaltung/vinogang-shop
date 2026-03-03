"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import type { Product, ProductVariant } from "@/lib/shopify";

interface AddToCartButtonProps {
  product: Product;
  variant: ProductVariant | null;
  quantity?: number;
  compact?: boolean;
}

export function AddToCartButton({
  product,
  variant,
  quantity = 1,
  compact = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!variant || !variant.availableForSale) return;

    setIsAdding(true);

    // Simulate a small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    addItem({
      id: product.id,
      variantId: variant.id,
      productId: product.id,
      title: product.title,
      variantTitle:
        variant.title !== "Default Title" ? variant.title : "",
      image: variant.image?.url || product.featuredImage?.url || "",
      price: variant.price,
      handle: product.handle,
    }, quantity);

    setIsAdding(false);
  };

  const isDisabled = !variant || !variant.availableForSale || isAdding;

  return (
    <Button
      variant="primary"
      size={compact ? "md" : "lg"}
      fullWidth={!compact}
      onClick={handleAddToCart}
      disabled={isDisabled}
      className={compact ? "whitespace-nowrap" : ""}
    >
      {isAdding
        ? "Wird hinzugefügt..."
        : !variant
          ? "Variante wählen"
          : !variant.availableForSale
            ? "Ausverkauft"
            : compact
              ? "Kaufen"
              : "In den Warenkorb"}
    </Button>
  );
}
