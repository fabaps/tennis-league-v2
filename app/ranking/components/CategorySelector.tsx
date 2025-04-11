"use client"

import { Button } from "@/components/ui/button";

interface CategorySelectorProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategorySelector({
  categories,
  activeCategory,
  onCategoryChange,
}: CategorySelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          onClick={() => onCategoryChange(category)}
          className={`flex-shrink-0 font-semibold min-w-[100px] ${
            activeCategory === category
              ? "bg-green-600 hover:bg-green-700 text-white shadow-md"
              : "border-green-600 text-green-600 hover:bg-green-50"
          }`}
        >
          {category === "MAYOR" ? "Mayor" : `Categoría ${category}`}
        </Button>
      ))}
    </div>
  );
}