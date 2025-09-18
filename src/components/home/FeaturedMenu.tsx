'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, TrendingUp } from "lucide-react"

export function FeaturedMenu() {
  const featuredItems = [
    {
      id: 1,
      name: "SET A Krispy",
      description: "Ayam Goreng Krispy + Nasi Putih + Air",
      price: 7.99,
      image: "/images/menu1.jpg",
      isPopular: true,
      spiceLevel: 3,
      crop: "top"
    },
    {
      id: 2,
      name: "SET B Krispy",
      description: "2X Ayam Goreng Krispy + Nasi Putih + Air",
      price: 11.99,
      image: "/images/menu1.jpg",
      isPopular: true,
      spiceLevel: 3,
      crop: "center"
    },
    {
      id: 3,
      name: "SET C Krispy",
      description: "3X Ayam Goreng Krispy + Nasi Putih + Air",
      price: 15.99,
      image: "/images/menu1.jpg",
      isPopular: false,
      spiceLevel: 3,
      crop: "bottom"
    },
    {
      id: 4,
      name: "Ayam Goreng Krispy",
      description: "Ayam Goreng Krispy rangup dan sedap",
      price: 4.70,
      image: "/images/menu3.jpg",
      isPopular: true,
      spiceLevel: 2,
      crop: "center"
    },
    {
      id: 5,
      name: "Ayam Goreng Quarter",
      description: "Separuh ekor ayam goreng rangup",
      price: 7.00,
      image: "/images/menu4.jpg",
      isPopular: true,
      spiceLevel: 2,
      crop: "top"
    },
    {
      id: 6,
      name: "SET A Klasik",
      description: "Ayam Goreng Klasik + Nasi Putih + Air",
      price: 7.99,
      image: "/images/menu4.jpg",
      isPopular: false,
      spiceLevel: 2,
      crop: "bottom"
    }
  ]

  const renderSpiceLevel = (level: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-4 rounded-sm ${
              i < level ? 'bg-menu-red' : 'bg-menu-dark/20'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <section className="py-16 bg-menu-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-menu-red text-menu-light font-bold">
            🍽️ Customer Favorites
          </Badge>
          <h2 className="text-3xl md:text-4xl font-black text-menu-dark mb-4">
            Featured Menu
          </h2>
          <p className="text-lg text-menu-dark/80 max-w-2xl mx-auto font-bold">
            Discover our most popular dishes loved by customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-white border-menu-yellow/20">
              <div className="relative">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className={`w-full h-full object-cover object-${item.crop}`}
                  />
                </div>
                
                {item.isPopular && (
                  <Badge className="absolute top-3 right-3 bg-menu-red text-menu-light font-bold">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                )}
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-black text-lg text-menu-dark">{item.name}</h3>
                    <p className="text-sm text-menu-dark/70 line-clamp-2 font-bold">{item.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-menu-dark/60 font-bold">Spice:</span>
                      {renderSpiceLevel(item.spiceLevel)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black text-menu-red">
                      RM{item.price.toFixed(2)}
                    </span>
                    <Button size="sm" className="bg-menu-yellow text-menu-dark hover:bg-menu-accent font-black">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-menu-red text-menu-red hover:bg-menu-red hover:text-menu-light font-black">
            View Full Menu
          </Button>
        </div>
      </div>
    </section>
  )
}