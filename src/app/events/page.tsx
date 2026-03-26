import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Süffig, jung, laut – unsere Events sind Wein ohne Staub, dafür mit Beat. Entdecke die nächsten Vinogang Events.",
};

const events = [
  {
    id: 0,
    title: "Trinkhalle X Fleur",
    subtitle: "mit Vinogang",
    date: "5. April 2026",
    time: "16:00 Uhr",
    location: "Baden-Baden",
    venue: "Trinkhalle",
    description:
      "Ostersonntag in Baden-Baden: Trinkhalle X Fleur und Vinogang laden ein. Eine besondere Kombination aus Wein, Genuss und Gemeinschaft.",
    image: "/images/events/ostersonntag.png",
    status: "upcoming" as const,
  },
];

export default function EventsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-black text-white overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/vibe/events-hero.jpg"
            alt="Vinogang Events"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container-wide text-center py-32">
          <span className="text-gold text-sm font-bold uppercase tracking-[0.3em] mb-6 block">
            Wein ohne Staub, dafür mit Beat
          </span>
          <h1 className="text-display mb-8">Events</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Süffig, jung, laut – unsere Events sind Wein ohne Staub, dafür mit
            Beat. Werde Teil der Bewegung.
          </p>
        </div>

        {/* Gold Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      </section>

      {/* Events List */}
      <section className="section bg-black text-white">
        <div className="container-wide">
          <div className="space-y-24">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`relative aspect-[4/3] overflow-hidden ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  {/* Gold Border */}
                  <div className="absolute inset-0 border-2 border-gold" />
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  {/* Date & Location */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-gold font-bold">{event.date}</span>
                    <span className="w-px h-4 bg-gray-700" />
                    <span className="text-gray-400">{event.location}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-2">
                    {event.title}
                  </h2>
                  <p className="text-gold text-lg mb-6">{event.subtitle}</p>

                  {/* Description */}
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">
                    {event.description}
                  </p>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mb-8 py-6 border-t border-b border-gray-800">
                    <div>
                      <span className="text-xs uppercase tracking-[0.15em] text-gray-500 block mb-1">
                        Zeit
                      </span>
                      <span className="font-bold">{event.time}</span>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-[0.15em] text-gray-500 block mb-1">
                        Location
                      </span>
                      <span className="font-bold">{event.venue}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  {event.status === "upcoming" ? (
                    <Button variant="outline-gold" size="lg">
                      Tickets
                    </Button>
                  ) : (
                    <Button variant="outline-gold" size="lg" disabled>
                      Bald verfügbar
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gold text-black">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-6">
            Du willst ein Vinogang Event in deiner Stadt?
          </h2>
          <p className="text-lg mb-8 opacity-80">
            Schreib uns und werde Teil der Bewegung. Wir bringen den Wein zu
            dir.
          </p>
          <Button variant="secondary" size="lg">
            Kontakt aufnehmen
          </Button>
        </div>
      </section>
    </>
  );
}
