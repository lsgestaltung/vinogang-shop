"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FAQSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

const faqCategories = [
  {
    title: "Bestellung & Versand",
    questions: [
      {
        question: "Wie lange dauert die Lieferung?",
        answer: "Wir versenden alle Bestellungen innerhalb von 1-2 Werktagen. Die Lieferzeit beträgt in der Regel 1-3 Werktage innerhalb Deutschlands. Nach Österreich und in die Schweiz kann es 3-5 Werktage dauern.",
      },
      {
        question: "Wie hoch sind die Versandkosten?",
        answer: "Der Versand innerhalb Deutschlands kostet 4,90€. Ab einem Bestellwert von 50€ ist der Versand kostenlos. Für Österreich und die Schweiz berechnen wir 9,90€ Versandkosten.",
      },
      {
        question: "In welche Länder liefert ihr?",
        answer: "Aktuell liefern wir nach Deutschland, Österreich und in die Schweiz. Weitere Länder sind in Planung.",
      },
      {
        question: "Kann ich meine Bestellung verfolgen?",
        answer: "Ja! Nach dem Versand erhältst du automatisch eine E-Mail mit der Sendungsverfolgungsnummer. Damit kannst du dein Paket jederzeit tracken.",
      },
    ],
  },
  {
    title: "Zahlung",
    questions: [
      {
        question: "Welche Zahlungsmethoden akzeptiert ihr?",
        answer: "Wir akzeptieren Kreditkarte (Visa, Mastercard, American Express), PayPal, Klarna (Rechnung, Ratenzahlung), Apple Pay, Google Pay und SOFORT Überweisung.",
      },
      {
        question: "Ist die Zahlung sicher?",
        answer: "Absolut! Alle Zahlungen werden über unseren Partner Shopify Payments mit SSL-Verschlüsselung abgewickelt. Deine Daten sind zu 100% geschützt.",
      },
      {
        question: "Kann ich auf Rechnung bezahlen?",
        answer: "Ja, über Klarna kannst du bequem auf Rechnung bestellen und hast 30 Tage Zeit zum Bezahlen.",
      },
    ],
  },
  {
    title: "Wein",
    questions: [
      {
        question: "Woher kommt euer Wein?",
        answer: "Unsere Weine stammen aus ausgewählten deutschen Weingütern, hauptsächlich aus der Pfalz. Wir arbeiten direkt mit den Winzern zusammen, um höchste Qualität zu garantieren.",
      },
      {
        question: "Was macht Vinogang Wein besonders?",
        answer: "Wir bringen Wein dahin, wo der Winzer nicht hinkommt. Urban, jung, ohne Staub. Unsere Weine sind für besondere Momente gemacht – für Rooftop-Partys, lange Gespräche und unvergessliche Nächte.",
      },
      {
        question: "Wie lagere ich den Wein am besten?",
        answer: "Am besten lagerst du unsere Weine kühl (10-15°C), dunkel und liegend. Der Bianco Neve sollte bei 8-10°C serviert werden, der La Fleur Rosé bei 6-8°C.",
      },
      {
        question: "Was bedeutet 'Blanc de Blancs'?",
        answer: "Blanc de Blancs bedeutet 'Weißer aus Weißen' und bezeichnet einen Wein, der ausschließlich aus weißen Trauben gekeltert wurde. Unser Bianco Neve ist ein klassischer Blanc de Blancs mit frischem, elegantem Charakter.",
      },
    ],
  },
  {
    title: "Clothing",
    questions: [
      {
        question: "Wie fallen eure Shirts aus?",
        answer: "Unsere Shirts haben einen Regular Fit und fallen true to size aus. Im Zweifelsfall empfehlen wir, eine Größe größer zu bestellen für einen relaxteren Look.",
      },
      {
        question: "Aus welchem Material sind die Shirts?",
        answer: "Alle unsere Shirts bestehen aus 100% Premium-Baumwolle (180g/m²). Sie sind vorgewaschen, sodass sie ihre Form behalten und nicht einlaufen.",
      },
      {
        question: "Wie wasche ich mein Vinogang Shirt?",
        answer: "Wasche dein Shirt bei maximal 30°C auf links gedreht. Nicht in den Trockner geben und nicht bügeln auf dem Druck. So bleibt dein Shirt lange wie neu.",
      },
      {
        question: "Sind die Designs limitiert?",
        answer: "Ja, viele unserer Designs sind limitiert. Wenn ein Design ausverkauft ist, kommt es in der Regel nicht zurück. Also: zuschlagen, solange verfügbar!",
      },
    ],
  },
  {
    title: "Rückgabe & Umtausch",
    questions: [
      {
        question: "Kann ich Produkte zurückgeben?",
        answer: "Ja, du hast 14 Tage Rückgaberecht. Clothing kann ungetragen und mit Etikett zurückgegeben werden. Bei Wein ist eine Rückgabe nur bei Transportschäden möglich.",
      },
      {
        question: "Wie funktioniert der Umtausch?",
        answer: "Kontaktiere uns einfach per E-Mail an info@vinogang.de mit deiner Bestellnummer und dem gewünschten Umtausch. Wir melden uns innerhalb von 24 Stunden.",
      },
      {
        question: "Wer trägt die Rücksendekosten?",
        answer: "Bei einem regulären Widerruf trägst du die Rücksendekosten. Bei defekter oder falscher Ware übernehmen selbstverständlich wir die Kosten.",
      },
    ],
  },
];

