"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    // Don't show again for this session
    sessionStorage.setItem("vinogang-exit-popup-shown", "true");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // TODO: Integrate with Klaviyo/Shopify Email
    // For now, we'll just simulate submission
    try {
      // Placeholder for actual API call
      console.log("Newsletter signup:", email);
      setIsSubmitted(true);

      // Store in localStorage that user has signed up
      localStorage.setItem("vinogang-newsletter-subscribed", "true");

      // Close popup after 3 seconds
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      console.error("Newsletter signup error:", error);
    }
  };

  useEffect(() => {
    // Check if already shown this session or user is already subscribed
    const alreadyShown = sessionStorage.getItem("vinogang-exit-popup-shown");
    const alreadySubscribed = localStorage.getItem("vinogang-newsletter-subscribed");

    if (alreadyShown || alreadySubscribed) {
      return;
    }

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from top
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    // Scroll depth trigger (backup for mobile)
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        // Show after 70% scroll on mobile
        if (scrollPercent > 70 && !hasShown && window.innerWidth < 768) {
          setIsVisible(true);
          setHasShown(true);
        }
      }, 500);
    };

    // Add delay before enabling exit intent
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("scroll", handleScroll);
    }, 5000); // 5 second delay

    return () => {
      clearTimeout(timer);
      clearTimeout(scrollTimeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasShown]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isVisible) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isVisible, handleClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className={cn(
        "relative w-full max-w-lg bg-black border-2 border-gold",
        "transform transition-all duration-500",
        isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
      )}>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-8 md:p-12">
          {!isSubmitted ? (
            <>
              {/* Logo */}
              <div className="mb-6 flex justify-center">
                <Image
                  src="/images/logo/logo-gold.png"
                  alt="Vinogang"
                  width={120}
                  height={30}
                  className="h-8 w-auto"
                />
              </div>

              {/* Headline */}
              <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-4">
                WERDE TEIL DER <span className="text-gold">GANG</span>
              </h2>

              {/* Subtext */}
              <p className="text-white/60 text-center mb-8">
                Erhalte Early Access zu neuen Drops, exklusiven Events und deinen persönlichen Rabattcode.
              </p>

              {/* Discount Badge */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gold px-6 py-2">
                  <span className="text-2xl font-black text-black">10%</span>
                  <span className="text-sm font-bold text-black uppercase">
                    Rabatt auf<br />deine erste<br />Bestellung
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Deine E-Mail Adresse"
                  required
                  className="w-full px-4 py-4 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-4 bg-gold text-black font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors"
                >
                  Rabattcode sichern
                </button>
              </form>

              {/* Legal */}
              <p className="mt-6 text-[10px] text-white/30 text-center">
                Mit der Anmeldung stimmst du unserer Datenschutzerklärung zu.
                Du kannst dich jederzeit abmelden.
              </p>

              {/* No thanks */}
              <button
                onClick={handleClose}
                className="w-full mt-4 text-white/40 text-xs hover:text-white/60 transition-colors"
              >
                Nein danke, ich möchte keinen Rabatt
              </button>
            </>
          ) : (
            // Success State
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-6 border-2 border-gold flex items-center justify-center">
                <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 className="text-2xl font-black text-white mb-4">
                WILLKOMMEN IN DER <span className="text-gold">GANG!</span>
              </h3>

              <p className="text-white/60 mb-6">
                Dein Rabattcode ist unterwegs zu deinem Postfach.
              </p>

              <div className="inline-block bg-white/10 px-6 py-3 border border-gold">
                <span className="text-gold font-mono font-bold text-lg">GANG10</span>
              </div>

              <p className="mt-4 text-white/40 text-sm">
                Verwende diesen Code an der Kasse
              </p>
            </div>
          )}
        </div>

        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold" />
      </div>
    </div>
  );
}
