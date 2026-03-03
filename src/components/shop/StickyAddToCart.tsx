"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/components/cart/CartProvider";
import type { Product, ProductVariant } from "@/lib/shopify";

interface StickyAddToCartProps {
  product: Product;
  selectedVariant: ProductVariant | null;
  showAfterScroll?: number; // Pixels to scroll before showing
}

export function StickyAddToCart({
  product,
  selectedVariant,
  showAfterScroll = 400,
}: StickyAddToCartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfterScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfterScroll]);

  const handleAddToCart = async () => {
    if (!selectedVariant || !selectedVariant.availableForSale) return;

    setIsAdding(true);
    try {
      const cartItem = {
        id: product.id,
        variantId: selectedVariant.id,
        productId: product.id,
        title: product.title,
        variantTitle: selectedVariant.title || selectedVariant.selectedOptions.map(o => o.value).join(" / "),
        image: product.featuredImage?.url || "",
        price: selectedVariant.price,
        handle: product.handle,
      };
      addItem(cartItem, 1);
      openCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const isAvailable = selectedVariant?.availableForSale ?? false;
  const price = selectedVariant?.price ?? product.price;

  return (
    <>
      {/* Desktop Sticky Bar */}
      <div className={cn(
        "hidden md:block fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}>
        <div className="bg-black border-t border-gold">
          <div className="container-wide py-4">
            <div className="flex items-center justify-between gap-6">
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center">
                  <span className="text-gold text-xs font-bold">VG</span>
                </div>
                <div>
                  <p className="text-white font-bold line-clamp-1">{product.title}</p>
                  <p className="text-gold font-bold">{formatPrice(price)}</p>
                </div>
              </div>

              {/* Variant Info */}
              {selectedVariant && selectedVariant.selectedOptions.length > 0 && (
                <div className="hidden lg:flex items-center gap-4 text-sm text-white/60">
                  {selectedVariant.selectedOptions.map((option) => (
                    <span key={option.name}>
                      {option.name}: <span className="text-white">{option.value}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!isAvailable || isAdding}
                className={cn(
                  "px-8 py-3 font-bold uppercase tracking-wider text-sm transition-colors",
                  isAvailable
                    ? "bg-gold text-black hover:bg-white"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                )}
              >
                {isAdding ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Wird hinzugefügt...
                  </span>
                ) : isAvailable ? (
                  "In den Warenkorb"
                ) : (
                  "Ausverkauft"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Button */}
      <div className={cn(
        "md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 safe-area-inset-bottom",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}>
        <div className="bg-black p-4 border-t border-gold">
          <div className="flex items-center gap-4">
            {/* Price */}
            <div className="flex-shrink-0">
              <p className="text-gold text-xl font-black">
                {formatPrice(price)}
              </p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!isAvailable || isAdding}
              className={cn(
                "flex-1 py-4 font-bold uppercase tracking-wider text-sm transition-colors",
                isAvailable
                  ? "bg-gold text-black active:bg-white"
                  : "bg-gray-600 text-gray-400"
              )}
            >
              {isAdding ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Wird hinzugefügt
                </span>
              ) : isAvailable ? (
                "Jetzt kaufen"
              ) : (
                "Ausverkauft"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for mobile to prevent content being hidden */}
      <div className={cn(
        "md:hidden h-20 transition-all duration-300",
        isVisible ? "opacity-100" : "opacity-0 h-0"
      )} />
    </>
  );
}

// Floating Add to Cart (Alternative Style)
export function FloatingAddToCart({
  product,
  selectedVariant,
}: {
  product: Product;
  selectedVariant: ProductVariant | null;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const { addItem, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = async () => {
    if (!selectedVariant?.availableForSale) return;
    const cartItem = {
      id: product.id,
      variantId: selectedVariant.id,
      productId: product.id,
      title: product.title,
      variantTitle: selectedVariant.title || selectedVariant.selectedOptions.map(o => o.value).join(" / "),
      image: product.featuredImage?.url || "",
      price: selectedVariant.price,
      handle: product.handle,
    };
    addItem(cartItem, 1);
    openCart();
  };

  if (!selectedVariant?.availableForSale) return null;

  return (
    <button
      onClick={handleClick}
      className={cn(
        "fixed bottom-8 right-8 z-50 w-14 h-14 bg-gold text-black shadow-lg transition-all duration-300",
        "hover:bg-black hover:text-gold hover:border-2 hover:border-gold",
        "flex items-center justify-center",
        isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
      )}
    >
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="square" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </button>
  );
}
