"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "outline-gold" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold uppercase tracking-[0.1em] transition-all duration-200 cursor-pointer border-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-gold text-black border-gold hover:bg-transparent hover:text-gold",
      secondary:
        "bg-black text-white border-black hover:bg-white hover:text-black",
      outline:
        "bg-transparent text-white border-white hover:bg-white hover:text-black",
      "outline-gold":
        "bg-transparent text-gold border-gold hover:bg-gold hover:text-black",
      ghost:
        "bg-transparent text-black border-transparent hover:border-gold hover:text-gold",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-8 py-4 text-sm",
      lg: "px-12 py-5 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
