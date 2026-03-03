"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { VariantSelector } from "@/components/shop/VariantSelector";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Product, ProductVariant } from "@/lib/shopify";

interface ClothingProductDetailProps {
  product: Product;
}

// Lookbook/Querformat images for each product
interface LookbookImage {
  src: string;
  alt: string;
  gender: "male" | "female" | "both";
}

function getLookbookImages(handle: string): LookbookImage[] {
  const handleLower = handle.toLowerCase();

  if (handleLower.includes("communion") || handleLower.includes("jesus")) {
    return [
      { src: "/images/models/lookbook/communion/female-1.jpg", alt: "Communion Shirt Lookbook", gender: "female" },
      { src: "/images/models/lookbook/communion/female-2.jpg", alt: "Communion Shirt Lookbook", gender: "female" },
      { src: "/images/models/lookbook/communion/female-3.jpg", alt: "Communion Shirt Lookbook", gender: "female" },
    ];
  }

  if (handleLower.includes("reben")) {
    return [
      { src: "/images/models/lookbook/reben/female-1.jpg", alt: "Reben Shirt Lookbook", gender: "female" },
      { src: "/images/models/lookbook/reben/female-2.jpg", alt: "Reben Shirt Lookbook", gender: "female" },
    ];
  }

  if (handleLower.includes("barrel") || handleLower.includes("fass")) {
    return [
      { src: "/images/models/lookbook/barrel/male-1.jpg", alt: "Barrel Shirt Lookbook Male", gender: "male" },
      { src: "/images/models/lookbook/barrel/male-2.jpg", alt: "Barrel Shirt Lookbook Male", gender: "male" },
      { src: "/images/models/lookbook/barrel/female-1.jpg", alt: "Barrel Shirt Lookbook Female", gender: "female" },
      { src: "/images/models/lookbook/barrel/female-2.jpg", alt: "Barrel Shirt Lookbook Female", gender: "female" },
      { src: "/images/models/lookbook/barrel/male-3.jpg", alt: "Barrel Shirt Lookbook Male", gender: "male" },
    ];
  }

  // Fallback - use vibe images
  return [
    { src: "/images/vibe/wine-vibe-1.jpg", alt: "Vinogang Lifestyle", gender: "both" },
    { src: "/images/vibe/wine-vibe-2.jpg", alt: "Vinogang Lifestyle", gender: "both" },
  ];
}

// Get clothing-specific data based on product handle
function getClothingData(handle: string) {
  const handleLower = handle.toLowerCase();

  if (handleLower.includes("communion") || handleLower.includes("jesus")) {
    return {
      collection: "Communion",
      tagline: "Das letzte Abendmahl. Wein für alle.",
      description: "Unser meistverkauftes Shirt vereint Religion und Urban Culture zu einem einzigartigen Statement.",
      maleImage: "/images/models/jesus-male-1.jpg",
      femaleImage: "/images/models/jesus-female-1.jpg",
      lifestyleImage: "/images/models/clothing-landscape-1.jpg",
    };
  }

  if (handleLower.includes("reben")) {
    return {
      collection: "Reben",
      tagline: "Verwurzelt. Stark. Echt.",
      description: "Die Rebe als Symbol für Wachstum und Verbundenheit. Ein Shirt für alle, die zur Gang gehören.",
      maleImage: "/images/models/reben-male-1.jpg",
      femaleImage: "/images/models/reben-female-1.jpg",
      lifestyleImage: "/images/models/clothing-landscape-2.jpg",
    };
  }

  if (handleLower.includes("barrel") || handleLower.includes("fass")) {
    return {
      collection: "Barrel",
      tagline: "Aged to Perfection.",
      description: "Wie guter Wein – besser mit der Zeit. Das Barrel Shirt für echte Kenner.",
      maleImage: "/images/models/barrel-male-1.jpg",
      femaleImage: "/images/models/barrel-female-1.jpg",
      lifestyleImage: "/images/models/clothing-landscape-3.jpg",
    };
  }

  // Default
  return {
    collection: "Vinogang",
    tagline: "Wear the Movement.",
    description: "Ein Teil der Gang. Ein Teil der Bewegung.",
    maleImage: "/images/models/model-male-1.jpg",
    femaleImage: "/images/models/model-female-1.jpg",
    lifestyleImage: "/images/models/clothing-landscape-1.jpg",
  };
}

