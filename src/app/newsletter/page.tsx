"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      // TODO: Integrate with Klaviyo or Shopify Email
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem("vinogang-newsletter-subscribed", "true");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
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
      <div className="flex-1 flex items-center justify-center px-4 pt-32 pb-20">
        <div className="relative z-10 max-w-lg w-full text-center">
          {/* Logo */}
          <div className="mb-12">
            <Image
              src="/images/logo/logo-gold.png"
              alt="Vinogang"
              width={200}
              height={50}
              className="mx-auto"
            />
          </div>

          {/* Icon */}
          <div className="w-24 h-24 mx-auto mb-8 border-2 border-gold flex items-center justify-center">
            <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Header */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-gold" />
            <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">
              Newsletter
            </span>
            <div className="w-8 h-px bg-gold" />
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            Join the<br />
            <span className="text-gold">Gang</span>
          </h1>

          <p className="text-white/60 mb-8 text-lg">
            Sei der Erste, der von neuen Drops, Events und exklusiven Angeboten erfährt.
          </p>

          {status === "success" ? (
            <div className="bg-gold/10 border-2 border-gold p-8 animate-fade-in">
              <svg className="w-16 h-16 text-gold mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h2 className="text-2xl font-bold text-gold mb-2">Willkommen in der Gang!</h2>
              <p className="text-white/60">Du erhältst bald Post von uns.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    variant="dark"
                    placeholder="Deine E-Mail Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    required
                    className="text-center sm:text-left h-14 text-lg"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={status === "loading"}
                  className="min-w-[160px] h-14"
                >
                  {status === "loading" ? (
                    <span className="inline-block w-5 h-5 border-2 border-black border-t-transparent animate-spin" />
                  ) : (
                    "Anmelden"
                  )}
                </Button>
              </div>

              {status === "error" && (
                <p className="text-red-500 text-sm">
                  Etwas ist schiefgelaufen. Bitte versuche es erneut.
                </p>
              )}
            </form>
          )}

          {/* Privacy Note */}
          <p className="mt-8 text-[11px] text-white/30 uppercase tracking-wider">
            Mit der Anmeldung stimmst du unserer Datenschutzerklärung zu.
          </p>

          {/* Event Teaser */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-2">
              Nächstes Event
            </p>
            <p className="text-white font-bold text-lg">
              Trinkhalle X Fleur mit Vinogang
            </p>
            <p className="text-white/50">
              Ostersonntag, 20. April 2025 · Baden-Baden
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  );
}
