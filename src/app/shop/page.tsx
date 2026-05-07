import { Suspense } from "react";
import { getProducts } from "@/lib/shopify";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { CollectionFilter } from "@/components/shop/CollectionFilter";
import type { Product } from "@/lib/shopify";

interface ShopPageProps {
  searchParams: Promise<{ collection?: string }>;
}

async function getShopProducts(): Promise<Product[]> {
  try {
    // Get all wine products from Shopify
    return await getProducts({ first: 50 });
  } catch (error) {
    console.error("Error fetching shop products:", error);
    return [];
  }
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const collection = params.collection;

  // Get wine products from Shopify
  const wineProducts = await getShopProducts();

  // Determine which products to show
  const products: Product[] = collection === "wine" ? wineProducts : wineProducts;

  // Get collection title and description
  const getCollectionInfo = () => {
    if (collection === "wine") {
      return {
        title: "WINE",
        subtitle: "Wein ohne Staub",
        description: "Unsere handverlesene Weinkollektion. Urban, jung, laut.",
      };
    }
    return {
      title: "SHOP",
      subtitle: "The Collection",
      description: "Wein ohne Staub. Urban, jung, laut.",
    };
  };

  const collectionInfo = getCollectionInfo();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="relative bg-white pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden border-b border-gray-100">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 border border-gold/20 rotate-45 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 border border-gold/20 -rotate-12 -translate-x-1/2 translate-y-1/2" />
          {/* Large typography background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
            <span className="text-[25vw] font-black text-black whitespace-nowrap">
              {collectionInfo.title}
            </span>
          </div>
        </div>

        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-gold" />
              <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">
                {collectionInfo.subtitle}
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-black leading-none mb-6">
              {collectionInfo.title}
            </h1>
            <p className="text-gray-500 text-lg md:text-xl max-w-xl">
              {collectionInfo.description}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="sticky top-20 z-40 bg-white border-b border-gray-200">
        <div className="container-wide">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-bold text-black">{products.length}</span>
              <span>Produkte</span>
            </div>

            <Suspense
              fallback={
                <div className="flex gap-2">
                  <div className="w-16 h-10 bg-gray-200 animate-pulse" />
                  <div className="w-16 h-10 bg-gray-200 animate-pulse" />
                </div>
              }
            >
              <CollectionFilter />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-16 md:py-24">
        <div className="container-wide">
          {products.length > 0 ? (
            <ProductGrid products={products} columns={3} />
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-6 border-2 border-gray-200 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg mb-4">Keine Produkte gefunden.</p>
              <a href="/shop" className="text-gold font-bold hover:underline">
                Alle Produkte anzeigen
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-black py-16 md:py-20">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                Noch Fragen?
              </h3>
              <p className="text-white/50">
                Schreib uns – wir sind für dich da.
              </p>
            </div>
            <a
              href="/contact"
              className="px-8 py-4 bg-gold text-black font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors"
            >
              Kontakt
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Shop | Vinogang",
  description:
    "Entdecke die Vinogang Kollektion - Wein ohne Staub. Urban, jung, laut.",
};
