import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark";
  hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "light", hoverable = true, children, ...props }, ref) => {
    const baseStyles = "border transition-colors duration-200";

    const variants = {
      light: cn(
        "bg-white border-gray-200",
        hoverable && "hover:border-gold"
      ),
      dark: cn(
        "bg-black border-gray-800",
        hoverable && "hover:border-gold"
      ),
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  aspectRatio?: "square" | "portrait" | "landscape" | "auto";
}

const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ className, aspectRatio = "square", children, ...props }, ref) => {
    const aspectRatios = {
      square: "aspect-square",
      portrait: "aspect-[3/4]",
      landscape: "aspect-[4/3]",
      auto: "",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden image-hover-zoom",
          aspectRatios[aspectRatio],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardImage.displayName = "CardImage";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("p-6", className)} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn("text-lg font-bold uppercase tracking-wide", className)}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-gray-500 mt-1", className)}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = "CardDescription";

const CardPrice = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("text-lg font-bold text-gold mt-2 block", className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

CardPrice.displayName = "CardPrice";

export { Card, CardImage, CardContent, CardTitle, CardDescription, CardPrice };
