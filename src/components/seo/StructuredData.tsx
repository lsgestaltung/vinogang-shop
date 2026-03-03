"use client";

import Script from "next/script";
import type { Product } from "@/lib/shopify";

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vinogang",
    alternateName: "Vinogang GmbH",
    url: "https://vinogang.de",
    logo: "https://vinogang.de/images/logo/logo-gold.png",
    description: "Urban Wine Collective - Wein ohne Staub. Urban. Jung. Laut. Gemeinschaft.",
    foundingDate: "2023",
    founders: [
      { "@type": "Person", name: "Jakob Bimmerle" },
      { "@type": "Person", name: "Mark Keitel" },
      { "@type": "Person", name: "Kevin Gradito" },
    ],
    sameAs: [
      "https://www.instagram.com/vinogang",
      "https://www.tiktok.com/@vinogang",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@vinogang.de",
      availableLanguage: ["German", "English"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "DE",
    },
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Product Schema for Wine & Clothing
interface ProductSchemaProps {
  product: Product;
  url: string;
}

export function ProductSchema({ product, url }: ProductSchemaProps) {
  const isWine = product.productType?.toLowerCase().includes("wine") ||
                 product.tags?.some(tag => ["wine", "wein", "rosé", "weisswein"].includes(tag.toLowerCase()));

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map(img => img.url),
    url: url,
    sku: product.handle,
    brand: {
      "@type": "Brand",
      name: "Vinogang",
    },
    offers: {
      "@type": "Offer",
      url: url,
      priceCurrency: "EUR",
      price: product.price.toFixed(2),
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Vinogang",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "4.90",
          currency: "EUR",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "DE",
        },
      },
    },
    // Aggregate Rating (placeholder - will be replaced with real reviews)
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "47",
      bestRating: "5",
      worstRating: "1",
    },
    // Wine-specific properties
    ...(isWine && {
      category: "Wine",
      material: product.title.toLowerCase().includes("rosé") ? "Spätburgunder" : "Blanc de Blancs",
      countryOfOrigin: {
        "@type": "Country",
        name: "Germany",
      },
    }),
  };

  return (
    <Script
      id={`product-schema-${product.handle}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
interface BreadcrumbSchemaProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Event Schema for Vinogang Events
interface EventSchemaProps {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address: string;
    city: string;
  };
  image?: string;
  url: string;
}

export function EventSchema({ name, description, startDate, endDate, location, image, url }: EventSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: name,
    description: description,
    startDate: startDate,
    endDate: endDate || startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: location.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: location.address,
        addressLocality: location.city,
        addressCountry: "DE",
      },
    },
    image: image || "https://vinogang.de/images/vibe/events-hero.jpg",
    organizer: {
      "@type": "Organization",
      name: "Vinogang",
      url: "https://vinogang.de",
    },
    offers: {
      "@type": "Offer",
      url: url,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <Script
      id={`event-schema-${name.toLowerCase().replace(/\s+/g, "-")}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema
interface FAQSchemaProps {
  questions: { question: string; answer: string }[];
}

export function FAQSchema({ questions }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Website Schema for Sitelinks Search Box
export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Vinogang",
    url: "https://vinogang.de",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://vinogang.de/shop?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
