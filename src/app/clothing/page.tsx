import { Suspense } from "react";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { generateCollectionMetadata } from "@/lib/seo";
import { OrganizationSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";
import type { Product } from "@/lib/shopify";

export const metadata = generateCollectionMetadata("clothing");

// Placeholder clothing products
const createClothingVariants = (baseId: string) => {
  const sizes = ["S", "M", "L", "XL"];
  const colors = ["Schwarz", "Weiß"];
  return sizes.flatMap((size, sizeIdx) =>
    colors.map((color, colorIdx) => ({
      id: `${baseId}-${sizeIdx}-${colorIdx}`,
      title: `${size} / ${color}`,
      availableForSale: true,
      quantityAvailable: 10,
      price: 35,
      compareAtPrice: null,
      selectedOptions: [
        { name: "Größe", value: size },
        { name: "Farbe", value: color },
      ],
      image: null,
    }))
  );
};

const clothingProducts: Product[] = [
  {
    id: "placeholder-communion",
    handle: "communion-shirt",
    title: "Communion Shirt",
    description: "Das letzte Abendmahl. Wein für alle. Unser meistverkauftes Shirt.",
    descriptionHtml: "<p>Das letzte Abendmahl. Wein für alle.</p>",
    availableForSale: true,
    productType: "Clothing",
    tags: ["t-shirt", "clothing", "communion"],
    options: [
      { id: "opt-size-1", name: "Größe", values: ["S", "M", "L", "XL"] },
      { id: "opt-color-1", name: "Farbe", values: ["Schwarz", "Weiß"] },
    ],
    price: 35,
    compareAtPrice: null,
    priceRange: { min: 35, max: 35 },
    featuredImage: { url: "/images/models/jesus-female-1.jpg", altText: "Communion Shirt", width: 800, height: 1000 },
    images: [{ url: "/images/models/jesus-female-1.jpg", altText: "Communion Shirt", width: 800, height: 1000 }],
    variants: createClothingVariants("communion"),
    seo: { title: "Communion Shirt | Vinogang", description: "Das letzte Abendmahl. Wein für alle." },
    metafields: {},
  },
  {
    id: "placeholder-reben",
    handle: "reben-shirt",
    title: "Reben Shirt",
    description: "Verwurzelt. Stark. Echt. Die Rebe als Symbol für Wachstum.",
    descriptionHtml: "<p>Verwurzelt. Stark. Echt.</p>",
    availableForSale: true,
    productType: "Clothing",
    tags: ["t-shirt", "clothing", "reben"],
    options: [
      { id: "opt-size-2", name: "Größe", values: ["S", "M", "L", "XL"] },
      { id: "opt-color-2", name: "Farbe", values: ["Schwarz", "Weiß"] },
    ],
    price: 35,
    compareAtPrice: null,
    priceRange: { min: 35, max: 35 },
    featuredImage: { url: "/images/models/reben-female-1.jpg", altText: "Reben Shirt", width: 800, height: 1000 },
    images: [{ url: "/images/models/reben-female-1.jpg", altText: "Reben Shirt", width: 800, height: 1000 }],
    variants: createClothingVariants("reben"),
    seo: { title: "Reben Shirt | Vinogang", description: "Verwurzelt. Stark. Echt." },
    metafields: {},
  },
  {
    id: "placeholder-barrel",
    handle: "barrel-shirt",
    title: "Barrel Shirt",
    description: "Aged to Perfection. Wie guter Wein – besser mit der Zeit.",
    descriptionHtml: "<p>Aged to Perfection.</p>",
    availableForSale: true,
    productType: "Clothing",
    tags: ["t-shirt", "clothing", "barrel"],
    options: [
      { id: "opt-size-3", name: "Größe", values: ["S", "M", "L", "XL"] },
      { id: "opt-color-3", name: "Farbe", values: ["Schwarz", "Weiß"] },
    ],
    price: 35,
    compareAtPrice: null,
    priceRange: { min: 35, max: 35 },
    featuredImage: { url: "/images/models/barrel-male-1.jpg", altText: "Barrel Shirt", width: 800, height: 1000 },
    images: [{ url: "/images/models/barrel-male-1.jpg", altText: "Barrel Shirt", width: 800, height: 1000 }],
    variants: createClothingVariants("barrel"),
    seo: { title: "Barrel Shirt | Vinogang", description: "Aged to Perfection." },
    metafields: {},
  },
];

export default function ClothingPage() {
  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://vinogang.de" },
          { name: "Clothing", url: "https://vinogang.de/clothing" },
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
              <span className="text-[20vw] font-black text-white whitespace-nowrap">
                CLOTHING
              </span>
            </div>
          </div>

          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-gold" />
                <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">
                  Streetwear Collection
                </span>
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-6">
                WEAR THE <span className="text-gold">MOVEMENT</span>
              </h1>
              <p className="text-white/60 text-lg md:text-xl max-w-xl">
                Mehr als nur Streetwear. Ein Statement.
                Premium Baumwolle, limitierte Stückzahlen.
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
                <span className="font-bold text-black">{clothingProducts.length}</span>
                <span>Produkte</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% Premium Cotton</span>
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
              <ProductGrid products={clothingProducts} columns={3} />
            </Suspense>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gold py-16 md:py-20">
          <div className="container-wide">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-black mb-2">
                  Du brauchst Hilfe bei der Größe?
                </h2>
                <p className="text-black/60">
                  Check unseren Size Guide oder schreib uns.
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
