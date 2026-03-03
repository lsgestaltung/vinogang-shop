"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Shop", href: "/shop" },
  { name: "Wine", href: "/shop?collection=wine" },
  { name: "Clothing", href: "/shop?collection=clothing" },
  { name: "Events", href: "/events" },
];

// Wrapper component for the navigation that uses searchParams
function NavigationLinks({ textColor, hoverColor, pathname }: { textColor: string; hoverColor: string; pathname: string }) {
  const searchParams = useSearchParams();
  const currentCollection = searchParams.get("collection");

  return (
    <>
      {navigation.map((item, index) => {
        let isActive = false;
        if (item.href === "/shop" && pathname === "/shop" && !currentCollection) {
          isActive = true;
        } else if (item.href === "/shop?collection=wine" && currentCollection === "wine") {
          isActive = true;
        } else if (item.href === "/shop?collection=clothing" && currentCollection === "clothing") {
          isActive = true;
        } else if (item.href === "/events" && pathname === "/events") {
          isActive = true;
        }

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "relative px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] transition-all duration-300 group",
              textColor,
              hoverColor,
              isActive && "text-gold"
            )}
          >
            <span className="relative z-10">{item.name}</span>
            <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-all duration-300" />
            {isActive && (
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gold" />
            )}
            {index < navigation.length - 1 && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-4 bg-gray-300" />
            )}
          </Link>
        );
      })}
    </>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const textColor = isMobileMenuOpen ? "text-white" : "text-black";
  const hoverColor = "hover:text-gold";
  const bgColor = isMobileMenuOpen
    ? "bg-black"
    : isScrolled
      ? "bg-white/95 backdrop-blur-md shadow-sm"
      : "bg-white/80 backdrop-blur-sm";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        bgColor,
        isScrolled ? "py-3 md:py-4" : "py-4 md:py-6"
      )}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-[60] group" onClick={() => setIsMobileMenuOpen(false)}>
            <Image
              src={isMobileMenuOpen ? "/images/logo/logo-white.png" : "/images/logo/logo-black.png"}
              alt="Vinogang"
              width={180}
              height={45}
              className={cn(
                "w-auto transition-all duration-300 group-hover:scale-105",
                isScrolled ? "h-8 md:h-10" : "h-9 md:h-12"
              )}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="w-10 h-px bg-gold mr-10" />

            <div className="flex items-center gap-2">
              <Suspense fallback={
                <div className="flex items-center gap-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "relative px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] transition-all duration-300 group",
                        textColor,
                        hoverColor
                      )}
                    >
                      <span className="relative z-10">{item.name}</span>
                    </Link>
                  ))}
                </div>
              }>
                <NavigationLinks textColor={textColor} hoverColor={hoverColor} pathname={pathname} />
              </Suspense>
            </div>

            <div className="w-10 h-px bg-gold ml-10" />
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Cart Button */}
            <button
              onClick={openCart}
              className={cn(
                "relative p-2.5 transition-all duration-300 group z-[60]",
                isMobileMenuOpen ? "text-white hover:text-gold" : `${textColor} ${hoverColor}`
              )}
              aria-label="Open cart"
            >
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gold text-black text-[10px] font-bold flex items-center justify-center px-1">
                    {totalItems}
                  </span>
                )}
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "md:hidden p-2.5 transition-colors z-[60]",
                isMobileMenuOpen ? "text-white hover:text-gold" : `${textColor} ${hoverColor}`
              )}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={cn(
                    "w-full h-0.5 bg-current transition-all duration-300 origin-center",
                    isMobileMenuOpen && "rotate-45 translate-y-[9px]"
                  )}
                />
                <span
                  className={cn(
                    "w-full h-0.5 bg-current transition-all duration-300",
                    isMobileMenuOpen && "opacity-0 scale-x-0"
                  )}
                />
                <span
                  className={cn(
                    "w-full h-0.5 bg-current transition-all duration-300 origin-center",
                    isMobileMenuOpen && "-rotate-45 -translate-y-[9px]"
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Full Screen */}
      <div
        className={cn(
          "fixed inset-0 bg-black z-40 md:hidden transition-all duration-500 ease-out",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        {/* Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="flex flex-col h-full pt-36 pb-8 px-8">
          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 flex-1">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "group py-5 flex items-center justify-between",
                  "transform transition-all duration-500",
                  isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                )}
                style={{ transitionDelay: `${150 + index * 100}ms` }}
              >
                <span className="text-3xl font-black uppercase tracking-wider text-white group-active:text-gold transition-colors">
                  {item.name}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-gray-700 group-hover:bg-gold group-hover:w-12 transition-all" />
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className={cn(
            "mt-auto pt-8 border-t border-gold/30 transition-all duration-500",
            isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )} style={{ transitionDelay: "500ms" }}>
            {/* Featured Product - Clean CTA Style */}
            <Link
              href="/shop/vino-gang-x-weingut-kopp-bianco-neve-blanc-de-blancs-2023-weisswein"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mb-8 group"
            >
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-gold text-black text-[10px] font-bold uppercase">Sale</span>
                    <span className="text-gold text-[10px] font-bold uppercase tracking-wider">Bestseller</span>
                  </div>
                  <p className="text-white text-lg font-bold mb-1 group-hover:text-gold transition-colors">Bianco Neve 2023</p>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm line-through">€15,90</span>
                    <span className="text-gold text-lg font-black">€13,90</span>
                  </div>
                </div>
                <div className="px-5 py-3 bg-gold text-black text-sm font-bold uppercase tracking-wider group-hover:bg-white transition-colors">
                  Jetzt Kaufen
                </div>
              </div>
            </Link>

            {/* Social Links */}
            <div className="flex items-center gap-4 mb-6">
              <a
                href="https://instagram.com/vinogang"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-gray-700 flex items-center justify-center text-white hover:text-gold hover:border-gold transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@vinogang"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-gray-700 flex items-center justify-center text-white hover:text-gold hover:border-gold transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </a>
              <span className="text-gray-500 text-sm">@vinogang</span>
            </div>

            {/* Tagline */}
            <p className="text-[10px] text-gold uppercase tracking-[0.3em]">
              Urban · Jung · Laut · Gemeinschaft
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
