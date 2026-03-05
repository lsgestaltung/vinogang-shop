"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function QRCodePage() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const newsletterUrl = `${origin}/newsletter`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(newsletterUrl)}&bgcolor=000000&color=DDB55B`;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 pt-28 pb-12">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.02]">
          <span className="text-[30vw] font-black uppercase tracking-tighter">
            GANG
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-lg">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/logo/logo-gold.png"
            alt="Vinogang"
            width={180}
            height={45}
            className="mx-auto"
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-8 h-px bg-gold" />
          <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">
            Newsletter
          </span>
          <div className="w-8 h-px bg-gold" />
        </div>

        <h1 className="text-3xl md:text-5xl font-black mb-2">
          Join the <span className="text-gold">Gang</span>
        </h1>

        <p className="text-white/60 mb-8">
          Scanne den QR-Code und melde dich an
        </p>

        {/* QR Code */}
        <div className="inline-block p-6 bg-black border-2 border-gold mb-8">
          {origin && (
            <img
              src={qrCodeUrl}
              alt="QR Code zum Newsletter"
              width={280}
              height={280}
              className="block"
            />
          )}
        </div>

        {/* Event Info */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-2">
            Nächstes Event
          </p>
          <p className="text-white font-bold text-xl mb-1">
            Trinkhalle X Fleur
          </p>
          <p className="text-white/60 text-lg mb-1">
            mit Vinogang
          </p>
          <p className="text-white/40">
            Ostersonntag, 20. April 2025 · Baden-Baden
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="w-12 h-12 mx-auto mb-3 border border-gold/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-[10px] text-white/50 uppercase tracking-wider">Early Access</p>
          </div>
          <div>
            <div className="w-12 h-12 mx-auto mb-3 border border-gold/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <p className="text-[10px] text-white/50 uppercase tracking-wider">Exklusive Drops</p>
          </div>
          <div>
            <div className="w-12 h-12 mx-auto mb-3 border border-gold/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-[10px] text-white/50 uppercase tracking-wider">Event Updates</p>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  );
}