// Flatten all questions for schema
const allQuestions = faqCategories.flatMap((cat) =>
  cat.questions.map((q) => ({
    question: q.question,
    answer: q.answer,
  }))
);

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<number>(0);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <>
      <FAQSchema questions={allQuestions} />
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://vinogang.de" },
          { name: "FAQ", url: "https://vinogang.de/faq" },
        ]}
      />

      <div className="bg-white min-h-screen">
        {/* Hero */}
        <div className="relative bg-black pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
              <span className="text-[25vw] font-black text-white whitespace-nowrap">
                FAQ
              </span>
            </div>
          </div>

          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-gold" />
                <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">
                  Hilfe & Support
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none mb-6">
                HÄUFIGE <span className="text-gold">FRAGEN</span>
              </h1>
              <p className="text-white/60 text-lg md:text-xl max-w-xl">
                Hier findest du Antworten auf die häufigsten Fragen.
                Noch Fragen? Schreib uns!
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="py-16 md:py-24">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Category Navigation */}
              <div className="lg:col-span-1">
                <nav className="sticky top-24 space-y-2">
                  {faqCategories.map((category, index) => (
                    <button
                      key={category.title}
                      onClick={() => setOpenCategory(index)}
                      className={cn(
                        "w-full text-left px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all",
                        openCategory === index
                          ? "bg-gold text-black"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      )}
                    >
                      {category.title}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Questions */}
              <div className="lg:col-span-3">
                <div className="space-y-4">
                  {faqCategories[openCategory].questions.map((item, index) => {
                    const isOpen = openQuestion === `${openCategory}-${index}`;

                    return (
                      <div
                        key={index}
                        className="border border-gray-200 overflow-hidden"
                      >
                        <button
                          onClick={() =>
                            setOpenQuestion(isOpen ? null : `${openCategory}-${index}`)
                          }
                          className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-bold text-black pr-4">
                            {item.question}
                          </span>
                          <svg
                            className={cn(
                              "w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300",
                              isOpen && "rotate-180"
                            )}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="square"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-300",
                            isOpen ? "max-h-96" : "max-h-0"
                          )}
                        >
                          <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-black py-16 md:py-20">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                NOCH <span className="text-gold">FRAGEN?</span>
              </h2>
              <p className="text-white/60 mb-8">
                Unser Team ist für dich da. Schreib uns und wir melden uns
                schnellstmöglich bei dir.
              </p>
              <a
                href="mailto:info@vinogang.de"
                className="inline-block px-10 py-4 bg-gold text-black font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors"
              >
                info@vinogang.de
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
