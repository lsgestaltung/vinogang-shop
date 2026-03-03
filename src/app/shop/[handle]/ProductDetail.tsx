"use client";

import { useState, useMemo } from "react";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { VariantSelector } from "@/components/shop/VariantSelector";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { formatPrice } from "@/lib/utils";
import type { Product, ProductVariant } from "@/lib/shopify";

interface ProductDetailProps {
  product: Product;
  isWine?: boolean;
}

export function ProductDetail({ product, isWine = false }: ProductDetailProps) {
  // Initialize selected options from first available variant
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () => {
      const firstAvailableVariant = product.variants.find(
        (v) => v.availableForSale
      );
      if (firstAvailableVariant) {
        return firstAvailableVariant.selectedOptions.reduce(
          (acc, opt) => ({ ...acc, [opt.name]: opt.value }),
          {}
        );
      }
      return product.options.reduce(
        (acc, opt) => ({ ...acc, [opt.name]: opt.values[0] }),
        {}
      );
    }
  );

  // Find the selected variant
  const selectedVariant = useMemo<ProductVariant | null>(() => {
    return (
      product.variants.find((variant) =>
        variant.selectedOptions.every(
          (opt) => selectedOptions[opt.name] === opt.value
        )
      ) || null
    );
  }, [product.variants, selectedOptions]);

  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  };

  const currentPrice = selectedVariant?.price || product.price;
  const compareAtPrice = selectedVariant?.compareAtPrice || product.compareAtPrice;
  const hasDiscount = compareAtPrice && compareAtPrice > currentPrice;

  return (
    <section className="section">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <ProductGallery images={product.images} productTitle={product.title} />

          {/* Product Info */}
          <div className="lg:py-8">
            {/* Breadcrumb */}
            <span className="text-xs text-gray-500 uppercase tracking-[0.15em] mb-4 block">
              {product.productType || "Vinogang"}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-4">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-2xl font-bold text-gold">
                {formatPrice(currentPrice)}
              </span>
              {hasDiscount && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(compareAtPrice)}
                </span>
              )}
            </div>

            {/* Wine-specific: Tasting Notes */}
            {isWine && (
              <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-t border-b border-gray-200">
                <div>
                  <span className="text-xs uppercase tracking-[0.15em] text-gray-400 block mb-1">
                    Jahrgang
                  </span>
                  <span className="font-bold">2023</span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.15em] text-gray-400 block mb-1">
                    Rebsorte
                  </span>
                  <span className="font-bold">Blanc de Blancs</span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.15em] text-gray-400 block mb-1">
                    Weingut
                  </span>
                  <span className="font-bold">Kopp</span>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <div
                className="prose prose-sm max-w-none text-gray-600"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            </div>

            {/* Variant Selector */}
            {product.options.length > 0 &&
              !(
                product.options.length === 1 &&
                product.options[0].values.length === 1
              ) && (
                <div className="mb-8">
                  <VariantSelector
                    options={product.options}
                    variants={product.variants}
                    selectedOptions={selectedOptions}
                    onOptionChange={handleOptionChange}
                  />
                </div>
              )}

            {/* Add to Cart */}
            <div className="mb-8">
              <AddToCartButton product={product} variant={selectedVariant} />
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
                <span>Kostenloser Versand ab €50</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>14 Tage Rückgaberecht</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                <span>Sichere Bezahlung via Shopify</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
