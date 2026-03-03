"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/shopify";
import { formatPrice } from "@/lib/utils";

interface CrossSellingProps {
  currentProduct: Product;
  products: Product[];
  title?: string;
  subtitle?: string;
}

// Main Cross-Selling Component
export function CrossSelling({
  currentProduct,
  products,
  title = "Passt perfekt dazu",
  subtitle = "Complete the Vibe",
}: CrossSellingProps) {
  // Filter out current product and get up to 3 recommendations
  const recommendations = products
    .filter((p) => p.id !== currentProduct.id)
    .slice(0, 3);

  if (recommendations.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-gold" />
            <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">
              {subtitle}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-black">
            {title}
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((product) => (
            <CrossSellCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Cross-Sell Card
function CrossSellCard({ product }: { product: Product }) {
  const isWine = product.productType?.toLowerCase().includes("wine") ||
                 product.tags?.some(tag => ["wine", "wein", "rosé", "weisswein"].includes(tag.toLowerCase()));

  const urlPrefix = isWine ? "/wein" : "/clothing";

  return (
    <Link
      href={`${urlPrefix}/${product.handle}`}
      className="group bg-white border border-gray-200 hover:border-gold transition-colors"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {product.featuredImage && (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <span className="bg-gold px-6 py-2 text-black font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
            Ansehen
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-black group-hover:text-gold transition-colors mb-1 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-gold font-bold">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}

// Wine + Clothing Pairing Component
export function WineClothingPairing({
  wineProduct,
  clothingProducts,
}: {
  wineProduct: Product;
  clothingProducts: Product[];
}) {
  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-gold" />
              <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">
                The Complete Vibe
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              WEIN TRIFFT <span className="text-gold">STREETWEAR</span>
            </h2>

            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Der perfekte Abend braucht mehr als nur guten Wein.
              Kombiniere {wineProduct.title} mit unserer Streetwear
              für das ultimative Vinogang Erlebnis.
            </p>

            {/* Bundle Suggestion */}
            <div className="bg-white/5 border border-gold/30 p-6 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 relative">
                  {wineProduct.featuredImage && (
                    <Image
                      src={wineProduct.featuredImage.url}
                      alt={wineProduct.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <span className="text-2xl text-gold">+</span>
                <div className="w-16 h-16 relative bg-white/10">
                  {clothingProducts[0]?.featuredImage && (
                    <Image
                      src={clothingProducts[0].featuredImage.url}
                      alt={clothingProducts[0].title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold">Zusammen kaufen</p>
                  <p className="text-gold text-sm">Spare bei der Kombination</p>
                </div>
              </div>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-4 group"
            >
              <span className="text-gold font-bold uppercase tracking-wider group-hover:tracking-widest transition-all">
                Zum Shop
              </span>
              <div className="w-10 h-10 border-2 border-gold flex items-center justify-center group-hover:bg-gold transition-colors">
                <svg className="w-4 h-4 text-gold group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Clothing Grid */}
          <div className="grid grid-cols-2 gap-4">
            {clothingProducts.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                href={`/clothing/${product.handle}`}
                className="group relative aspect-[3/4] overflow-hidden"
              >
                {product.featuredImage && (
                  <Image
                    src={product.featuredImage.url}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-sm line-clamp-1">{product.title}</p>
                  <p className="text-gold text-sm">{formatPrice(product.price)}</p>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Bundle Highlight Component
interface BundleHighlightProps {
  bundle: Product;
  products: Product[];
  savings: number;
}

export function BundleHighlight({ bundle, products, savings }: BundleHighlightProps) {
  const individualTotal = products.reduce((sum, p) => sum + p.price, 0);

  return (
    <section className="py-16 md:py-20 bg-gold">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <div className="flex items-center justify-center gap-4">
            {products.map((product, i) => (
              <div key={product.id} className="relative">
                <div className={cn(
                  "relative w-32 md:w-48 aspect-[3/4] bg-black",
                  i === 1 && "-ml-8 md:-ml-12"
                )}>
                  {product.featuredImage && (
                    <Image
                      src={product.featuredImage.url}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                {i === 0 && (
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-black flex items-center justify-center">
                    <span className="text-gold text-xl font-black">+</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Content */}
          <div>
            <div className="inline-block bg-black px-4 py-2 mb-6">
              <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">
                Bundle Deal
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              {bundle.title}
            </h2>

            <p className="text-black/70 text-lg mb-6">
              Spare {formatPrice(savings)} beim Kauf des Bundles.
              Perfekt für deine nächste Party oder als Geschenk.
            </p>

            {/* Price Comparison */}
            <div className="flex items-center gap-6 mb-8">
              <div>
                <p className="text-sm text-black/50 line-through">
                  Einzeln: {formatPrice(individualTotal)}
                </p>
                <p className="text-3xl font-black text-black">
                  Bundle: {formatPrice(bundle.price)}
                </p>
              </div>
              <div className="bg-black px-4 py-2">
                <span className="text-gold font-bold">
                  -{formatPrice(savings)}
                </span>
              </div>
            </div>

            <Link
              href={`/wein/${bundle.handle}`}
              className="inline-block px-10 py-4 bg-black text-gold font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-colors"
            >
              Bundle sichern
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Frequently Bought Together
export function FrequentlyBoughtTogether({
  mainProduct,
  additionalProducts,
}: {
  mainProduct: Product;
  additionalProducts: Product[];
}) {
  const total = mainProduct.price + additionalProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="border border-gray-200 p-6 bg-white">
      <h3 className="font-bold text-lg mb-4">Wird oft zusammen gekauft</h3>

      <div className="flex items-center gap-4 mb-6">
        {/* Main Product */}
        <div className="relative w-20 h-20 bg-gray-100">
          {mainProduct.featuredImage && (
            <Image
              src={mainProduct.featuredImage.url}
              alt={mainProduct.title}
              fill
              className="object-cover"
            />
          )}
        </div>

        {additionalProducts.slice(0, 2).map((product) => (
          <div key={product.id} className="flex items-center gap-4">
            <span className="text-gray-400 text-xl">+</span>
            <div className="relative w-20 h-20 bg-gray-100">
              {product.featuredImage && (
                <Image
                  src={product.featuredImage.url}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Gesamtpreis</p>
          <p className="text-xl font-bold text-gold">{formatPrice(total)}</p>
        </div>
        <button className="px-6 py-3 bg-gold text-black font-bold text-sm uppercase tracking-wider hover:bg-black hover:text-gold transition-colors">
          Alle hinzufügen
        </button>
      </div>
    </div>
  );
}
