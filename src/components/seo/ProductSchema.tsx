import type { Product } from "@/lib/shopify";

interface ProductSchemaProps {
  product: Product;
}

export function ProductSchema({ product }: ProductSchemaProps) {
  const variant = product.variants[0];
  const price = variant?.price?.toString() || "0";
  const availability = variant?.availableForSale
    ? "https://schema.org/InStock"
    : "https://schema.org/OutOfStock";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images[0]?.url || "",
    brand: {
      "@type": "Brand",
      name: "Vinogang",
    },
    offers: {
      "@type": "Offer",
      price: price,
      priceCurrency: "EUR",
      availability: availability,
      url: `https://vinogang.de/shop/${product.handle}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
