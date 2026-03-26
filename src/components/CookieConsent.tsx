"use client";

import { useState } from "react";
import Link from "next/link";
import { useCookieConsent, type CookiePreferences } from "@/contexts/CookieConsentContext";
import { Button } from "@/components/ui/Button";

export function CookieConsent() {
  const {
    showBanner,
    showSettings,
    preferences,
    acceptAll,
    acceptNecessary,
    savePreferences,
    openSettings,
    closeSettings,
  } = useCookieConsent();

  const [localPreferences, setLocalPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  if (!showBanner && !showSettings) {
    return null;
  }

  const handleSaveSettings = () => {
    savePreferences(localPreferences);
  };

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === "necessary") return; // Can't disable necessary cookies
    setLocalPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && !showSettings && (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
          <div className="bg-black text-white border-t-2 border-gold">
            <div className="container-narrow py-6 md:py-8">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center justify-between">
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold mb-2">
                    Cookie-Einstellungen
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                    Wir verwenden Cookies, um Ihnen die beste Erfahrung auf unserer Website zu bieten.
                    Einige sind notwendig für den Betrieb der Seite, während andere uns helfen, die
                    Website zu verbessern.{" "}
                    <Link
                      href="/datenschutz"
                      className="text-gold hover:underline"
                    >
                      Mehr erfahren
                    </Link>
                  </p>
                </div>

                {/* Actions - optimized for mobile touch */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Button
                    variant="outline-gold"
                    size="sm"
                    onClick={openSettings}
                    className="whitespace-nowrap touch-manipulation active:scale-95 transition-transform"
                  >
                    Einstellungen
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={acceptNecessary}
                    className="whitespace-nowrap touch-manipulation active:scale-95 transition-transform"
                  >
                    Nur Notwendige
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={acceptAll}
                    className="whitespace-nowrap touch-manipulation active:scale-95 transition-transform"
                  >
                    Alle akzeptieren
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white text-black max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-none border-2 border-gold shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-black text-white px-6 py-5 border-b-2 border-gold">
              <h2 className="text-2xl font-bold">Cookie-Einstellungen</h2>
              <p className="text-sm text-gray-300 mt-1">
                Verwalten Sie Ihre Cookie-Präferenzen
              </p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Necessary Cookies */}
              <div className="border-b border-gray-200 pb-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                      Notwendige Cookies
                      <span className="text-xs font-normal text-white bg-gold px-2 py-1 uppercase tracking-wider">
                        Immer aktiv
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Diese Cookies sind für die Grundfunktionen der Website erforderlich.
                      Sie ermöglichen die Navigation, Warenkorbfunktion und sichere Bereiche
                      der Website. Diese Cookies können nicht deaktiviert werden.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-6 bg-gold rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="border-b border-gray-200 pb-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">Analyse-Cookies</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website
                      interagieren. Wir sammeln anonymisierte Informationen über Seitenaufrufe,
                      Verweildauer und Nutzerverhalten, um die Website zu verbessern.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => handleToggle("analytics")}
                      className={`w-12 h-6 rounded-full relative transition-colors touch-manipulation active:scale-95 ${
                        localPreferences.analytics
                          ? "bg-gold"
                          : "bg-gray-300"
                      }`}
                      aria-label="Toggle analytics cookies"
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                          localPreferences.analytics
                            ? "right-1"
                            : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">Marketing-Cookies</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Diese Cookies werden verwendet, um Ihnen relevante Werbung und
                      Marketinginhalte anzuzeigen. Sie helfen uns, die Effektivität unserer
                      Werbekampagnen zu messen und Ihnen personalisierte Inhalte zu zeigen.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => handleToggle("marketing")}
                      className={`w-12 h-6 rounded-full relative transition-colors touch-manipulation active:scale-95 ${
                        localPreferences.marketing
                          ? "bg-gold"
                          : "bg-gray-300"
                      }`}
                      aria-label="Toggle marketing cookies"
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                          localPreferences.marketing
                            ? "right-1"
                            : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Info Text */}
              <div className="bg-gray-50 p-4 border-l-4 border-gold">
                <p className="text-xs text-gray-600">
                  Weitere Informationen zur Datenverarbeitung finden Sie in unserer{" "}
                  <Link href="/datenschutz" className="text-gold hover:underline font-medium">
                    Datenschutzerklärung
                  </Link>.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
              <Button
                variant="secondary"
                size="md"
                onClick={closeSettings}
                className="flex-1 touch-manipulation active:scale-95 transition-transform"
              >
                Abbrechen
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleSaveSettings}
                className="flex-1 touch-manipulation active:scale-95 transition-transform"
              >
                Auswahl speichern
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
