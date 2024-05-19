import React from "react";

export default function ItemsGrid({
  className,
  children,
  size = "md",
}: {
  className?: string;
  children?: React.ReactNode;
  size?: "md" | "sm" | "xs" | "lg";
}) {
  const sizeVariants = {
    lg: "grid-cols-[repeat(auto-fit,minmax(315px,1fr))] gap-6 lg:gap-8",
    md: "grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2",
    sm: "grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4  sm:gap-4",
    xs: "grid-cols-[repeat(auto-fit,minmax(60px,1fr))] gap-2 sm:gap-2",
  };

  return (
    <section
      className={`w-full mx-auto grid ${sizeVariants[size]} ${className}`}
    >
      {children}
    </section>
  );
}
