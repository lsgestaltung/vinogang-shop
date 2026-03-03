"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Bestseller Badge
export function BestsellerBadge({ className }: { className?: string }) {
  return (
    <div className={cn(
      "absolute top-4 left-4 z-10 bg-gold px-3 py-1.5",
      className
    )}>
      <span className="text-[10px] font-bold text-black uppercase tracking-[0.15em]">
        Bestseller
      </span>
    </div>
  );
}

// Limited Edition Badge
export function LimitedBadge({ className }: { className?: string }) {
  return (
    <div className={cn(
      "absolute top-4 right-4 z-10 bg-black border border-gold px-3 py-1.5",
      className
    )}>
      <span className="text-[10px] font-bold text-gold uppercase tracking-[0.15em]">
        Limitiert
      </span>
    </div>
  );
}

// Low Stock Warning
interface LowStockProps {
  quantity?: number;
  threshold?: number;
}

export function LowStockWarning({ quantity = 5, threshold = 10 }: LowStockProps) {
  if (quantity > threshold) return null;

  return (
    <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 border border-red-200">
      <div className="w-2 h-2 bg-red-500 animate-pulse" />
      <span className="text-sm font-bold">
        Nur noch {quantity} Stück verfügbar!
      </span>
    </div>
  );
}

// Sales Counter
interface SalesCounterProps {
  count: number;
  label?: string;
}

export function SalesCounter({ count, label = "verkauft" }: SalesCounterProps) {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const increment = count / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= count) {
        setDisplayCount(count);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [count]);

  return (
    <div className="flex items-center gap-2 text-gray-600">
      <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      <span className="text-sm">
        <strong className="text-black">{displayCount.toLocaleString("de-DE")}+</strong> {label}
      </span>
    </div>
  );
}

// Star Rating
interface StarRatingProps {
  rating: number;
  reviewCount: number;
}

export function StarRating({ rating, reviewCount }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={cn(
              "w-4 h-4",
              i < fullStars
                ? "text-gold"
                : i === fullStars && hasHalfStar
                ? "text-gold"
                : "text-gray-300"
            )}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-gray-600">
        {rating.toFixed(1)} ({reviewCount} Bewertungen)
      </span>
    </div>
  );
}

// Trust Badges Row
export function TrustBadges() {
  const badges = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeWidth={1.5} d="M5 13l4 4L19 7" />
        </svg>
      ),
      text: "Versand in 1-3 Tagen",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      text: "Sichere Zahlung",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      text: "Alle Zahlungsarten",
    },
  ];

  return (
    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
      {badges.map((badge, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-gold">{badge.icon}</span>
          <span>{badge.text}</span>
        </div>
      ))}
    </div>
  );
}

// Payment Icons
export function PaymentIcons() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-400 uppercase tracking-wider">Zahlung:</span>
      <div className="flex gap-2">
        {/* Visa */}
        <div className="w-10 h-6 bg-gray-100 border border-gray-200 flex items-center justify-center">
          <span className="text-[8px] font-bold text-blue-600">VISA</span>
        </div>
        {/* Mastercard */}
        <div className="w-10 h-6 bg-gray-100 border border-gray-200 flex items-center justify-center">
          <span className="text-[8px] font-bold text-orange-600">MC</span>
        </div>
        {/* PayPal */}
        <div className="w-10 h-6 bg-gray-100 border border-gray-200 flex items-center justify-center">
          <span className="text-[8px] font-bold text-blue-800">PP</span>
        </div>
        {/* Klarna */}
        <div className="w-10 h-6 bg-gray-100 border border-gray-200 flex items-center justify-center">
          <span className="text-[8px] font-bold text-pink-600">K</span>
        </div>
      </div>
    </div>
  );
}

// USP List for Above the Fold
export function ProductUSPs({ isWine = false }: { isWine?: boolean }) {
  const usps = isWine
    ? [
        "Handverlesen aus deutschen Weingütern",
        "Versandbereit in 1-3 Werktagen",
        "Limitierte Auflage",
        "Teil der Urban Wine Bewegung",
        "Sichere Zahlung & schnelle Lieferung",
      ]
    : [
        "Premium 100% Baumwolle",
        "Versandbereit in 1-3 Werktagen",
        "Limitierte Stückzahl",
        "Unisex Streetwear Design",
        "Teil der Vinogang Community",
      ];

  return (
    <ul className="space-y-2">
      {usps.map((usp, i) => (
        <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
          <svg className="w-4 h-4 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>{usp}</span>
        </li>
      ))}
    </ul>
  );
}

// Event Social Proof
export function EventSocialProof() {
  return (
    <div className="inline-flex items-center gap-2 bg-black/5 px-4 py-2">
      <div className="flex -space-x-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-6 h-6 bg-gold/20 border border-gold/50 flex items-center justify-center"
          >
            <span className="text-[8px] text-gold font-bold">{i}</span>
          </div>
        ))}
      </div>
      <span className="text-xs text-gray-600">
        +1.200 Gäste bei unseren Events
      </span>
    </div>
  );
}

// Recently Viewed / Popularity Indicator
export function PopularityIndicator({ viewsToday = 23 }: { viewsToday?: number }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <div className="w-2 h-2 bg-green-500 animate-pulse" />
      <span>
        <strong>{viewsToday}</strong> Personen sehen sich das gerade an
      </span>
    </div>
  );
}
