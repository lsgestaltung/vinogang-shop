import { Suspense } from "react";
import { getProducts } from "@/lib/shopify";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { generateCollectionMetadata } from "@/lib/seo";
import { OrganizationSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";
import type { Product } from "@/lib/shopify";

export const metadata = generateCollectionMetadata("wine");

async function getWineProducts(): Promise<Product[]> {
  try {
    const allProducts = await getProducts({ first: 50 });
    // Filter for wine products
    return allProducts.filter(
      (p) =>
        p.productType?.toLowerCase().includes("wine") ||
        p.tags?.some((tag) =>
          ["wine", "wein", "rosé", "weisswein", "rotwein"].includes(tag.toLowerCase())
        )
    );
  } catch (error) {
    console.error("Error fetching wine products:", error);
    return [];
  }
}

export default async function WeinPage() {
  const products = await getWineProducts();

  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://vinogang.de" },
          { name: "Wein", url: "https://vinogang.de/wein" },
        ]}
      />

      <div className="bg-white min-h-screen">
        {/* Hero Header */}
        <div className="relative bg-black pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 border border-gold/20 rotate-45 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 border border-gold/20 -rotate-12 -translate-x-1/2 translate-y-1/2" />
            {/* Large typography background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
              <span className="text-[25vw] font-black text-white whitespace-nowrap">
                WEIN
              </span>
            </div>
          </div>

          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-gold" />
                <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">
                  Die Kollektion
                </span>
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-6">
                URBANER <span className="text-gold">WEIN</span>
              </h1>
              <p className="text-white/60 text-lg md:text-xl max-w-xl">
                Wein ohne Staub. Handverlesen aus deutschen Weingütern.
                Für Momente, die man nie vergisst.
              </p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="py-16 md:py-24">
          <div className="container-wide">
            {/* Stats */}
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="font-bold text-black">{products.length}</span>
                <span>Weine</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Aus Deutschland</span>
              </div>
            </div>

            <Suspense
              fallback={
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-[3/4] bg-gray-100 animate-pulse" />
                  ))}
                </div>
              }
            >
              {products.length > 0 ? (
                <ProductGrid products={products} columns={3} />
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg mb-4">
                    Aktuell keine Weine verfügbar.
                  </p>
                  <a href="/" className="text-gold font-bold hover:underline">
                    Zur Startseite
                  </a>
                </div>
              )}
            </Suspense>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gold py-16 md:py-20">
          <div className="container-wide">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-black mb-2">
                  Fragen zu unseren Weinen?
                </h2>
                <p className="text-black/60">
                  Wir beraten dich gerne persönlich.
                </p>
              </div>
              <a
                href="/contact"
                className="px-8 py-4 bg-black text-gold font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-colors"
              >
                Kontakt
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
