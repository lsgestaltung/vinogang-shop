import { notFound } from "next/navigation";
import { getProductByHandle, getProducts, getProductRecommendations } from "@/lib/shopify";
import type { Product } from "@/lib/shopify";
import { WineProductDetail } from "./WineProductDetail";
import { ClothingProductDetail } from "./ClothingProductDetail";
import { ProductGrid } from "@/components/shop/ProductGrid";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

// Placeholder clothing products - will be replaced by Shopify API data
const createClothingVariants = (baseId: string) => {
  const sizes = ["S", "M", "L", "XL"];
  const colors = ["Schwarz", "Weiß"];
  return sizes.flatMap((size, sizeIdx) =>
    colors.map((color, colorIdx) => ({
      id: `${baseId}-${sizeIdx}-${colorIdx}`,
      availableForSale: true,
      price: 35,
      compareAtPrice: null,
      selectedOptions: [
        { name: "Größe", value: size },
        { name: "Farbe", value: color },
      ],
    }))
  );
};

const placeholderClothingProducts: Record<string, Product> = {
  "communion-shirt": {
    id: "placeholder-communion",
    handle: "communion-shirt",
    title: "Communion Shirt",
    description: "Das letzte Abendmahl. Wein für alle. Unser meistverkauftes Shirt vereint Religion und Urban Culture.",
    descriptionHtml: "<p>Das letzte Abendmahl. Wein für alle.</p><p>Unser meistverkauftes Shirt vereint Religion und Urban Culture zu einem einzigartigen Statement. Premium Bio-Baumwolle mit hochwertigem Siebdruck.</p>",
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
    images: [
      { url: "/images/models/jesus-female-1.jpg", altText: "Communion Shirt Female", width: 800, height: 1000 },
    ],
    variants: createClothingVariants("communion"),
    seo: { title: "Communion Shirt | Vinogang", description: "Das letzte Abendmahl. Wein für alle." },
    metafields: {},
  } as Product,
  "reben-shirt": {
    id: "placeholder-reben",
    handle: "reben-shirt",
    title: "Reben Shirt",
    description: "Verwurzelt. Stark. Echt. Die Rebe als Symbol für Wachstum und Verbundenheit.",
    descriptionHtml: "<p>Verwurzelt. Stark. Echt.</p><p>Die Rebe als Symbol für Wachstum und Verbundenheit. Ein Shirt für alle, die zur Gang gehören. Premium Bio-Baumwolle mit hochwertigem Siebdruck.</p>",
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
    images: [
      { url: "/images/models/reben-female-1.jpg", altText: "Reben Shirt Female", width: 800, height: 1000 },
      { url: "/images/models/reben-male-1.jpg", altText: "Reben Shirt Male", width: 800, height: 1000 },
    ],
    variants: createClothingVariants("reben"),
    seo: { title: "Reben Shirt | Vinogang", description: "Verwurzelt. Stark. Echt." },
    metafields: {},
  } as Product,
  "barrel-shirt": {
    id: "placeholder-barrel",
    handle: "barrel-shirt",
    title: "Barrel Shirt",
    description: "Aged to Perfection. Wie guter Wein – besser mit der Zeit.",
    descriptionHtml: "<p>Aged to Perfection.</p><p>Wie guter Wein – besser mit der Zeit. Das Barrel Shirt für echte Kenner. Premium Bio-Baumwolle mit hochwertigem Siebdruck.</p>",
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
    images: [
      { url: "/images/models/barrel-male-1.jpg", altText: "Barrel Shirt Male", width: 800, height: 1000 },
      { url: "/images/models/barrel-female-1.jpg", altText: "Barrel Shirt Female", width: 800, height: 1000 },
    ],
    variants: createClothingVariants("barrel"),
    seo: { title: "Barrel Shirt | Vinogang", description: "Aged to Perfection." },
    metafields: {},
  } as Product,
};

// Get all placeholder handles for static generation
const placeholderHandles = Object.keys(placeholderClothingProducts);

export async function generateStaticParams() {
  try {
    const products = await getProducts({ first: 100 });
    const shopifyHandles = products.map((product) => ({
      handle: product.handle,
    }));
    // Add placeholder clothing handles
    const placeholderParams = placeholderHandles.map((handle) => ({ handle }));
    return [...shopifyHandles, ...placeholderParams];
  } catch {
    // Return at least placeholder handles
    return placeholderHandles.map((handle) => ({ handle }));
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;

  // Check for placeholder product first
  const placeholderProduct = placeholderClothingProducts[handle];
  if (placeholderProduct) {
    return {
      title: placeholderProduct.seo.title || placeholderProduct.title,
      description: placeholderProduct.seo.description || placeholderProduct.description,
      openGraph: {
        title: placeholderProduct.title,
        description: placeholderProduct.description,
        images: placeholderProduct.featuredImage
          ? [
              {
                url: placeholderProduct.featuredImage.url,
                width: placeholderProduct.featuredImage.width,
                height: placeholderProduct.featuredImage.height,
                alt: placeholderProduct.featuredImage.altText,
              },
            ]
          : [],
      },
    };
  }

  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: "Produkt nicht gefunden",
    };
  }

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.featuredImage
        ? [
            {
              url: product.featuredImage.url,
              width: product.featuredImage.width,
              height: product.featuredImage.height,
              alt: product.featuredImage.altText,
            },
          ]
        : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;

  // Check for placeholder clothing product first
  const placeholderProduct = placeholderClothingProducts[handle];
  if (placeholderProduct) {
    return (
      <div>
        <ClothingProductDetail product={placeholderProduct} />
      </div>
    );
  }

  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  // Fetch recommendations
  let recommendations: Product[] = [];
  try {
    recommendations = await getProductRecommendations(product.id);
  } catch {
    // Silently fail - recommendations are optional
  }

  // Determine if this is a wine or clothing product
  // Check handle for wine-related terms since Shopify productType might not be set
  const handleLower = product.handle.toLowerCase();
  const wineTerms = ["wine", "wein", "bianco", "rosé", "rose", "blanc", "weisswein", "rotwein", "spätburgunder", "spatburgunder", "riesling", "chardonnay", "pinot", "fleur"];
  const clothingTerms = ["shirt", "hoodie", "cap", "hat", "tshirt", "t-shirt", "clothing", "merch", "communion", "reben", "barrel"];

  const hasWineTerm = wineTerms.some(term => handleLower.includes(term));
  const hasClothingTerm = clothingTerms.some(term => handleLower.includes(term));

  const isWine =
    (hasWineTerm && !hasClothingTerm) ||
    product.productType.toLowerCase().includes("wine") ||
    product.productType.toLowerCase().includes("wein") ||
    product.tags.some((t) => t.toLowerCase().includes("wine"));

  return (
    <div>
      {/* Product Detail */}
      {isWine ? (
        <WineProductDetail product={product} />
      ) : (
        <ClothingProductDetail product={product} />
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container-wide">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-px bg-gold" />
                <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">
                  Empfehlungen
                </span>
                <div className="w-8 h-px bg-gold" />
              </div>
              <h2 className="text-3xl font-black">
                Das könnte dir auch gefallen
              </h2>
            </div>
            <ProductGrid products={recommendations.slice(0, 4)} columns={4} />
          </div>
        </section>
      )}
    </div>
  );
}
