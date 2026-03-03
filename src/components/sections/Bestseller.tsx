"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/shopify";

interface BestsellerProps {
  product?: Product;
}

export function Bestseller({ product }: BestsellerProps) {
  const [sectionRef, isVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.15 });

  const displayProduct = product || {
    handle: "bianco-neve",
    title: "Bianco Neve",
    price: 15.9,
    featuredImage: {
      url: "/images/vibe/wine-vibe-1.jpg",
      altText: "Bianco Neve",
      width: 800,
      height: 1000,
    },
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -z-10" />

      <div className="container-wide">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Main product image - large */}
          <div className={cn(
            "col-span-12 md:col-span-5 relative transition-all duration-1000",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          )}>
            <div className="relative aspect-[3/4]">
              <Image
                src={displayProduct.featuredImage?.url || "/images/vibe/wine-vibe-1.jpg"}
                alt={displayProduct.featuredImage?.altText || displayProduct.title}
                fill
                className="object-cover"
              />
              {/* Decorative border */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold -z-10" />
            </div>
          </div>

          {/* Content + landscape image column */}
          <div className="col-span-12 md:col-span-7 flex flex-col gap-4 md:gap-6">
            {/* Content */}
            <div className={cn(
              "flex-1 flex flex-col justify-center pl-0 md:pl-8 transition-all duration-1000 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              {/* Label */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-gold" />
                <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">
                  Bestseller
                </span>
              </div>

              {/* Title */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-2 leading-none">
                {displayProduct.title}
              </h2>

              <p className="text-gray-500 text-sm uppercase tracking-[0.2em] mb-6">
                Blanc de Blancs 2023
              </p>

              {/* Tasting Notes */}
              <div className="flex flex-wrap gap-4 md:gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gold" />
                  <span className="text-sm text-gray-600">Zitrus & Blüten</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gold" />
                  <span className="text-sm text-gray-600">Frisch & Elegant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gold" />
                  <span className="text-sm text-gray-600">Fisch & Seafood</span>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl md:text-3xl font-black text-gold">
                    {formatPrice(displayProduct.price)}
                  </span>
                  <span className="text-gray-400 text-sm line-through">€19,90</span>
                </div>
                <Link href={`/shop/${displayProduct.handle}`} className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" fullWidth className="group">
                    <span>Jetzt Kaufen</span>
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="square" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button>
                </Link>
              </div>

              {/* Trust badges for mobile */}
              <div className="flex items-center gap-4 mt-6 text-gray-500 text-xs">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Kostenloser Versand ab 50€</span>
                </div>
              </div>
            </div>

            {/* Landscape vibe image */}
            <div className={cn(
              "relative aspect-[21/9] overflow-hidden transition-all duration-1000 delay-400",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <Image
                src="/images/vibe/wine-landscape-1.jpg"
                alt="Wine Experience"
                fill
                className="object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

              {/* Gold corners */}
              <div className="absolute top-3 left-3 w-6 h-px bg-gold" />
              <div className="absolute top-3 left-3 w-px h-6 bg-gold" />
              <div className="absolute bottom-3 right-3 w-6 h-px bg-gold" />
              <div className="absolute bottom-3 right-3 w-px h-6 bg-gold" />

              {/* Text */}
              <div className="absolute bottom-4 left-4">
                <span className="text-gold text-[10px] font-bold uppercase tracking-[0.2em]">
                  The Vinogang Experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
