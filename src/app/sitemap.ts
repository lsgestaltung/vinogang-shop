import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vinogang.de";

  // Static pages
  const staticPages = [
    "",
    "/shop",
    "/events",
    "/agb",
    "/impressum",
    "/datenschutz",
    "/faq",
  ];

  // Product pages
  const products = [
    "/shop/barrel-shirt",
    "/shop/reben-shirt",
    "/shop/communion-shirt",
    "/shop/vinogang-la-fleur-rose-spatburgunder-2024",
  ];

  return [
    ...staticPages.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...products.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
  ];
}
