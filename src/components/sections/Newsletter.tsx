"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [sectionRef, isVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section ref={sectionRef} className="py-32 md:py-40 bg-black text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
      </div>

      {/* Large decorative text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.02] pointer-events-none">
        <span className="text-[30vw] font-black uppercase tracking-tighter">
          GANG
        </span>
      </div>

      <div className="container-narrow relative z-10">
        <div className={cn(
          "max-w-xl mx-auto text-center transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          {/* Icon/Visual */}
          <div className={cn(
            "w-20 h-20 mx-auto mb-8 border-2 border-gold flex items-center justify-center transition-all duration-1000 delay-200",
            isVisible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 rotate-12"
          )}>
            <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-gold" />
            <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">
              Newsletter
            </span>
            <div className="w-8 h-px bg-gold" />
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Stay in the<br />
            <span className="text-gold">Gang</span>
          </h2>

          <p className="text-white/50 mb-10">
            Sei der Erste, der von neuen Drops, Events und exklusiven Angeboten erfährt.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="email"
                  variant="dark"
                  placeholder="Deine E-Mail Adresse"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading" || status === "success"}
                  required
                  className="text-center sm:text-left"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                disabled={status === "loading" || status === "success"}
                className="min-w-[140px]"
              >
                {status === "loading" ? (
                  <span className="inline-block w-5 h-5 border-2 border-black border-t-transparent animate-spin" />
                ) : status === "success" ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Done
                  </>
                ) : (
                  "Anmelden"
                )}
              </Button>
            </div>

            {/* Status Messages */}
            {status === "success" && (
              <p className="text-gold text-sm animate-fade-in">
                Willkommen in der Gang! Du erhältst bald Post von uns.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-sm">
                Etwas ist schiefgelaufen. Bitte versuche es erneut.
              </p>
            )}
          </form>

          {/* Privacy Note */}
          <p className="mt-8 text-[11px] text-white/30 uppercase tracking-wider">
            Mit der Anmeldung stimmst du unserer Datenschutzerklärung zu.
          </p>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
    </section>
  );
}
