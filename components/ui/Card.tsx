"use client";

import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  className,
  padding = "md",
  ...props
}: CardProps) {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-stone-200 bg-white shadow-sm",
        paddingClasses[padding],
        className
      )}
      {...props}
    />
  );
}
