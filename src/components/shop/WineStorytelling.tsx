"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/shopify";

interface WineStorytellingProps {
  product: Product;
}

// Get storytelling content based on product handle
function getWineStory(handle: string) {
  const handleLower = handle.toLowerCase();

  if (handleLower.includes("bianco") || handleLower.includes("blanc")) {
    return {
      headline: "Warum dieser Wein anders ist",
      tagline: "Nicht nur ein Weißwein. Ein Statement.",
      story: `Bianco Neve ist kein Wein für verstaubte Weinkeller.
              Er ist für Dachterrassen bei Sonnenuntergang.
              Für lange Gespräche, die bis in die Nacht gehen.
              Für Momente, die man nie vergessen wird.`,
      atmosphere: "Perfekt für:",
      occasions: [
        "Rooftop-Partys",
        "Sunset Sessions",
        "Dinner mit Freunden",
        "Besondere Anlässe",
      ],
      tastingNotes: {
        aroma: "Zitrus, Holunderblüte, frische Birne",
        taste: "Knackig, elegant, mit lebendiger Säure",
        finish: "Lang anhaltend, mineralisch",
      },
      pairingTip: "Am besten zu mediterraner Küche, Meeresfrüchten oder einfach pur auf Eis.",
      temperature: "8-10°C",
      origin: "Pfalz, Deutschland",
    };
  }

  if (handleLower.includes("rose") || handleLower.includes("rosé") || handleLower.includes("fleur")) {
    return {
      headline: "Warum dieser Wein anders ist",
      tagline: "Pink ist das neue Schwarz.",
      story: `La Fleur Rosé ist nicht irgendein Rosé.
              Er ist für Menschen, die wissen, dass die besten Momente
              nicht geplant werden können. Für spontane Picknicks im Park.
              Für Nachmittage, die nie enden sollten.`,
      atmosphere: "Perfekt für:",
      occasions: [
        "Sommernächte",
        "Brunches mit Freunden",
        "Festival-Vibes",
        "Every Day Celebrations",
      ],
      tastingNotes: {
        aroma: "Erdbeere, Himbeere, ein Hauch von Rose",
        taste: "Fruchtig, frisch, perfekt balanciert",
        finish: "Elegant, mit feiner Mineralität",
      },
      pairingTip: "Ideal zu Salaten, Grillgerichten oder als Aperitif.",
      temperature: "6-8°C",
      origin: "Pfalz, Deutschland",
    };
  }

  if (handleLower.includes("bundle")) {
    return {
      headline: "Das beste aus beiden Welten",
      tagline: "Weiß trifft Rosé. Urban trifft Klassik.",
      story: `Warum sich entscheiden, wenn man beides haben kann?
              Das Vinogang Bundle vereint unsere beiden Signature-Weine
              für den ultimativen Genuss. Perfekt für alle,
              die Vielfalt lieben.`,
      atmosphere: "Perfekt für:",
      occasions: [
        "Große Feiern",
        "Geschenkideen",
        "Wine Tastings",
        "Das komplette Erlebnis",
      ],
      tastingNotes: null,
      pairingTip: "Das perfekte Duo für jeden Anlass – von entspannt bis festlich.",
      temperature: "Je nach Wein 6-10°C",
      origin: "Pfalz, Deutschland",
    };
  }

  // Fallback
  return {
    headline: "Warum dieser Wein anders ist",
    tagline: "Urban Wine Culture.",
    story: `Jeder Vinogang Wein erzählt eine Geschichte.
            Eine Geschichte von Freundschaft, guten Momenten
            und der Überzeugung, dass Wein mehr sein sollte
            als nur ein Getränk.`,
    atmosphere: "Perfekt für:",
    occasions: [
      "Besondere Momente",
      "Zeit mit Freunden",
      "Neue Erfahrungen",
      "Jeden Tag, der es wert ist",
    ],
    tastingNotes: null,
    pairingTip: "Am besten mit guten Freunden genießen.",
    temperature: "Gekühlt servieren",
    origin: "Deutschland",
  };
}

