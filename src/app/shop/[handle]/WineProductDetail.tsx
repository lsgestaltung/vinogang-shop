"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { VariantSelector } from "@/components/shop/VariantSelector";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Product, ProductVariant } from "@/lib/shopify";

interface WineProductDetailProps {
  product: Product;
}

// Wine-specific data based on product handle
function getWineType(handle: string): "white" | "rose" {
  if (handle.toLowerCase().includes("rose") || handle.toLowerCase().includes("rosé") || handle.toLowerCase().includes("fleur")) {
    return "rose";
  }
  return "white";
}

function getWineData(handle: string) {
  const wineType = getWineType(handle);

  if (wineType === "rose") {
    return {
      video: "/videos/rose.mp4",
      vibeImages: ["/images/vibe/rose-vibe-1.jpg", "/images/vibe/rose-vibe-2.jpg"],
      landscapeImage: "/images/vibe/rose-landscape-1.jpg",
      tastingNotes: { aroma: "Erdbeere & Hibiskus", charakter: "Fruchtig & Frisch", passt: "Salate & Grillgerichte" },
      year: "2024",
      grape: "Spätburgunder Rosé",
      winery: "Weingut Kopp",
      region: "Rheinhessen",
      alcohol: "12%",
      isDemeter: false,
      color: "rose" as const,
      tagline: "Perfekt für den Sommer",
      shortDescription: "Unser La Fleur Rosé ist der perfekte Begleiter für laue Sommerabende. Fruchtig, frisch und unverwechselbar Vinogang.",
    };
  }

  return {
    video: "/videos/bianconeve.mp4",
    vibeImages: ["/images/vibe/wine-vibe-1.jpg", "/images/vibe/wine-vibe-2.jpg"],
    landscapeImage: "/images/products/wine-landscape-hero.jpg",
    tastingNotes: { aroma: "Zitrus & Blüten", charakter: "Frisch & Elegant", passt: "Fisch & Seafood" },
    year: "2023",
    grape: "Blanc de Blancs",
    winery: "Weingut Kopp",
    region: "Rheinhessen",
    alcohol: "12,5%",
    isDemeter: true,
    color: "white" as const,
    tagline: "Der neue Klassiker",
    shortDescription: "Bianco Neve vereint traditionelles Winzerhandwerk mit urbanem Lifestyle. Ein Wein, der Geschichten erzählt.",
  };
}

