"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const filters = [
  { label: "Alle", value: "" },
  { label: "Wein", value: "wine" },
  { label: "Clothing", value: "clothing" },
];

export function CollectionFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCollection = searchParams.get("collection") || "";

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("collection", value);
    } else {
      params.delete("collection");
    }
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="flex gap-1 sm:gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => handleFilterChange(filter.value)}
          className={cn(
            "px-3 sm:px-6 py-2 sm:py-3 border-2 text-xs sm:text-sm font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] transition-all whitespace-nowrap",
            currentCollection === filter.value
              ? "border-gold bg-gold text-black"
              : "border-gray-300 hover:border-gold"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
