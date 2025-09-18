'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Category {
  id: string
  name: string
  icon: string
  description: string
}

interface MenuCategoriesProps {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (categoryId: string) => void
}

export function MenuCategories({ categories, selectedCategory, onCategoryChange }: MenuCategoriesProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={`flex items-center gap-2 px-6 py-3 h-auto ${
              selectedCategory === category.id 
                ? "bg-orange-500 hover:bg-orange-600 text-white" 
                : "border-orange-200 text-orange-600 hover:bg-orange-50"
            }`}
            onClick={() => onCategoryChange(category.id)}
          >
            <span className="text-xl">{category.icon}</span>
            <div className="text-left">
              <div className="font-semibold">{category.name}</div>
              <div className="text-xs opacity-75">{category.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}