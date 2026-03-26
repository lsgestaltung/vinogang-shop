import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen von Vinogang",
};

export default function AGBPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="container-narrow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-8">
            Allgemeine Geschäftsbedingungen
          </h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">ÜBERSICHT</h2>
              <p className="mb-4">
                Willkommen bei Vino Gang! Die Begriffe „wir", „uns" und „unser" beziehen sich auf Vino Gang. Vino Gang betreibt diesen Shop und diese Website, einschließlich aller zugehörigen Informationen, Inhalte, Funktionen, Tools, Produkte und Services, um Ihnen, dem Kunden, ein individuelles Einkaufserlebnis bereitzustellen (die „Services"). Vino Gang basiert auf Shopify, wodurch wir in der Lage sind, Ihnen die Services bereitzustellen.
              </p>
              <p className="mb-4">
                Die nachstehenden Geschäftsbedingungen, zusammen mit den hierin erwähnten Richtlinien (diese „Allgemeinen Geschäftsbedingungen" oder „Bedingungen") beschreiben Ihre Rechte und Pflichten, wenn Sie die Services nutzen.
              </p>
              <p className="mb-4">
                Bitte lesen Sie diese Allgemeinen Geschäftsbedingungen sorgfältig durch, da sie wichtige Informationen über Ihre gesetzlichen Rechte enthalten und Themen wie Gewährleistungsausschlüsse und Haftungsbeschränkungen behandeln.
              </p>
              <p className="mb-4">
                Indem Sie unsere Services besuchen, mit ihnen interagieren oder sie nutzen, erklären Sie Ihr Einverständnis mit diesen Allgemeinen Geschäftsbedingungen und unserer Datenschutzerklärung. Sollten Sie diesen Allgemeinen Geschäftsbedingungen oder der Datenschutzerklärung nicht zustimmen, dürfen Sie unsere Services nicht nutzen oder darauf zugreifen.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">ABSCHNITT 1 – ZUGRIFF UND KONTO</h2>
              <p className="mb-4">
                Durch die Zustimmung zu diesen Allgemeinen Geschäftsbedingungen erklären Sie, dass Sie in dem Bundesland oder der Region, in dem bzw. der Sie Ihren Wohnsitz haben, volljährig sind und uns Ihre Zustimmung erteilt haben, Ihren minderjährigen Angehörigen die Nutzung der Services auf Geräten zu gestatten, die Ihnen gehören, die Sie gekauft haben oder die Sie verwalten.
              </p>
              <p className="mb-4">
                Um die Services nutzen zu können, einschließlich des Zugriffs auf oder der Navigation in unseren Onlineshops oder des Kaufs von Produkten oder Services, die wir anbieten, werden Sie möglicherweise aufgefordert, bestimmte Informationen anzugeben, wie beispielsweise Ihre E-Mail-Adresse sowie Informationen zur Rechnungsstellung, Bezahlung und Lieferung. Sie versichern und erklären, dass alle Angaben, die Sie in unseren Shops machen, korrekt, aktuell und vollständig sind und dass Sie zur Abgabe dieser Angaben vollumfänglich berechtigt sind.
              </p>
              <p className="mb-4">
                Sie allein sind für die Sicherheit der Anmeldedaten für Ihr Konto und für alle Aktivitäten auf Ihrem Konto verantwortlich. Sie dürfen Ihr Konto nicht an eine andere Person übertragen, verkaufen, abtreten oder lizenzieren.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">ABSCHNITT 2 – UNSERE PRODUKTE</h2>
              <p className="mb-4">
                Wir haben uns bemüht, unsere Produkte und Services in unseren Onlineshops so genau wie möglich darzustellen. Wir weisen jedoch darauf hin, dass Farben oder das Aussehen der Produkte aufgrund des von Ihnen verwendeten Geräts für den Zugriff auf den Shop sowie auf dessen Einstellungen und Konfiguration von den auf Ihrem Bildschirm angezeigten Farben abweichen können.
              </p>
              <p className="mb-4">
                Wir übernehmen keine Gewähr dafür, dass das Aussehen oder die Qualität der von Ihnen erworbenen Produkte oder Services Ihren Erwartungen entsprechen oder mit den Darstellungen in unseren Onlineshops übereinstimmen.
              </p>
              <p className="mb-4">
                Alle Produktbeschreibungen können jederzeit und ohne Vorankündigung nach unserem alleinigen Ermessen geändert werden. Wir behalten uns das Recht vor, Produkte jederzeit aus dem Sortiment zu nehmen und die Mengen der Produkte, die wir einer Person, in einer geografischen Region oder innerhalb einer Gerichtsbarkeit anbieten, von Fall zu Fall zu begrenzen.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Abschnitt 3 – BESTELLUNGEN</h2>
              <p className="mb-4">
                Mit Ihrer Bestellung geben Sie ein Kaufangebot ab. Vino Gang behält sich das Recht vor, Ihre Bestellung nach eigenem Ermessen aus beliebigem Grund anzunehmen oder abzulehnen. Ihre Bestellung gilt erst nach Bestätigung durch Vino Gang als angenommen. Voraussetzung für die Annahme Ihrer Bestellung ist der Eingang und die Verarbeitung Ihrer Zahlung. Bitte überprüfen Sie Ihre Bestellung vor der Abgabe sorgfältig, da Vino Gang Stornierungsanfragen nach Annahme einer Bestellung möglicherweise nicht mehr berücksichtigen kann.
              </p>
              <p className="mb-4">
                Sollten wir eine Bestellung nicht annehmen, ändern oder stornieren, werden wir versuchen, Sie über die bei der Bestellung angegebene E-Mail-Adresse, Rechnungsadresse und/oder Telefonnummer zu informieren.
              </p>
              <p className="mb-4">
                Sie versichern und erklären, dass Ihre Käufe für Ihren persönlichen Gebrauch oder den Gebrauch in Ihrem Haushalt bestimmt sind und nicht für den gewerblichen Weiterverkauf oder Export.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">ABSCHNITT 4 – PREISE UND RECHNUNGSSTELLUNG</h2>
              <p className="mb-4">
                Preise, Rabatte und Sonderangebote können ohne vorherige Ankündigung geändert werden. Der für ein Produkt oder einen Service berechnete Preis ist der zum Zeitpunkt der Bestellung gültige Preis und wird in der Bestellbestätigung angegeben, die Sie per E-Mail erhalten. Sofern nicht ausdrücklich anders angegeben, sind in den angegebenen Preisen keine Steuern, Versand-, Bearbeitungs-, Zoll- oder Einfuhrgebühren enthalten.
              </p>
              <p className="mb-4">
                Sie versichern und erklären, dass (i) die von Ihnen angegebenen Kreditkarteninformationen wahrheitsgemäß, korrekt und vollständig sind, (ii) Sie zur Nutzung dieser Kreditkarte für den Kauf berechtigt sind, (iii) die von Ihnen verursachten Kosten von Ihrem Kreditkartenunternehmen übernommen werden und (iv) Sie die von Ihnen verursachten Kosten zu den angegebenen Preisen, einschließlich Versand- und Bearbeitungsgebühren und aller anfallenden Steuern, bezahlen werden.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">ABSCHNITT 5 – VERSAND UND ZUSTELLUNG</h2>
              <p className="mb-4">
                Wir haften nicht für Versand- und Zustellungsverzögerungen. Alle Lieferzeiten sind nur Schätzungen und werden nicht garantiert. Wir sind nicht verantwortlich für Verzögerungen, die durch Versanddienstleister, Zollabwicklung oder Ereignisse außerhalb unserer Kontrolle verursacht werden. Sobald wir die Produkte an den Versanddienstleister übergeben haben, gehen das Eigentumsrecht und das Verlustrisiko auf Sie über.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">ABSCHNITT 6 – DATENSCHUTZERKLÄRUNG</h2>
              <p className="mb-4">
                Alle personenbezogenen Daten, die wir über die Services erfassen, unterliegen unserer <a href="/datenschutz" className="text-gold hover:underline">Datenschutzerklärung</a>. Durch die Nutzung der Services bestätigen Sie, dass Sie diese Datenschutzerklärung gelesen haben.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">ABSCHNITT 7 – GELTENDES RECHT</h2>
              <p className="mb-4">
                Diese Allgemeinen Geschäftsbedingungen unterliegen deutschem Recht. Gerichtsstand ist Baden-Baden, Deutschland.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">KONTAKTINFORMATIONEN</h2>
              <p className="mb-4">
                Bei Fragen zu den Allgemeinen Geschäftsbedingungen wenden Sie sich bitte an:
              </p>
              <p className="mb-2">
                <strong>Vino Gang GmbH</strong><br />
                Im Rollfeld 42<br />
                76532 Baden-Baden<br />
                Deutschland
              </p>
              <p className="mb-2">
                E-Mail: contact@vinogang.com<br />
                Telefon: +49 (0) 170 550 79 74
              </p>
              <p className="mb-2">
                Geschäftsführer: Jakob Bimmerle<br />
                Registergericht: Amtsgericht Mannheim<br />
                Registernummer: HRB 751930<br />
                USt-IdNr.: DE370579817
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
