import type { Metadata } from "next";
import type { Product } from "@/lib/shopify";

const SITE_NAME = "Vinogang";
const SITE_URL = "https://vinogang.de";
const DEFAULT_OG_IMAGE = "/og-image.jpg";

// Meta Title Generator
export function generateProductTitle(product: Product): string {
  return `${product.title} – Urbaner Wein | ${SITE_NAME}`;
}

// Meta Description Generator - Emotional + Keyword + CTA
export function generateProductDescription(product: Product): string {
  const handle = product.handle.toLowerCase();

  if (handle.includes("bianco") || handle.includes("blanc")) {
    return "Bianco Neve Blanc de Blancs 2023 – Frisch, elegant, urban. Der Weißwein für unvergessliche Sommernächte. ✓ Premium Qualität ✓ Versand in 1-3 Tagen. Jetzt entdecken!";
  }
  if (handle.includes("rose") || handle.includes("rosé") || handle.includes("fleur")) {
    return "La Fleur Rosé Spätburgunder 2024 – Leicht, fruchtig, perfekt für Rooftop-Abende. ✓ Limitierte Edition ✓ Aus Deutschland. Jetzt Teil der Gang werden!";
  }
  if (handle.includes("bundle")) {
    return "Das Vinogang Bundle: Bianco Neve + La Fleur Rosé zum Vorteilspreis. ✓ Spare 2€ ✓ Perfekt für Events ✓ Versand in 1-3 Tagen. Jetzt sichern!";
  }
  return `${product.title} – Urban Wine für besondere Momente. ✓ Premium Qualität ✓ Schneller Versand. Werde Teil der Gang!`;
}

// Generate full product metadata
export function generateProductMetadata(product: Product, url: string): Metadata {
  const title = generateProductTitle(product);
  const description = generateProductDescription(product);
  const imageUrl = product.featuredImage?.url || `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  return {
    title,
    description,
    keywords: [
      product.title,
      "Vinogang",
      "Urban Wine",
      ...product.tags,
    ],
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      locale: "de_DE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Collection/Category Metadata
export function generateCollectionMetadata(collection: "wine" | "all"): Metadata {
  const configs = {
    wine: {
      title: "Urbane Weine – Blanc de Blancs & Rosé | Vinogang Shop",
      description: "Entdecke unsere handverlesene Weinkollektion. Bianco Neve & La Fleur Rosé – Urban Wine ohne Staub. ✓ Premium Qualität ✓ Schneller Versand. Join the Gang!",
      url: `${SITE_URL}/wein`,
    },
    all: {
      title: "Shop – Wein | Vinogang",
      description: "Der Vinogang Shop: Urbane Weine mit Attitude. ✓ Bianco Neve ✓ La Fleur Rosé. Entdecke die Collection!",
      url: `${SITE_URL}/shop`,
    },
  };

  const config = configs[collection];

  return {
    title: config.title,
    description: config.description,
    openGraph: {
      title: config.title,
      description: config.description,
      url: config.url,
      siteName: SITE_NAME,
      locale: "de_DE",
      type: "website",
    },
    alternates: {
      canonical: config.url,
    },
  };
}

// Blog/Content Metadata
export function generateBlogMetadata(title: string, description: string, slug: string): Metadata {
  return {
    title: `${title} | Vinogang Blog`,
    description,
    openGraph: {
      title: `${title} | Vinogang Blog`,
      description,
      url: `${SITE_URL}/blog/${slug}`,
      siteName: SITE_NAME,
      locale: "de_DE",
      type: "article",
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
  };
}

// Robots.txt content
export const ROBOTS_TXT = `# Vinogang Robots.txt
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml

# Disallow admin and API routes
Disallow: /api/
Disallow: /checkout/
Disallow: /_next/
`;

// Generate sitemap URLs
export function generateSitemapUrls(products: Product[]): string[] {
  const staticUrls = [
    SITE_URL,
    `${SITE_URL}/shop`,
    `${SITE_URL}/wein`,
    `${SITE_URL}/events`,
    `${SITE_URL}/ueber-uns`,
  ];

  const productUrls = products.map((product) => {
    return `${SITE_URL}/shop/${product.handle}`;
  });

  return [...staticUrls, ...productUrls];
}
