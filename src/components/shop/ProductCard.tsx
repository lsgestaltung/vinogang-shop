import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/shopify";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <Link href={`/shop/${product.handle}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        <Image
          src={product.featuredImage?.url || "/images/placeholder.jpg"}
          alt={product.featuredImage?.altText || product.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {!product.availableForSale && (
            <span className="bg-black text-white text-xs font-bold uppercase tracking-wider px-3 py-1">
              Ausverkauft
            </span>
          )}
          {hasDiscount && (
            <span className="bg-gold text-black text-xs font-bold uppercase tracking-wider px-3 py-1">
              Sale
            </span>
          )}
        </div>

        {/* Hover Border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <span className="text-xs text-gray-500 uppercase tracking-[0.15em]">
          {product.productType}
        </span>
        <h3 className="font-bold uppercase tracking-wide group-hover:text-gold transition-colors line-clamp-2">
          {product.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-bold text-gold">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
