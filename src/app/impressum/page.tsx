import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Kontaktdaten von Vinogang",
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="container-narrow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-12">Impressum</h1>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4">Angaben gemäß § 5 TMG</h2>
              <p className="mb-2">
                <strong>Vino Gang GmbH</strong><br />
                Im Rollfeld 42<br />
                76532 Baden-Baden<br />
                Deutschland
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
              <p className="mb-2">
                Telefon: +49 (0) 170 550 79 74<br />
                E-Mail: contact@vinogang.com<br />
                Web: www.vinogang.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Vertreten durch</h2>
              <p className="mb-2">
                Geschäftsführer: Jakob Bimmerle
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Registereintrag</h2>
              <p className="mb-2">
                Eintragung im Registergericht: Amtsgericht Mannheim<br />
                Registernummer: HRB 751930
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Umsatzsteuer-ID</h2>
              <p className="mb-2">
                Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz:<br />
                DE370579817
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Verantwortlich für den Inhalt</h2>
              <p className="mb-2">
                Verantwortlich gemäß § 5 TMG und § 55 Abs. 2 RStV:<br />
                Jakob Bimmerle<br />
                Im Rollfeld 42<br />
                76532 Baden-Baden
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Design & Konzept</h2>
              <p className="mb-2">
                <a href="https://lsgestaltung.de" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                  lsgestaltung.de
                </a><br />
                Luca Strigl
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">EU-Streitschlichtung</h2>
              <p className="mb-4">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:<br />
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
              <p className="mb-2">
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
              <p className="mb-2">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Haftungsausschluss</h2>
              <h3 className="text-xl font-bold mb-2">Haftung für Inhalte</h3>
              <p className="mb-4">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p className="mb-4">
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>

              <h3 className="text-xl font-bold mb-2">Haftung für Links</h3>
              <p className="mb-4">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
              <p className="mb-4">
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>

              <h3 className="text-xl font-bold mb-2">Urheberrecht</h3>
              <p className="mb-4">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
              <p className="mb-2">
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
