"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    totalItems,
    totalPrice,
    isOpen,
    isLoading,
    closeCart,
    removeItem,
    updateQuantity,
    checkout,
  } = useCart();

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 transition-transform duration-300 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold uppercase tracking-wider">
            Warenkorb ({totalItems})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:text-gold transition-colors"
            aria-label="Close cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-16 h-16 text-gray-300 mb-4"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <p className="text-gray-500 mb-4">Dein Warenkorb ist leer</p>
              <Button variant="secondary" size="sm" onClick={closeCart}>
                Weiter shoppen
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-4">
                  {/* Image */}
                  <Link
                    href={`/shop/${item.handle}`}
                    onClick={closeCart}
                    className="relative w-24 h-24 bg-gray-100 flex-shrink-0"
                  >
                    <Image
                      src={item.image || "/images/placeholder.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/shop/${item.handle}`}
                      onClick={closeCart}
                      className="font-bold text-sm uppercase tracking-wide hover:text-gold transition-colors line-clamp-2"
                    >
                      {item.title}
                    </Link>
                    {item.variantTitle && (
                      <p className="text-xs text-gray-500 mt-1">
                        {item.variantTitle}
                      </p>
                    )}
                    <p className="text-sm font-bold text-gold mt-2">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-gray-300">
                        <button
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-xs text-gray-500 hover:text-red-500 transition-colors underline"
                      >
                        Entfernen
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm uppercase tracking-wider">
                Zwischensumme
              </span>
              <span className="text-lg font-bold">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-xs text-gray-500">
              Versandkosten werden beim Checkout berechnet
            </p>
            <Button
              variant="primary"
              fullWidth
              onClick={checkout}
              disabled={isLoading}
            >
              {isLoading ? "Laden..." : "Zur Kasse"}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
