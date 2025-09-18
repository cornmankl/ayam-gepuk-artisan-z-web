'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, TrendingUp } from "lucide-react"
import { useState } from "react"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  categoryId: string
  isAvailable: boolean
  isPopular: boolean
  spiceLevel: number
  crop?: string
}

interface MenuItemCardProps {
  item: MenuItem
  onAddToCart: (item: MenuItem) => void
}

export function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState(item.spiceLevel || 0)

  const renderSpiceLevel = (level: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            onClick={() => setSelectedSpiceLevel(i + 1)}
            className={`w-3 h-5 rounded-sm transition-all ${
              i < level ? 'bg-menu-red' : 'bg-menu-dark/20 hover:bg-menu-dark/40'
            }`}
            title={`Spice level ${i + 1}`}
          />
        ))}
      </div>
    )
  }

  const handleAddToCart = () => {
    const itemWithSpiceLevel = {
      ...item,
      spiceLevel: selectedSpiceLevel
    }
    onAddToCart(itemWithSpiceLevel)
  }

  if (!item.isAvailable) {
    return (
      <Card className="opacity-60">
        <CardContent className="p-4">
          <div className="relative">
          <div className="aspect-video overflow-hidden rounded-lg mb-4">
            <img 
              src={item.image} 
              alt={item.name}
              className={`w-full h-full object-cover object-${item.crop || 'center'} grayscale opacity-50`}
            />
          </div>
          <Badge className="absolute top-2 right-2 bg-menu-dark text-menu-light font-bold">
            Unavailable
          </Badge>
        </div>
          
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg font-black text-menu-dark/60">{item.name}</h3>
              <p className="text-sm text-menu-dark/40 font-bold">{item.description}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xl font-black text-menu-dark/40">
                RM{item.price.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-4">
        <div className="relative">
          <div className="aspect-video overflow-hidden rounded-lg mb-4">
            <img 
              src={item.image} 
              alt={item.name}
              className={`w-full h-full object-cover object-${item.crop || 'center'}`}
            />
          </div>
          
          {item.isPopular && (
            <Badge className="absolute top-2 right-2 bg-menu-yellow text-menu-dark font-black">
              <TrendingUp className="h-3 w-3 mr-1" />
              Popular
            </Badge>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg font-black text-menu-dark">{item.name}</h3>
            <p className="text-sm text-menu-dark/70 font-bold line-clamp-2">{item.description}</p>
          </div>

          {/* Spice Level Selector */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-menu-dark/70 font-bold">Spice Level:</span>
            {renderSpiceLevel(selectedSpiceLevel)}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xl font-black text-menu-yellow">
              RM{item.price.toFixed(2)}
            </span>
            <Button 
              size="sm" 
              className="bg-menu-yellow hover:bg-menu-accent text-menu-dark font-black"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}