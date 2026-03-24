"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      primary:
        "bg-stone-800 text-stone-50 hover:bg-stone-700 active:bg-stone-900",
      secondary:
        "bg-stone-100 text-stone-800 hover:bg-stone-200 active:bg-stone-300",
      ghost: "text-stone-600 hover:bg-stone-100 active:bg-stone-200",
      outline:
        "border border-stone-300 bg-transparent text-stone-700 hover:bg-stone-50 active:bg-stone-100",
    };

    const sizes = {
      sm: "h-8 px-2.5 text-xs rounded",
      md: "h-9 px-3 text-sm rounded",
      lg: "h-10 px-4 text-sm rounded",
    };

    return (
      <button
        ref={ref}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
