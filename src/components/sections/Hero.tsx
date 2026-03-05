"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPromo, setShowPromo] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const quote = "The most expensive bottle of wine is worthless if you have to drink it alone";

  return (
    <>
    <section className="relative min-h-[85vh] md:min-h-[90vh] bg-white overflow-hidden">
      {/* Mobile Hero Image Background - Full viewport width */}
      <div className="absolute inset-0 z-0 lg:hidden">
        <Image
          src="/images/hero.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
      </div>

      {/* Gold Gradient Background Elements - Desktop only */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
        {/* Top right gold gradient blob */}
        <div
          className="absolute -top-20 -right-20 w-[500px] h-[500px] blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(221,181,91,0.5) 0%, rgba(221,181,91,0.2) 40%, transparent 70%)' }}
        />
        {/* Bottom left gold gradient blob */}
        <div
          className="absolute -bottom-32 -left-32 w-[600px] h-[600px] blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(221,181,91,0.4) 0%, rgba(221,181,91,0.15) 40%, transparent 70%)' }}
        />
        {/* Center glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-3xl"
          style={{ background: 'radial-gradient(ellipse, rgba(221,181,91,0.15) 0%, transparent 60%)' }}
        />
        {/* Diagonal gold line accent */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-50"
          style={{ background: 'linear-gradient(135deg, transparent 0%, rgba(221,181,91,0.2) 50%, transparent 100%)' }}
        />
      </div>

      {/* Gold Watermark Logo - Bottom Right */}
      <div className="absolute bottom-24 md:bottom-20 right-8 md:right-16 z-10 opacity-10 pointer-events-none hidden lg:block">
        <Image
          src="/images/logo/logo-gold.png"
          alt=""
          width={300}
          height={75}
          className="w-72 h-auto"
        />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10 min-h-[85vh] md:min-h-[90vh] flex flex-col">
        {/* Mobile Layout */}
        <div className="lg:hidden relative flex flex-col min-h-[85vh]">

          {/* Content */}
          <div className="relative z-10 flex-1 flex flex-col justify-center text-center px-4 pt-16 pb-20">
            {/* Header */}
            <div className={cn(
              "mb-6 transition-all duration-700 delay-100",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-px bg-gold" />
                <span className="text-gold text-[10px] font-bold uppercase tracking-[0.3em]">
                  Urban Wine Collective
                </span>
                <div className="w-12 h-px bg-gold" />
              </div>
              <Image
                src="/images/logo/logo-gold.png"
                alt="Vinogang"
                width={400}
                height={100}
                className="w-64 h-auto mx-auto"
                priority
              />
            </div>

            {/* Tagline */}
            <p className={cn(
              "text-gray-600 text-lg mb-8 transition-all duration-700 delay-200",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              Perfekt für den Sommer.<br />
              <span className="text-gold font-bold">Urban. Jung. Laut.</span>
            </p>

            {/* CTAs */}
            <div className={cn(
              "flex flex-col gap-3 w-full max-w-xs mx-auto transition-all duration-700 delay-300",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <Link href="/shop" className="w-full">
                <Button variant="primary" size="lg" fullWidth>
                  Shop Collection
                </Button>
              </Link>
              <Link href="/events" className="w-full">
                <Button variant="secondary" size="lg" fullWidth>
                  Events
                </Button>
              </Link>
            </div>
          </div>

        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex min-h-[90vh] items-center">
          <div className="grid grid-cols-2 gap-16 w-full py-12">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              {/* Gold accent */}
              <div className={cn(
                "flex items-center gap-4 mb-8 transition-all duration-700",
                isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              )}>
                <div className="w-16 h-1 bg-gold" />
                <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">
                  Urban Wine Collective
                </span>
              </div>

              <div className={cn(
                "mb-8 transition-all duration-700 delay-100",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}>
                <Image
                  src="/images/logo/logo-gold.png"
                  alt="Vinogang"
                  width={500}
                  height={125}
                  className="w-80 xl:w-96 h-auto"
                  priority
                />
              </div>

              <p className={cn(
                "text-gray-600 text-xl max-w-md mb-10 transition-all duration-700 delay-200 leading-relaxed",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}>
                Perfekt für den Sommer.<br />
                <span className="text-gold font-bold">Urban. Jung. Laut. Gemeinschaft.</span>
              </p>

              {/* CTAs */}
              <div className={cn(
                "flex flex-wrap gap-4 transition-all duration-700 delay-300",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}>
                <Link href="/shop">
                  <Button variant="primary" size="lg">
                    Shop Collection
                  </Button>
                </Link>
                <Link href="/events">
                  <Button variant="secondary" size="lg">
                    Events
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right - Video */}
            <div className={cn(
              "relative transition-all duration-1000 delay-300",
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}>
              {/* Gold corners */}
              <div className="absolute -top-2 -left-2 w-16 h-1 bg-gold z-10" />
              <div className="absolute -top-2 -left-2 w-1 h-16 bg-gold z-10" />
              <div className="absolute -bottom-2 -right-2 w-16 h-1 bg-gold z-10" />
              <div className="absolute -bottom-2 -right-2 w-1 h-16 bg-gold z-10" />

              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/videos/socialmedia.mp4" type="video/mp4" />
                </video>

                {/* Label */}
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <div className="w-2 h-2 bg-gold animate-pulse" />
                  <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">
                    Vinogang Lifestyle
                  </span>
                </div>
              </div>

              {/* Decorative offset border */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold/30 -z-10 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Animated Quote Marquee - At the bottom of Hero */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 z-30 overflow-hidden transition-all duration-1000",
        isLoaded ? "opacity-100" : "opacity-0"
      )} style={{ transitionDelay: "600ms" }}>
        <div className="bg-gold py-4 md:py-5">
          <div className="animate-marquee whitespace-nowrap flex">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="mx-8 md:mx-16 text-black font-black text-base md:text-2xl uppercase tracking-wider">
                {quote}
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>

    {/* Mobile Promo Popup - Disabled for now */}
    {/* {showPromo && (
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-[100] transition-all duration-500 lg:hidden",
        isLoaded ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )} style={{ transitionDelay: "800ms" }}>
        <div className="bg-white border-t-2 border-gold shadow-2xl">
          <button
            onClick={() => setShowPromo(false)}
            className="absolute -top-3 right-3 w-8 h-8 flex items-center justify-center bg-black text-white hover:bg-gold hover:text-black transition-colors z-10 shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-end px-4 pt-3 pb-4">
            <div className="relative -mt-16 mr-4 flex-shrink-0">
              <Image
                src="/images/products/wine-bottle-cutout.png"
                alt="Bianco Neve"
                width={60}
                height={180}
                className="object-contain drop-shadow-lg"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-gold text-black text-[10px] font-bold uppercase">Angebot</span>
              </div>
              <p className="text-black text-sm font-bold truncate">Bianco Neve 2023</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-400 text-sm line-through">€15,90</span>
                <span className="text-gold text-lg font-black">€13,90</span>
              </div>
            </div>

            <Link
              href="/shop/vino-gang-x-weingut-kopp-bianco-neve-blanc-de-blancs-2023-weisswein"
              className="flex-shrink-0 ml-2"
            >
              <div className="px-4 py-3 bg-gold text-black text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-gold transition-colors">
                Kaufen
              </div>
            </Link>
          </div>
        </div>
      </div>
    )} */}
    </>
  );
}
