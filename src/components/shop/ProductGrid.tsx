import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/shopify";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

export function ProductGrid({ products, columns = 3 }: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Keine Produkte gefunden.</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-8`}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < 6}
        />
      ))}
    </div>
  );
}
