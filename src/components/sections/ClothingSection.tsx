"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

// Static placeholder products for clothing (separate Shopify store)
const clothingProducts = [
  {
    handle: "communion-shirt",
    title: "Communion",
    subtitle: "T-Shirt",
    image: "/images/models/jesus-female-1.jpg",
    price: 35.0,
    colors: ["Weiß", "Schwarz"],
  },
  {
    handle: "reben-shirt",
    title: "Reben",
    subtitle: "T-Shirt",
    image: "/images/models/reben-female-1.jpg",
    price: 35.0,
    colors: ["Weiß", "Schwarz"],
  },
  {
    handle: "barrel-shirt",
    title: "Barrel",
    subtitle: "T-Shirt",
    image: "/images/models/barrel-male-1.jpg",
    price: 35.0,
    colors: ["Weiß", "Schwarz"],
  },
];

export function ClothingSection() {
  const [sectionRef, isVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
      {/* Background accent pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-white rotate-45" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-white -rotate-12" />
      </div>

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className={cn(
          "flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-gold" />
              <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">
                Collection 2025
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black leading-none">
              Wear the<br />
              <span className="text-gold">Movement</span>
            </h2>
          </div>
          <a
            href="https://clothing.vinogang.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline-gold" className="group">
              <span>Zum Clothing Shop</span>
              <svg
                className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="square" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </a>
        </div>

        {/* Product Grid - Asymmetric layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {clothingProducts.map((product, index) => (
            <a
              key={product.handle}
              href="https://clothing.vinogang.com"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group block transition-all duration-700",
                index === 0 ? "md:col-span-6" : "md:col-span-3",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              <div className={cn(
                "relative overflow-hidden bg-gray-900",
                index === 0 ? "aspect-[4/5]" : "aspect-[3/4]"
              )}>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                {/* Gold border on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold transition-all duration-300" />

                {/* Product info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight group-hover:text-gold transition-colors">
                        {product.title}
                      </h3>
                      <span className="text-white/60 text-sm uppercase tracking-[0.1em]">
                        {product.subtitle}
                      </span>
                    </div>
                    <span className="text-gold text-xl font-bold">
                      €{product.price.toFixed(0)}
                    </span>
                  </div>
                </div>

                {/* Color options indicator */}
                <div className="absolute top-6 left-6 flex gap-2">
                  {product.colors.map((color) => (
                    <div
                      key={color}
                      className={cn(
                        "w-4 h-4 border border-white/50",
                        color === "Weiß" ? "bg-white" : "bg-black"
                      )}
                      title={color}
                    />
                  ))}
                </div>

                {/* View indicator */}
                <div className="absolute top-6 right-6 w-10 h-10 border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-gold">
                  <svg
                    className="w-4 h-4 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="square" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Statement */}
        <div className={cn(
          "mt-16 md:mt-24 text-center transition-all duration-1000 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <p className="text-white/40 text-sm uppercase tracking-[0.3em]">
            Urban. Jung. Laut. Gemeinschaft.
          </p>
        </div>
      </div>
    </section>
  );
}
