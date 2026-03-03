"use client";

import { cn } from "@/lib/utils";
import type { ProductVariant, ProductOption } from "@/lib/shopify";

interface VariantSelectorProps {
  options: ProductOption[];
  variants: ProductVariant[];
  selectedOptions: Record<string, string>;
  onOptionChange: (name: string, value: string) => void;
}

export function VariantSelector({
  options,
  variants,
  selectedOptions,
  onOptionChange,
}: VariantSelectorProps) {
  // Check if a specific option combination is available
  const isOptionAvailable = (optionName: string, optionValue: string) => {
    const testOptions = { ...selectedOptions, [optionName]: optionValue };

    return variants.some((variant) => {
      return (
        variant.availableForSale &&
        variant.selectedOptions.every(
          (opt) => testOptions[opt.name] === opt.value
        )
      );
    });
  };

  return (
    <div className="space-y-6">
      {options.map((option) => (
        <div key={option.id}>
          <label className="block text-sm font-bold uppercase tracking-[0.15em] mb-3">
            {option.name}
          </label>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isSelected = selectedOptions[option.name] === value;
              const isAvailable = isOptionAvailable(option.name, value);

              // Color swatch for color options
              if (option.name.toLowerCase() === "farbe" || option.name.toLowerCase() === "color") {
                const colorMap: Record<string, string> = {
                  weiß: "#ffffff",
                  white: "#ffffff",
                  schwarz: "#000000",
                  black: "#000000",
                  gold: "#ddb55b",
                };
                const bgColor = colorMap[value.toLowerCase()] || "#cccccc";

                return (
                  <button
                    key={value}
                    onClick={() => onOptionChange(option.name, value)}
                    disabled={!isAvailable}
                    className={cn(
                      "w-10 h-10 border-2 transition-all",
                      isSelected
                        ? "border-gold scale-110"
                        : "border-gray-300 hover:border-gray-500",
                      !isAvailable && "opacity-30 cursor-not-allowed"
                    )}
                    style={{ backgroundColor: bgColor }}
                    title={value}
                    aria-label={value}
                  >
                    {!isAvailable && (
                      <span className="block w-full h-0.5 bg-red-500 rotate-45 transform origin-center" />
                    )}
                  </button>
                );
              }

              // Default button style for other options
              return (
                <button
                  key={value}
                  onClick={() => onOptionChange(option.name, value)}
                  disabled={!isAvailable}
                  className={cn(
                    "px-6 py-3 border-2 text-sm font-bold uppercase tracking-wider transition-all",
                    isSelected
                      ? "border-gold bg-gold text-black"
                      : "border-gray-300 hover:border-gold",
                    !isAvailable &&
                      "opacity-30 cursor-not-allowed line-through"
                  )}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
