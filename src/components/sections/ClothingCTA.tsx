"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

// Clothing products
const clothingItems = [
  {
    name: "Communion",
    handle: "communion-shirt",
    image: "/images/models/jesus-female-1.jpg",
    price: "€35",
  },
  {
    name: "Reben",
    handle: "reben-shirt",
    image: "/images/models/reben-female-1.jpg",
    price: "€35",
  },
  {
    name: "Barrel",
    handle: "barrel-shirt",
    image: "/images/models/barrel-male-1.jpg",
    price: "€35",
  },
];

export function ClothingCTA() {
  const [sectionRef, isVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className="relative bg-black text-white overflow-hidden">
      {/* Full-width hero image */}
      <div className="relative h-[60vh] md:h-[70vh]">
        <Image
          src="/images/models/clothing-landscape-2.jpg"
          alt="Vinogang Clothing"
          fill
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />

        {/* Gold diagonal accent */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(221,181,91,0.3) 50%, transparent 60%)' }}
        />

        {/* Large Typography Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn(
            "text-center transition-all duration-1000",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-gold" />
              <span className="text-gold text-xs font-bold uppercase tracking-[0.4em]">
                Clothing
              </span>
              <div className="w-16 h-px bg-gold" />
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight">
              WEAR THE
            </h2>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight text-gold mt-2">
              MOVEMENT
            </h2>
            <p className="text-white/60 text-lg md:text-xl mt-6 max-w-md mx-auto px-4">
              Mehr als Kleidung. Ein Statement.
            </p>
          </div>
        </div>

        {/* Gold corner accents */}
        <div className="absolute top-8 left-8">
          <div className="w-12 h-px bg-gold" />
          <div className="w-px h-12 bg-gold" />
        </div>
        <div className="absolute bottom-8 right-8">
          <div className="w-12 h-px bg-gold" />
          <div className="w-px h-12 bg-gold absolute right-0 bottom-0" />
        </div>
      </div>

      {/* Product Strip */}
      <div className="bg-black py-12 md:py-16">
        <div className="container-wide">
          {/* Products row */}
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            {clothingItems.map((item, index) => (
              <Link
                key={item.name}
                href={`/shop/${item.handle}`}
                className={cn(
                  "group relative transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${(index + 2) * 150}ms` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  {/* Gold border on hover */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold transition-colors duration-300" />

                  {/* Product info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                    <h3 className="font-bold text-sm md:text-lg uppercase tracking-wider text-white group-hover:text-gold transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gold text-xs md:text-sm font-bold mt-1">{item.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className={cn(
            "text-center mt-10 transition-all duration-700 delay-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <Link
              href="/shop?collection=clothing"
              className="inline-flex items-center gap-4 group"
            >
              <span className="text-gold text-sm font-bold uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">
                Zur Collection
              </span>
              <div className="w-12 h-12 border-2 border-gold flex items-center justify-center group-hover:bg-gold transition-all">
                <svg
                  className="w-5 h-5 text-gold group-hover:text-black transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="square" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
