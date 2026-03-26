"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function AgeVerification() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDenied, setShowDenied] = useState(false);

  useEffect(() => {
    // Check if user has already verified age
    const verified = localStorage.getItem("vinogang-age-verified");
    if (!verified) {
      setIsVisible(true);
      // Start animation after mount
      setTimeout(() => setIsAnimating(true), 100);
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem("vinogang-age-verified", "true");
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 500);
  };

  const handleDeny = () => {
    setShowDenied(true);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center transition-all duration-500",
        isAnimating ? "opacity-100" : "opacity-0"
      )}
      style={{ touchAction: "manipulation" }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black pointer-events-none" />

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large VINOGANG text - smaller on mobile */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.03]">
          <span className="text-[20vw] md:text-[30vw] font-black text-white uppercase tracking-tighter">
            VINOGANG
          </span>
        </div>

        {/* Gold corner accents - smaller on mobile */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8">
          <div className="w-12 md:w-20 h-0.5 md:h-1 bg-gold" />
          <div className="w-0.5 md:w-1 h-12 md:h-20 bg-gold" />
        </div>
        <div className="absolute top-4 right-4 md:top-8 md:right-8">
          <div className="w-12 md:w-20 h-0.5 md:h-1 bg-gold ml-auto" />
          <div className="w-0.5 md:w-1 h-12 md:h-20 bg-gold ml-auto" />
        </div>
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
          <div className="w-0.5 md:w-1 h-12 md:h-20 bg-gold" />
          <div className="w-12 md:w-20 h-0.5 md:h-1 bg-gold" />
        </div>
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
          <div className="w-0.5 md:w-1 h-12 md:h-20 bg-gold ml-auto" />
          <div className="w-12 md:w-20 h-0.5 md:h-1 bg-gold ml-auto" />
        </div>

        {/* Rotating border squares - hidden on mobile */}
        <div className="hidden md:block absolute top-20 right-20 w-64 h-64 border border-gold/10 rotate-45" />
        <div className="hidden md:block absolute bottom-20 left-20 w-48 h-48 border border-gold/10 -rotate-12" />
      </div>

      {/* Content */}
      <div
        className={cn(
          "relative z-10 max-w-lg mx-4 text-center transition-all duration-700 delay-200",
          isAnimating ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
        )}
      >
        {!showDenied ? (
          <>
            {/* Logo - smaller on mobile */}
            <div className="mb-6 md:mb-8">
              <Image
                src="/images/logo/logo-gold.png"
                alt="Vinogang"
                width={200}
                height={50}
                className="h-8 md:h-12 w-auto mx-auto"
              />
            </div>

            {/* 18+ Badge - smaller on mobile */}
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 md:mb-8 border-2 md:border-4 border-gold flex items-center justify-center">
              <span className="text-3xl md:text-4xl font-black text-gold">18+</span>
            </div>

            {/* Title - smaller on mobile */}
            <h2 className="text-2xl md:text-4xl font-black text-white mb-3 md:mb-4">
              BIST DU ALT GENUG?
            </h2>

            {/* Description - smaller on mobile */}
            <p className="text-white/60 mb-6 md:mb-10 text-sm md:text-lg px-4">
              Du musst mindestens 18 Jahre alt sein, um diese Seite zu betreten.
            </p>

            {/* Buttons - optimized for mobile touch */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button
                onClick={handleVerify}
                className="group relative px-6 py-3 md:px-10 md:py-4 bg-gold text-black font-bold uppercase tracking-wider text-xs md:text-sm hover:bg-white transition-colors overflow-hidden touch-manipulation active:scale-95"
              >
                <span className="relative z-10">Ja, ich bin 18+</span>
                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold uppercase tracking-wider text-xs md:text-sm">
                  Ja, ich bin 18+
                </span>
              </button>

              <button
                onClick={handleDeny}
                className="px-6 py-3 md:px-10 md:py-4 border-2 border-white/30 text-white/60 font-bold uppercase tracking-wider text-xs md:text-sm hover:border-white hover:text-white transition-colors touch-manipulation active:scale-95"
              >
                Nein
              </button>
            </div>

            {/* Legal note - better mobile size */}
            <p className="mt-6 md:mt-10 text-[10px] md:text-[11px] text-white/30 uppercase tracking-wider px-4">
              Mit dem Betreten bestätigst du, dass du das gesetzliche Mindestalter für Alkoholkonsum in deinem Land erreicht hast.
            </p>
          </>
        ) : (
          // Denied state - optimized for mobile
          <div className="py-6 md:py-8 px-4">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 md:mb-8 border-2 md:border-4 border-red-500 flex items-center justify-center">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white mb-3 md:mb-4">
              ZUGANG VERWEIGERT
            </h2>

            <p className="text-white/60 mb-6 md:mb-8 text-sm md:text-lg">
              Diese Seite ist nur für Personen ab 18 Jahren zugänglich.
            </p>

            <a
              href="https://www.google.com"
              className="inline-block px-6 py-3 md:px-10 md:py-4 bg-white/10 text-white font-bold uppercase tracking-wider text-xs md:text-sm hover:bg-white/20 transition-colors touch-manipulation active:scale-95"
            >
              Seite verlassen
            </a>
          </div>
        )}
      </div>

      {/* Bottom tagline */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.3em]">
          Genieße verantwortungsvoll
        </p>
      </div>
    </div>
  );
}
