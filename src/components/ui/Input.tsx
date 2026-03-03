"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "light" | "dark";
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "light", error, type = "text", ...props }, ref) => {
    const baseStyles =
      "w-full px-5 py-4 text-base bg-transparent border transition-colors duration-200 focus:outline-none";

    const variants = {
      light: cn(
        "border-gray-300 text-black placeholder:text-gray-400",
        "focus:border-gold",
        error && "border-red-500"
      ),
      dark: cn(
        "border-gray-700 text-white placeholder:text-gray-500",
        "focus:border-gold",
        error && "border-red-500"
      ),
    };

    return (
      <div className="w-full">
        <input
          ref={ref}
          type={type}
          className={cn(baseStyles, variants[variant], className)}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "light" | "dark";
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = "light", error, ...props }, ref) => {
    const baseStyles =
      "w-full px-5 py-4 text-base bg-transparent border transition-colors duration-200 focus:outline-none resize-none";

    const variants = {
      light: cn(
        "border-gray-300 text-black placeholder:text-gray-400",
        "focus:border-gold",
        error && "border-red-500"
      ),
      dark: cn(
        "border-gray-700 text-white placeholder:text-gray-500",
        "focus:border-gold",
        error && "border-red-500"
      ),
    };

    return (
      <div className="w-full">
        <textarea
          ref={ref}
          className={cn(baseStyles, variants[variant], className)}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Input, Textarea };
