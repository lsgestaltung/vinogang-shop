import { notFound } from "next/navigation";
import { getProductByHandle, getProducts } from "@/lib/shopify";
import { WineProductDetail } from "@/app/shop/[handle]/WineProductDetail";
import { generateProductMetadata } from "@/lib/seo";
import { ProductSchema, BreadcrumbSchema, OrganizationSchema } from "@/components/seo/StructuredData";
import type { Metadata } from "next";

interface WineProductPageProps {
  params: Promise<{ handle: string }>;
}

// Generate static params for wine products
export async function generateStaticParams() {
  try {
    const products = await getProducts({ first: 50 });
    const wineProducts = products.filter(
      (p) =>
        p.productType?.toLowerCase().includes("wine") ||
        p.tags?.some((tag) =>
          ["wine", "wein", "rosé", "weisswein"].includes(tag.toLowerCase())
        )
    );
    return wineProducts.map((product) => ({
      handle: product.handle,
    }));
  } catch {
    return [];
  }
}

// Generate metadata
export async function generateMetadata({
  params,
}: WineProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: "Produkt nicht gefunden | Vinogang",
    };
  }

  return generateProductMetadata(product, `https://vinogang.de/wein/${handle}`);
}

export default async function WineProductPage({ params }: WineProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const productUrl = `https://vinogang.de/wein/${handle}`;

  return (
    <>
      <OrganizationSchema />
      <ProductSchema product={product} url={productUrl} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://vinogang.de" },
          { name: "Wein", url: "https://vinogang.de/wein" },
          { name: product.title, url: productUrl },
        ]}
      />
      <WineProductDetail product={product} />
    </>
  );
}
