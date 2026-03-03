"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const upcomingEvents = [
  {
    id: 1,
    title: "Vinogang Night",
    date: "15. März",
    year: "2025",
    location: "Berlin",
    image: "/images/vibe/insta-2.jpg",
    type: "Wine & Music",
  },
  {
    id: 2,
    title: "Wine & Beats",
    date: "22. März",
    year: "2025",
    location: "München",
    image: "/images/vibe/insta-3.jpg",
    type: "Tasting Event",
  },
];

export function EventsSection() {
  const [sectionRef, isVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white text-black relative overflow-hidden">
      {/* Animated marquee background */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 overflow-hidden whitespace-nowrap opacity-[0.03] pointer-events-none">
        <div className="animate-marquee inline-block">
          <span className="text-[20vw] font-black uppercase tracking-tighter">
            Events Events Events Events Events Events&nbsp;
          </span>
        </div>
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
              Wein ohne Staub, dafür mit Beat
            </span>
            <div className="w-12 h-px bg-gold" />
          </div>
          <h2 className="text-6xl md:text-8xl font-black leading-none mb-6">
            EVENTS
          </h2>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            Süffig, jung, laut – unsere Events sind Wein ohne Staub.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {upcomingEvents.map((event, index) => (
            <div
              key={event.id}
              className={cn(
                "group relative transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-6">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                {/* Date badge */}
                <div className="absolute top-6 left-6 bg-gold px-4 py-2">
                  <span className="text-black text-sm font-bold uppercase tracking-wider">
                    {event.date}
                  </span>
                </div>

                {/* Location badge */}
                <div className="absolute bottom-6 right-6 bg-black px-4 py-2">
                  <span className="text-white text-sm font-bold uppercase tracking-wider">
                    {event.location}
                  </span>
                </div>

                {/* Gold border on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-gray-400 text-xs uppercase tracking-[0.2em] mb-2 block">
                    {event.type}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight group-hover:text-gold transition-colors">
                    {event.title}
                  </h3>
                </div>
                <span className="text-gold font-bold text-lg">
                  {event.year}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={cn(
          "text-center mt-16 transition-all duration-1000 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <Link href="/events">
            <Button variant="primary" size="lg" className="group">
              <span>Alle Events entdecken</span>
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
      </div>
    </section>
  );
}
