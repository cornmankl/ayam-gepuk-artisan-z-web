'use client'

import { useState } from 'react'
import { Navigation } from "@/components/layout/Navigation"
import { Footer } from "@/components/layout/Footer"
import { MenuCategories } from "@/components/menu/MenuCategories"
import { MenuItemCard } from "@/components/menu/MenuItemCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, Filter } from "lucide-react"
import { useCart } from "@/contexts/CartContext"

// Mock data - this will come from API later
const mockCategories = [
  { id: '1', name: 'Set Krispy', icon: '🍗', description: 'Our signature crispy sets' },
  { id: '2', name: 'Set Klasik', icon: '🍖', description: 'Classic fried chicken sets' },
  { id: '3', name: 'A la Carte', icon: '🍴', description: 'Individual items' },
  { id: '4', name: 'Minuman', icon: '🥤', description: 'Refreshing drinks' },
  { id: '5', name: 'Sampingan', icon: '🥗', description: 'Side dishes' },
]

const mockMenuItems = [
  // Set Krispy
  {
    id: '1',
    name: 'SET A Krispy',
    description: 'Ayam Goreng Krispy + Nasi Putih + Air',
    price: 7.99,
    image: '/images/menu1.jpg',
    categoryId: '1',
    isAvailable: true,
    isPopular: true,
    spiceLevel: 3,
    crop: 'top'
  },
  {
    id: '2',
    name: 'SET B Krispy',
    description: '2X Ayam Goreng Krispy + Nasi Putih + Air',
    price: 11.99,
    image: '/images/menu1.jpg',
    categoryId: '1',
    isAvailable: true,
    isPopular: true,
    spiceLevel: 3,
    crop: 'center'
  },
  {
    id: '3',
    name: 'SET C Krispy',
    description: '3X Ayam Goreng Krispy + Nasi Putih + Air',
    price: 15.99,
    image: '/images/menu1.jpg',
    categoryId: '1',
    isAvailable: true,
    isPopular: false,
    spiceLevel: 3,
    crop: 'bottom'
  },
  // Set Klasik
  {
    id: '4',
    name: 'SET A Klasik',
    description: 'Ayam Goreng Klasik + Nasi Putih + Air',
    price: 7.99,
    image: '/images/menu2.jpg',
    categoryId: '2',
    isAvailable: true,
    isPopular: false,
    spiceLevel: 2,
    crop: 'top'
  },
  {
    id: '5',
    name: 'SET B Klasik',
    description: '2X Ayam Goreng Klasik + Nasi Putih + Air',
    price: 11.99,
    image: '/images/menu2.jpg',
    categoryId: '2',
    isAvailable: true,
    isPopular: false,
    spiceLevel: 2,
    crop: 'center'
  },
  {
    id: '6',
    name: 'SET C Klasik',
    description: '3X Ayam Goreng Klasik + Nasi Putih + Air',
    price: 15.99,
    image: '/images/menu2.jpg',
    categoryId: '2',
    isAvailable: true,
    isPopular: false,
    spiceLevel: 2,
    crop: 'bottom'
  },
  // A la Carte
  {
    id: '7',
    name: 'Ayam Goreng Krispy',
    description: 'Ayam Goreng Krispy rangup dan sedap',
    price: 4.70,
    image: '/images/menu1.jpg',
    categoryId: '3',
    isAvailable: true,
    isPopular: true,
    spiceLevel: 2,
    crop: 'center'
  },
  {
    id: '8',
    name: 'Ayam Goreng Quarter',
    description: 'Separuh ekor ayam goreng rangup',
    price: 7.00,
    image: '/images/menu1.jpg',
    categoryId: '3',
    isAvailable: true,
    isPopular: true,
    spiceLevel: 2,
    crop: 'bottom'
  },
  {
    id: '9',
    name: 'Ayam Goreng Klasik',
    description: 'Ayam Goreng Klasik original',
    price: 4.20,
    image: '/images/menu2.jpg',
    categoryId: '3',
    isAvailable: true,
    isPopular: false,
    spiceLevel: 2,
    crop: 'center'
  },
  // Side dishes
  {
    id: '10',
    name: 'Tempe Goreng',
    description: 'Tempe goreng rangup',
    price: 2.20,
    image: '/images/menu3.jpg',
    categoryId: '5',
    isAvailable: true,
    isPopular: false,
    spiceLevel: 1,
    crop: 'top'
  },
  {
    id: '11',
    name: 'Kerabu',
    description: 'Kerabu segar tradisional',
    price: 2.50,
    image: '/images/menu4.jpg',
    categoryId: '5',
    isAvailable: true,
    isPopular: false,
    spiceLevel: 1,
    crop: 'center'
  },
  // Drinks
  {
    id: '12',
    name: 'Teh Tarik',
    description: 'Teh tarik tradisional',
    price: 2.00,
    image: '/images/menu3.jpg',
    categoryId: '4',
    isAvailable: true,
    isPopular: false,
    spiceLevel: 0,
    crop: 'bottom'
  },
  {
    id: '13',
    name: 'Air Mineral',
    description: 'Air mineral botol',
    price: 1.50,
    image: '/images/menu4.jpg',
    categoryId: '4',
    isAvailable: true,
    isPopular: false,
    spiceLevel: 0,
    crop: 'top'
  }
]

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('1')
  const { addItem, getTotalItems, setIsOpen } = useCart()

  const filteredItems = mockMenuItems.filter(item => item.categoryId === selectedCategory)

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      spiceLevel: item.spiceLevel,
      image: item.image,
      description: item.description
    })
  }

  return (
    <div className="min-h-screen bg-menu-light">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-menu-yellow text-menu-dark font-bold">
            🍽️ Our Menu
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black text-menu-dark mb-4">
            Discover Our Delicious Menu
          </h1>
          <p className="text-lg text-menu-dark/70 max-w-2xl mx-auto font-bold">
            From our signature crispy chicken to refreshing drinks, we have something for everyone
          </p>
        </div>

        {/* Categories */}
        <MenuCategories 
          categories={mockCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Floating Cart Button */}
        <div className="fixed bottom-6 right-6 z-40">
          <Sheet open={false} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                size="lg" 
                className="bg-menu-yellow hover:bg-menu-accent text-menu-dark rounded-full h-14 w-14 p-0 shadow-lg"
                onClick={() => setIsOpen(true)}
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-6 w-6 p-0 flex items-center justify-center text-xs bg-menu-red text-menu-light"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
          </Sheet>
        </div>
      </div>

      <Footer />
    </div>
  )
}