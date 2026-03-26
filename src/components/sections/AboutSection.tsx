"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const founders = [
  {
    name: "Jakob Bimmerle",
    role: "Co-Founder",
    initials: "JB",
    quote: "Wein verbindet Menschen.",
    image: "/images/gründer/jakob_bimmerle.jpeg",
  },
  {
    name: "Marc Keitel",
    role: "Co-Founder",
    initials: "MK",
    quote: "Qualität ohne Kompromisse.",
    image: "/images/gründer/marc_keitel.jpeg",
  },
  {
    name: "Kevin Gradito",
    role: "Co-Founder",
    initials: "KG",
    quote: "Community ist alles.",
    image: "/images/gründer/kevin_gradito.jpg",
  },
];

export function AboutSection() {
  const [sectionRef, isVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.02] pointer-events-none">
        <span className="text-[20vw] font-black uppercase tracking-tighter">
          GANG
        </span>
      </div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className={cn(
          "text-center mb-20 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gold" />
            <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">
              Die Gründer
            </span>
            <div className="w-12 h-px bg-gold" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black leading-none mb-6">
            Über <span className="text-gold">Uns</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Drei Freunde, eine Vision: Wein neu denken. Urban, jung und ohne Staub.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              className={cn(
                "group relative transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              {/* Founder Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-black mb-6">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />

                {/* Decorative corners */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="w-6 h-px bg-gold/30 group-hover:bg-gold/60 transition-colors" />
                  <div className="w-px h-6 bg-gold/30 group-hover:bg-gold/60 transition-colors" />
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <div className="w-6 h-px bg-gold/30 group-hover:bg-gold/60 transition-colors ml-auto" />
                  <div className="w-px h-6 bg-gold/30 group-hover:bg-gold/60 transition-colors ml-auto" />
                </div>
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="w-px h-6 bg-gold/30 group-hover:bg-gold/60 transition-colors" />
                  <div className="w-6 h-px bg-gold/30 group-hover:bg-gold/60 transition-colors" />
                </div>
                <div className="absolute bottom-4 right-4 z-10">
                  <div className="w-px h-6 bg-gold/30 group-hover:bg-gold/60 transition-colors ml-auto" />
                  <div className="w-6 h-px bg-gold/30 group-hover:bg-gold/60 transition-colors ml-auto" />
                </div>

                {/* Gold border on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold transition-all duration-300 z-10" />

                {/* Quote on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                  <p className="text-gold text-lg md:text-xl italic text-center px-8">
                    &ldquo;{founder.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-xl font-bold mb-1 group-hover:text-gold transition-colors">
                  {founder.name}
                </h3>
                <span className="text-gray-400 text-sm uppercase tracking-[0.15em]">
                  {founder.role}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom statement */}
        <div className={cn(
          "mt-20 text-center transition-all duration-1000 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="inline-block">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">
                Seit 2023
              </span>
              <div className="w-8 h-px bg-gold" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-black">
              &ldquo;The most expensive bottle of wine is worthless<br />
              <span className="text-gold">if you have to drink it alone.&rdquo;</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
