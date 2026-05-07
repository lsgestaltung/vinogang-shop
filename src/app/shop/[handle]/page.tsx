import { notFound } from "next/navigation";
import { getProductByHandle, getProducts, getProductRecommendations } from "@/lib/shopify";
import type { Product } from "@/lib/shopify";
import { WineProductDetail } from "./WineProductDetail";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductSchema } from "@/components/seo/ProductSchema";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  try {
    const products = await getProducts({ first: 100 });
    return products.map((product) => ({
      handle: product.handle,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;

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

  return (
    <div>
      {/* SEO: Product Schema */}
      <ProductSchema product={product} />

      {/* Product Detail */}
      <WineProductDetail product={product} />

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
