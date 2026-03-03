"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const footerLinks = {
  shop: [
    { name: "Alle Produkte", href: "/shop" },
    { name: "Wein", href: "/shop?collection=wine" },
    { name: "Clothing", href: "/shop?collection=clothing" },
  ],
  company: [
    { name: "Events", href: "/events" },
    { name: "Über Uns", href: "/about" },
    { name: "Kontakt", href: "/contact" },
  ],
  legal: [
    { name: "Impressum", href: "/impressum" },
    { name: "Datenschutz", href: "/datenschutz" },
    { name: "AGB", href: "/agb" },
  ],
};

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/vinogang",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@vinogang",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
      </svg>
    ),
  },
];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 border border-gold/10 rotate-45 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 border border-gold/10 -rotate-12 -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Newsletter Section */}
      <div className="container-wide py-32 md:py-40 border-b border-gray-800 relative">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-black mb-8">
            JOIN THE <span className="text-gold">GANG</span>
          </h3>
          <p className="text-gray-400 mb-12 text-lg">
            Exklusive Drops, Events & mehr direkt in deinem Postfach.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Deine E-Mail"
              className="flex-1 px-4 py-3 bg-white/5 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-gold transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gold text-black font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors"
            >
              Anmelden
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-wide py-20 md:py-24 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-12">
              <Image
                src="/images/logo/logo-white.png"
                alt="Vinogang"
                width={180}
                height={45}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Vinogang bringt Wein dahin, wo der Winzer nicht hinkommt.
              Wir sind mehr als eine Marke – wir sind eine Bewegung.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Follow us</span>
              <div className="w-8 h-px bg-gold/50" />
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Shop Links */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold mb-6 flex items-center gap-3">
                  <span>Shop</span>
                  <div className="flex-1 h-px bg-gold/20" />
                </h4>
                <ul className="space-y-4">
                  {footerLinks.shop.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold mb-6 flex items-center gap-3">
                  <span>Vinogang</span>
                  <div className="flex-1 h-px bg-gold/20" />
                </h4>
                <ul className="space-y-4">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold mb-6 flex items-center gap-3">
                  <span>Legal</span>
                  <div className="flex-1 h-px bg-gold/20" />
                </h4>
                <ul className="space-y-4">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-gold" />
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} Vinogang GmbH
              </p>
            </div>
            <p className="text-xs text-gray-500 text-center md:text-right">
              Bitte trinke verantwortungsvoll · Kein Verkauf an Minderjährige
            </p>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="border-t border-gray-800/50 py-4">
        <div className="container-wide">
          <p className="text-center text-[10px] text-gray-600 uppercase tracking-[0.3em]">
            Urban · Jung · Laut · Gemeinschaft
          </p>
        </div>
      </div>
    </footer>
  );
}
