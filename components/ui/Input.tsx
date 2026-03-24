"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-stone-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "flex h-11 w-full rounded-xl border border-stone-300 bg-white px-4 text-base text-stone-900 placeholder:text-stone-400",
            "focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-1",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-rose-400 focus:ring-rose-400",
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="mt-1.5 text-sm text-stone-500">{hint}</p>
        )}
        {error && (
          <p className="mt-1.5 text-sm text-rose-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
