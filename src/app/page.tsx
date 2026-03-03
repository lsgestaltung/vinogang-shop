import { Hero } from "@/components/sections/Hero";
import { Bestseller } from "@/components/sections/Bestseller";
import { ClothingCTA } from "@/components/sections/ClothingCTA";
import { AboutSection } from "@/components/sections/AboutSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { getProducts } from "@/lib/shopify";

export default async function HomePage() {
  // Fetch products from Shopify (Wine only - Clothing is separate shop)
  let bestseller = null;

  try {
    const allProducts = await getProducts({ first: 10 });
    bestseller = allProducts.find((p) =>
      p.handle.toLowerCase().includes("bianco") ||
      p.productType.toLowerCase().includes("wine")
    );
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Bestseller Section */}
      <Bestseller product={bestseller || undefined} />

      {/* Clothing CTA - Full width landscape image */}
      <ClothingCTA />

      {/* About Us / Founders Section */}
      <AboutSection />

      {/* Events Section */}
      <EventsSection />

      {/* Community / Instagram Section */}
      <CommunitySection />
    </>
  );
}
