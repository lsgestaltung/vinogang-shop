import { notFound } from "next/navigation";
import { ClothingProductDetail } from "@/app/shop/[handle]/ClothingProductDetail";
import { generateProductMetadata } from "@/lib/seo";
import { ProductSchema, BreadcrumbSchema, OrganizationSchema } from "@/components/seo/StructuredData";
import type { Metadata } from "next";
import type { Product } from "@/lib/shopify";

interface ClothingProductPageProps {
  params: Promise<{ handle: string }>;
}

// Placeholder clothing products (same as clothing/page.tsx)
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

const clothingProducts: Record<string, Product> = {
  "communion-shirt": {
    id: "placeholder-communion",
    handle: "communion-shirt",
    title: "Communion Shirt",
    description: "Das letzte Abendmahl. Wein für alle. Unser meistverkauftes Shirt vereint Religion und Urban Culture zu einem einzigartigen Statement.",
    descriptionHtml: "<p>Das letzte Abendmahl. Wein für alle. Unser meistverkauftes Shirt vereint Religion und Urban Culture zu einem einzigartigen Statement.</p>",
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
  },
  "reben-shirt": {
    id: "placeholder-reben",
    handle: "reben-shirt",
    title: "Reben Shirt",
    description: "Verwurzelt. Stark. Echt. Die Rebe als Symbol für Wachstum und Verbundenheit. Ein Shirt für alle, die zur Gang gehören.",
    descriptionHtml: "<p>Verwurzelt. Stark. Echt. Die Rebe als Symbol für Wachstum und Verbundenheit.</p>",
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
    ],
    variants: createClothingVariants("reben"),
    seo: { title: "Reben Shirt | Vinogang", description: "Verwurzelt. Stark. Echt." },
    metafields: {},
  },
  "barrel-shirt": {
    id: "placeholder-barrel",
    handle: "barrel-shirt",
    title: "Barrel Shirt",
    description: "Aged to Perfection. Wie guter Wein – besser mit der Zeit. Das Barrel Shirt für echte Kenner.",
    descriptionHtml: "<p>Aged to Perfection. Wie guter Wein – besser mit der Zeit.</p>",
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
  },
};

// Generate static params
export function generateStaticParams() {
  return Object.keys(clothingProducts).map((handle) => ({
    handle,
  }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: ClothingProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = clothingProducts[handle];

  if (!product) {
    return {
      title: "Produkt nicht gefunden | Vinogang",
    };
  }

  return generateProductMetadata(product, `https://vinogang.de/clothing/${handle}`);
}

export default async function ClothingProductPage({ params }: ClothingProductPageProps) {
  const { handle } = await params;
  const product = clothingProducts[handle];

  if (!product) {
    notFound();
  }

  const productUrl = `https://vinogang.de/clothing/${handle}`;

  return (
    <>
      <OrganizationSchema />
      <ProductSchema product={product} url={productUrl} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://vinogang.de" },
          { name: "Clothing", url: "https://vinogang.de/clothing" },
          { name: product.title, url: productUrl },
        ]}
      />
      <ClothingProductDetail product={product} />
    </>
  );
}
