"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const founders = [
  {
    name: "Jakob Bimmerle",
    role: "Co-Founder",
    initials: "JB",
    quote: "Wein verbindet Menschen.",
  },
  {
    name: "Mark Keitel",
    role: "Co-Founder",
    initials: "MK",
    quote: "Qualität ohne Kompromisse.",
  },
  {
    name: "Kevin Gradito",
    role: "Co-Founder",
    initials: "KG",
    quote: "Community ist alles.",
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
              {/* Placeholder Avatar */}
              <div className="relative aspect-[3/4] overflow-hidden bg-black mb-6 group-hover:bg-gray-900 transition-colors duration-300">
                {/* Initials */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl md:text-7xl font-black text-gold/20 group-hover:text-gold/40 transition-colors duration-300">
                    {founder.initials}
                  </span>
                </div>

                {/* Person Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Head */}
                    <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-gold/50 group-hover:border-gold transition-colors duration-300 flex items-center justify-center mb-2">
                      <svg
                        className="w-10 h-10 md:w-12 md:h-12 text-gold/50 group-hover:text-gold transition-colors duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="square"
                          strokeWidth={1.5}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Decorative corners */}
                <div className="absolute top-4 left-4">
                  <div className="w-6 h-px bg-gold/30 group-hover:bg-gold/60 transition-colors" />
                  <div className="w-px h-6 bg-gold/30 group-hover:bg-gold/60 transition-colors" />
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-px bg-gold/30 group-hover:bg-gold/60 transition-colors ml-auto" />
                  <div className="w-px h-6 bg-gold/30 group-hover:bg-gold/60 transition-colors ml-auto" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-px h-6 bg-gold/30 group-hover:bg-gold/60 transition-colors" />
                  <div className="w-6 h-px bg-gold/30 group-hover:bg-gold/60 transition-colors" />
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="w-px h-6 bg-gold/30 group-hover:bg-gold/60 transition-colors ml-auto" />
                  <div className="w-6 h-px bg-gold/30 group-hover:bg-gold/60 transition-colors ml-auto" />
                </div>

                {/* Gold border on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold transition-all duration-300" />

                {/* Quote on hover */}
                <div className="absolute bottom-8 left-6 right-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <p className="text-gold text-sm italic text-center">
                    &ldquo;{founder.quote}&rdquo;
                  </p>
                </div>

                {/* "Foto folgt" label */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-gold/10 border border-gold/30">
                  <span className="text-[10px] text-gold/60 uppercase tracking-[0.2em]">Foto folgt</span>
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