export function WineStorytelling({ product }: WineStorytellingProps) {
  const story = getWineStory(product.handle);

  return (
    <section className="py-20 md:py-28 bg-black text-white overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Story Content */}
          <div>
            {/* Tag */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-gold" />
              <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">
                Die Story
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              {story.headline}
            </h2>

            {/* Tagline */}
            <p className="text-gold text-xl md:text-2xl font-bold mb-8">
              {story.tagline}
            </p>

            {/* Story Text */}
            <p className="text-white/70 text-lg leading-relaxed mb-10 whitespace-pre-line">
              {story.story}
            </p>

            {/* Occasions */}
            <div className="mb-10">
              <p className="text-gold text-sm font-bold uppercase tracking-wider mb-4">
                {story.atmosphere}
              </p>
              <div className="flex flex-wrap gap-3">
                {story.occasions.map((occasion) => (
                  <span
                    key={occasion}
                    className="px-4 py-2 border border-white/20 text-white/80 text-sm"
                  >
                    {occasion}
                  </span>
                ))}
              </div>
            </div>

            {/* Pairing Tip */}
            <div className="bg-white/5 border-l-2 border-gold pl-6 py-4">
              <p className="text-gold text-xs font-bold uppercase tracking-wider mb-2">
                Unser Tipp
              </p>
              <p className="text-white/70">
                {story.pairingTip}
              </p>
            </div>
          </div>

          {/* Tasting Notes Card */}
          <div className="relative">
            {/* Decorative background */}
            <div className="absolute -inset-4 border border-gold/20 -rotate-3" />
            <div className="absolute -inset-8 border border-gold/10 rotate-2" />

            <div className="relative bg-white/5 backdrop-blur-sm p-8 md:p-12">
              <h3 className="text-2xl font-black mb-8 text-center">
                <span className="text-gold">TASTING</span> NOTES
              </h3>

              {story.tastingNotes ? (
                <div className="space-y-6">
                  {/* Aroma */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gold text-sm font-bold uppercase tracking-wider">Aroma</span>
                    </div>
                    <p className="text-white/70 pl-8">{story.tastingNotes.aroma}</p>
                  </div>

                  {/* Taste */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="text-gold text-sm font-bold uppercase tracking-wider">Geschmack</span>
                    </div>
                    <p className="text-white/70 pl-8">{story.tastingNotes.taste}</p>
                  </div>

                  {/* Finish */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-gold text-sm font-bold uppercase tracking-wider">Abgang</span>
                    </div>
                    <p className="text-white/70 pl-8">{story.tastingNotes.finish}</p>
                  </div>
                </div>
              ) : (
                <p className="text-white/70 text-center">
                  Zwei einzigartige Charaktere, perfekt aufeinander abgestimmt.
                </p>
              )}

              {/* Divider */}
              <div className="my-8 border-t border-white/10" />

              {/* Details */}
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <p className="text-gold text-xs font-bold uppercase tracking-wider mb-2">
                    Serviertemperatur
                  </p>
                  <p className="text-white text-lg font-bold">{story.temperature}</p>
                </div>
                <div>
                  <p className="text-gold text-xs font-bold uppercase tracking-wider mb-2">
                    Herkunft
                  </p>
                  <p className="text-white text-lg font-bold">{story.origin}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Quote Section
export function WineQuote() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-12 mx-auto mb-8 border-2 border-gold flex items-center justify-center">
            <span className="text-gold text-2xl font-serif">&ldquo;</span>
          </div>

          <blockquote className="text-3xl md:text-4xl font-black text-black leading-tight mb-8">
            Wine is bottled poetry.
            <span className="text-gold"> We just added some street cred.</span>
          </blockquote>

          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gold" />
            <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">
              Vinogang Manifest
            </span>
            <div className="w-12 h-px bg-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}