export function WineProductDetail({ product }: WineProductDetailProps) {
  const wineInfo = getWineData(product.handle);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // All images including product images
  const allImages = product.images.length > 0
    ? product.images
    : product.featuredImage
      ? [product.featuredImage]
      : [];

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const firstAvailableVariant = product.variants.find((v) => v.availableForSale);
    if (firstAvailableVariant) {
      return firstAvailableVariant.selectedOptions.reduce(
        (acc, opt) => ({ ...acc, [opt.name]: opt.value }),
        {}
      );
    }
    return product.options.reduce(
      (acc, opt) => ({ ...acc, [opt.name]: opt.values[0] }),
      {}
    );
  });

  const selectedVariant = useMemo<ProductVariant | null>(() => {
    return (
      product.variants.find((variant) =>
        variant.selectedOptions.every(
          (opt) => selectedOptions[opt.name] === opt.value
        )
      ) || null
    );
  }, [product.variants, selectedOptions]);

  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  };

  const currentPrice = selectedVariant?.price || product.price;
  const compareAtPrice = selectedVariant?.compareAtPrice || product.compareAtPrice;

  return (
    <div className="bg-white pt-24 md:pt-28 overflow-x-hidden">
      {/* Breadcrumb */}
      <div className="container-wide mb-6">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <span>/</span>
          <Link href="/shop?collection=wine" className="hover:text-gold transition-colors">Wine</Link>
          <span>/</span>
          <span className="text-black font-medium">{product.title}</span>
        </div>
      </div>

      {/* Product Section */}
      <section className="container-wide pb-12 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left - Product Image */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              {/* Main Product Image */}
              <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
                <Image
                  src={allImages[selectedImageIndex]?.url || product.featuredImage?.url || "/images/placeholder.jpg"}
                  alt={allImages[selectedImageIndex]?.altText || product.title}
                  fill
                  className="object-contain p-8"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {wineInfo.isDemeter && (
                    <span className="px-3 py-1.5 bg-green-800 text-white text-xs font-bold uppercase tracking-wider">
                      Demeter
                    </span>
                  )}
                  {compareAtPrice && compareAtPrice > currentPrice && (
                    <span className="px-3 py-1.5 bg-gold text-black text-xs font-bold uppercase tracking-wider">
                      Sale
                    </span>
                  )}
                </div>

                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-gold transition-colors shadow-sm"
                      aria-label="Vorheriges Bild"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-gold transition-colors shadow-sm"
                      aria-label="Nächstes Bild"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Gold corner accents */}
                <div className="absolute bottom-4 right-4">
                  <div className="w-8 h-px bg-gold" />
                  <div className="w-px h-8 bg-gold absolute right-0 bottom-0" />
                </div>

                {/* Image counter */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 text-white text-xs font-bold">
                    {selectedImageIndex + 1} / {allImages.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {allImages.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={img.url}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={cn(
                        "relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 border-2 transition-all",
                        selectedImageIndex === idx
                          ? "border-gold"
                          : "border-gray-200 hover:border-gold opacity-70 hover:opacity-100"
                      )}
                    >
                      <Image
                        src={img.url}
                        alt={img.altText || `${product.title} ${idx + 1}`}
                        fill
                        className="object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="lg:col-span-7">
            {/* Title Section */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-gold" />
                <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">
                  {wineInfo.grape} · {wineInfo.year}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-black leading-tight">
                {product.title}
              </h1>
            </div>

            {/* Price Section */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
              <span className="text-4xl md:text-5xl font-black text-gold">
                {formatPrice(currentPrice)}
              </span>
              {compareAtPrice && compareAtPrice > currentPrice && (
                <>
                  <span className="text-2xl text-gray-400 line-through">
                    {formatPrice(compareAtPrice)}
                  </span>
                  <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold">
                    -{Math.round((1 - currentPrice / compareAtPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Tagline */}
            <p className="text-xl md:text-2xl font-bold text-black mb-4">
              {wineInfo.tagline}
            </p>

            {/* Short Description */}
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {wineInfo.shortDescription}
            </p>

            {/* Full Description with Expand */}
            {product.descriptionHtml && (
              <div className="mb-8">
                <div
                  className={cn(
                    "prose prose-sm max-w-none text-gray-500 overflow-hidden transition-all duration-300",
                    showFullDescription ? "max-h-[500px]" : "max-h-[80px]"
                  )}
                >
                  <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                </div>
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="mt-2 text-sm font-bold text-gold hover:underline flex items-center gap-1"
                >
                  {showFullDescription ? "Weniger anzeigen" : "Mehr lesen"}
                  <svg
                    className={cn(
                      "w-4 h-4 transition-transform",
                      showFullDescription && "rotate-180"
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}

            {/* Tasting Notes - Inline */}
            <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-gray-50">
              <div className="text-center">
                <span className="text-2xl mb-2 block">🍋</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">Aroma</span>
                <span className="font-bold text-sm">{wineInfo.tastingNotes.aroma}</span>
              </div>
              <div className="text-center border-l border-r border-gray-200">
                <span className="text-2xl mb-2 block">✨</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">Charakter</span>
                <span className="font-bold text-sm">{wineInfo.tastingNotes.charakter}</span>
              </div>
              <div className="text-center">
                <span className="text-2xl mb-2 block">🍽️</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">Passt zu</span>
                <span className="font-bold text-sm">{wineInfo.tastingNotes.passt}</span>
              </div>
            </div>

            {/* Variant Selector */}
            {product.options.length > 0 &&
              !(product.options.length === 1 && product.options[0].values.length === 1) && (
                <div className="mb-6">
                  <VariantSelector
                    options={product.options}
                    variants={product.variants}
                    selectedOptions={selectedOptions}
                    onOptionChange={handleOptionChange}
                  />
                </div>
              )}

            {/* Add to Cart Section */}
            <div className="mb-8 p-6 border-2 border-gold bg-gold/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-black text-sm uppercase tracking-wider font-bold">In den Warenkorb</span>
                <span className="text-gold text-2xl font-black">{formatPrice(currentPrice)}</span>
              </div>
              <AddToCartButton product={product} variant={selectedVariant} />
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Kostenloser Versand ab €50</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>14 Tage Rückgabe</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Sichere Zahlung</span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-gray-200 hover:border-gold transition-colors">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">Jahrgang</span>
                <span className="font-bold">{wineInfo.year}</span>
              </div>
              <div className="text-center p-4 border border-gray-200 hover:border-gold transition-colors">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">Rebsorte</span>
                <span className="font-bold text-sm">{wineInfo.grape}</span>
              </div>
              <div className="text-center p-4 border border-gray-200 hover:border-gold transition-colors">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">Region</span>
                <span className="font-bold">{wineInfo.region}</span>
              </div>
              <div className="text-center p-4 border border-gray-200 hover:border-gold transition-colors">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">Alkohol</span>
                <span className="font-bold">{wineInfo.alcohol}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section - Mobile: Full-screen background, Desktop: Grid */}
      {/* Mobile Version - True full-viewport width */}
      <section
        className="lg:hidden relative min-h-screen"
        style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}
      >
        {/* Full-screen Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ minWidth: '100%', minHeight: '100%' }}
          >
            <source src={wineInfo.video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 min-h-screen flex flex-col justify-end px-6 pb-16 pt-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-1 bg-gold" />
            <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">The Story</span>
          </div>
          <h2 className="text-4xl font-black mb-4 leading-tight text-white">
            Wein ohne Staub<br />
            <span className="text-gold">– mit Beat.</span>
          </h2>
          <p className="text-white/80 text-base mb-8 leading-relaxed">
            Vinogang bringt Wein dahin, wo der Winzer nicht hinkommt.
            Wir sind mehr als eine Marke – wir sind eine Bewegung.
          </p>
          <div className="flex items-center gap-6">
            <div>
              <span className="text-gold text-2xl font-black block">{wineInfo.year}</span>
              <span className="text-white/50 text-xs uppercase tracking-wider">Jahrgang</span>
            </div>
            <div className="w-px h-10 bg-gold/30" />
            <div>
              <span className="text-gold text-2xl font-black block">12.5%</span>
              <span className="text-white/50 text-xs uppercase tracking-wider">Alkohol</span>
            </div>
            <div className="w-px h-10 bg-gold/30" />
            <div>
              <span className="text-gold text-2xl font-black block">0.75L</span>
              <span className="text-white/50 text-xs uppercase tracking-wider">Inhalt</span>
            </div>
          </div>

          {/* Gold corners */}
          <div className="absolute top-6 left-6 w-8 h-px bg-gold" />
          <div className="absolute top-6 left-6 w-px h-8 bg-gold" />
          <div className="absolute bottom-6 right-6 w-8 h-px bg-gold" />
          <div className="absolute bottom-6 right-6 w-px h-8 bg-gold" />
        </div>
      </section>

      {/* Desktop Version */}
      <section className="hidden lg:block bg-gray-50 py-20">
        <div className="container-wide">
          <div className="grid grid-cols-2 gap-12 items-center">
            {/* Video */}
            <div className="relative aspect-[9/16] max-h-[600px] overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={wineInfo.video} type="video/mp4" />
              </video>

              {/* Gold corners */}
              <div className="absolute top-4 left-4 w-8 h-px bg-gold" />
              <div className="absolute top-4 left-4 w-px h-8 bg-gold" />
              <div className="absolute bottom-4 right-4 w-8 h-px bg-gold" />
              <div className="absolute bottom-4 right-4 w-px h-8 bg-gold" />
            </div>

            {/* Content */}
            <div className="text-black">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-1 bg-gold" />
                <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">The Story</span>
              </div>
              <h2 className="text-4xl xl:text-5xl font-black mb-6 leading-tight">
                Wein ohne Staub<br />
                <span className="text-gold">– mit Beat.</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Vinogang bringt Wein dahin, wo der Winzer nicht hinkommt.
                Wir sind mehr als eine Marke – wir sind eine Bewegung.
              </p>
              <div className="flex items-center gap-8">
                <div>
                  <span className="text-gold text-3xl font-black block">{wineInfo.year}</span>
                  <span className="text-gray-400 text-sm uppercase tracking-wider">Jahrgang</span>
                </div>
                <div className="w-px h-12 bg-gold/30" />
                <div>
                  <span className="text-gold text-3xl font-black block">12.5%</span>
                  <span className="text-gray-400 text-sm uppercase tracking-wider">Alkohol</span>
                </div>
                <div className="w-px h-12 bg-gold/30" />
                <div>
                  <span className="text-gold text-3xl font-black block">0.75L</span>
                  <span className="text-gray-400 text-sm uppercase tracking-wider">Inhalt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demeter Section - Only for White Wine */}
      {wineInfo.isDemeter && (
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-1 bg-green-700" />
                  <span className="text-green-700 text-xs font-bold uppercase tracking-[0.3em]">
                    Zertifizierung
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-black">
                  Demeter<br />
                  <span className="text-green-700">Qualität</span>
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  Biodynamische Landwirtschaft im Einklang mit der Natur.
                  Höchste Qualität, garantiert.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-lg text-black">
                    <div className="w-2 h-2 bg-green-700" />
                    <span>100% biodynamischer Anbau</span>
                  </li>
                  <li className="flex items-center gap-4 text-lg text-black">
                    <div className="w-2 h-2 bg-green-700" />
                    <span>Keine synthetischen Pestizide</span>
                  </li>
                  <li className="flex items-center gap-4 text-lg text-black">
                    <div className="w-2 h-2 bg-green-700" />
                    <span>Nachhaltige Produktion</span>
                  </li>
                </ul>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={wineInfo.vibeImages[1]}
                  alt="Demeter Weinberg"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 right-6 bg-green-700 px-4 py-2">
                  <span className="text-white text-sm font-bold uppercase tracking-wider">
                    Demeter Certified
                  </span>
                </div>
                {/* Gold corners */}
                <div className="absolute top-4 left-4 w-8 h-px bg-gold" />
                <div className="absolute top-4 left-4 w-px h-8 bg-gold" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 mb-16 bg-gold">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
              Bereit für deinen {product.title.split(" ")[0]}?
            </h2>
            <p className="text-black/70 mb-8 text-lg">
              Hol dir den Geschmack von Vinogang nach Hause.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <span className="text-3xl font-black text-black">
                {formatPrice(currentPrice)}
              </span>
              <div className="w-full sm:w-auto">
                <AddToCartButton product={product} variant={selectedVariant} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