export function ClothingProductDetail({ product }: ClothingProductDetailProps) {
  const clothingInfo = getClothingData(product.handle);
  const lookbookImages = getLookbookImages(product.handle);
  const [selectedGender, setSelectedGender] = useState<"male" | "female">("female");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const firstAvailableVariant = product.variants.find((v) => v.availableForSale);
    if (firstAvailableVariant) {
      return firstAvailableVariant.selectedOptions.reduce(
        (acc, opt) => ({ ...acc, [opt.name]: opt.value }),
        {}
      );
    }
    return product.options.reduce(
      (acc, opt) => ({ ...acc, [opt.name]: opt.values[0] }),
      {}
    );
  });

  const selectedVariant = useMemo<ProductVariant | null>(() => {
    return (
      product.variants.find((variant) =>
        variant.selectedOptions.every(
          (opt) => selectedOptions[opt.name] === opt.value
        )
      ) || null
    );
  }, [product.variants, selectedOptions]);

  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  };

  const currentPrice = selectedVariant?.price || product.price;
  const compareAtPrice = selectedVariant?.compareAtPrice || product.compareAtPrice;

  // Get display image based on gender selection
  const displayImage = selectedGender === "male" ? clothingInfo.maleImage : clothingInfo.femaleImage;

  // Combine product images with model images
  const allImages = [
    ...(product.images.length > 0 ? product.images.map(img => img.url) : []),
    clothingInfo.maleImage,
    clothingInfo.femaleImage,
  ];

  return (
    <div className="bg-white pt-24 md:pt-28">
      {/* Breadcrumb */}
      <div className="container-wide mb-6">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <span>/</span>
          <Link href="/shop?collection=clothing" className="hover:text-gold transition-colors">Clothing</Link>
          <span>/</span>
          <span className="text-black font-medium">{product.title}</span>
        </div>
      </div>

      {/* Product Section */}
      <section className="container-wide pb-12 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left - Product Gallery */}
          <div className="lg:col-span-7">
            <div className="sticky top-28">
              {/* Gender Toggle */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setSelectedGender("female")}
                  className={cn(
                    "px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all",
                    selectedGender === "female"
                      ? "bg-gold text-black"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  Women
                </button>
                <button
                  onClick={() => setSelectedGender("male")}
                  className={cn(
                    "px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all",
                    selectedGender === "male"
                      ? "bg-gold text-black"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  Men
                </button>
              </div>

              {/* Main Image */}
              <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4">
                <Image
                  src={selectedImageIndex < product.images.length
                    ? product.images[selectedImageIndex].url
                    : displayImage
                  }
                  alt={product.title}
                  fill
                  className="object-cover"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {compareAtPrice && compareAtPrice > currentPrice && (
                    <span className="px-3 py-1.5 bg-gold text-black text-xs font-bold uppercase tracking-wider">
                      Sale -{Math.round((1 - currentPrice / compareAtPrice) * 100)}%
                    </span>
                  )}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 flex items-center justify-center hover:bg-gold transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 flex items-center justify-center hover:bg-gold transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Gold corners */}
                <div className="absolute bottom-4 right-4">
                  <div className="w-8 h-px bg-gold" />
                  <div className="w-px h-8 bg-gold absolute right-0 bottom-0" />
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={img.url}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={cn(
                      "relative w-20 h-20 flex-shrink-0 border-2 transition-colors",
                      selectedImageIndex === idx ? "border-gold" : "border-gray-200 hover:border-gold"
                    )}
                  >
                    <Image
                      src={img.url}
                      alt={`${product.title} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
                {/* Model shots */}
                <button
                  onClick={() => setSelectedImageIndex(product.images.length)}
                  className={cn(
                    "relative w-20 h-20 flex-shrink-0 border-2 transition-colors",
                    selectedImageIndex === product.images.length ? "border-gold" : "border-gray-200 hover:border-gold"
                  )}
                >
                  <Image
                    src={clothingInfo.maleImage}
                    alt="Model Male"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-0.5 text-center">
                    <span className="text-white text-[8px] uppercase">Men</span>
                  </div>
                </button>
                <button
                  onClick={() => setSelectedImageIndex(product.images.length + 1)}
                  className={cn(
                    "relative w-20 h-20 flex-shrink-0 border-2 transition-colors",
                    selectedImageIndex === product.images.length + 1 ? "border-gold" : "border-gray-200 hover:border-gold"
                  )}
                >
                  <Image
                    src={clothingInfo.femaleImage}
                    alt="Model Female"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-0.5 text-center">
                    <span className="text-white text-[8px] uppercase">Women</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="lg:col-span-5">
            {/* Title Section */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-gold" />
                <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">
                  {clothingInfo.collection} Collection
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-black leading-tight">
                {product.title}
              </h1>
            </div>

            {/* Price Section */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
              <span className="text-4xl font-black text-gold">
                {formatPrice(currentPrice)}
              </span>
              {compareAtPrice && compareAtPrice > currentPrice && (
                <span className="text-xl text-gray-400 line-through">
                  {formatPrice(compareAtPrice)}
                </span>
              )}
            </div>

            {/* Tagline */}
            <p className="text-2xl font-bold text-black mb-4">
              {clothingInfo.tagline}
            </p>

            {/* Description */}
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {clothingInfo.description}
            </p>

            {/* Product Description */}
            {product.descriptionHtml && (
              <div className="mb-8">
                <div
                  className="prose prose-sm max-w-none text-gray-500"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              </div>
            )}

            {/* Size Guide */}
            <div className="mb-6 p-4 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
                <span className="text-sm font-bold">Größe unsicher?</span>
              </div>
              <button className="text-gold text-sm font-bold hover:underline">
                Größentabelle
              </button>
            </div>

            {/* Variant Selector */}
            {product.options.length > 0 &&
              !(product.options.length === 1 && product.options[0].values.length === 1) && (
                <div className="mb-8">
                  <VariantSelector
                    options={product.options}
                    variants={product.variants}
                    selectedOptions={selectedOptions}
                    onOptionChange={handleOptionChange}
                  />
                </div>
              )}

            {/* Add to Cart Section */}
            <div className="mb-8 p-6 bg-black">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white text-sm uppercase tracking-wider">In den Warenkorb</span>
                <span className="text-gold text-2xl font-black">{formatPrice(currentPrice)}</span>
              </div>
              <AddToCartButton product={product} variant={selectedVariant} />
            </div>

            {/* Product Details */}
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Details</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-gold" />
                  <span>100% Baumwolle (Bio)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-gold" />
                  <span>Premium Siebdruck</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-gold" />
                  <span>Fair Trade zertifiziert</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-gold" />
                  <span>Designed in Germany</span>
                </li>
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Kostenloser Versand ab €50</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>14 Tage Rückgabe</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Sichere Zahlung</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wide Shots / Lookbook Section - Querformat Images */}
      <section className="bg-black py-20 md:py-28">
        <div className="container-wide">
          {/* Section Header */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-gold" />
              <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">Wide Shots</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              {clothingInfo.collection} <span className="text-gold">Lookbook</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-xl">
              Querformat-Aufnahmen aus unserer aktuellen Kollektion.
            </p>
          </div>

          {/* Landscape Image Grid - Desktop: 2 columns, Mobile: 1 column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {lookbookImages.map((image, index) => (
              <div
                key={image.src}
                className={cn(
                  "relative overflow-hidden group",
                  // First image spans full width on desktop if it's the only one or we have an odd number
                  index === 0 && lookbookImages.length % 2 !== 0 && "md:col-span-2"
                )}
              >
                <div className={cn(
                  "relative w-full overflow-hidden",
                  // Landscape aspect ratio
                  index === 0 && lookbookImages.length % 2 !== 0
                    ? "aspect-[21/9]"
                    : "aspect-[16/10]"
                )}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Border on hover */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold transition-colors duration-300" />

                  {/* Gold corner accent */}
                  <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[40px] border-b-gold border-r-[40px] border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Caption */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-[10px] uppercase tracking-wider">Season 2025</span>
                    <div className="w-1.5 h-1.5 bg-gold" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Link */}
          <div className="text-center mt-12">
            <Link
              href="/shop?collection=clothing"
              className="inline-flex items-center gap-4 group"
            >
              <span className="text-gold text-sm font-bold uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">
                Alle Styles entdecken
              </span>
              <div className="w-10 h-10 border-2 border-gold flex items-center justify-center group-hover:bg-gold transition-all">
                <svg
                  className="w-4 h-4 text-gold group-hover:text-black transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="square" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 mb-16 bg-gold">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
              Werde Teil der Gang
            </h2>
            <p className="text-black/70 mb-8 text-lg">
              {product.title} – Mehr als nur ein Shirt.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <span className="text-3xl font-black text-black">
                {formatPrice(currentPrice)}
              </span>
              <div className="w-full sm:w-auto">
                <AddToCartButton product={product} variant={selectedVariant} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
