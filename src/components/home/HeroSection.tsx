'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Phone, Star } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-menu-yellow via-menu-red/80 to-menu-accent/20 py-16 md:py-24 overflow-hidden">
      {/* Enhanced sambal texture overlay */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOTEzOSAxLjc5MDg2MS00IDQtNCBoMTZjMi4yMDkxMzkgMCA0IDEuNzkwODYxIDQgNHYxNmMwIDIuMjA5MTM5LTEuNzkwODYxIDQtNCA0SDQwYy0yLjIwOTEzOSAwLTQtMS43OTA4NjEtNC00VjM0eiIvPjwvZz48L2c+PC9zdmc+')]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden bg-menu-yellow">
                  <img 
                    src="/images/logo.jpg" 
                    alt="Ayam Gepuk Artisan Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <Badge variant="secondary" className="bg-menu-red text-menu-light font-bold">
                  🍗 Authentic Malaysian Crispy Chicken
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-menu-dark leading-tight">
                Ayam Gepuk
                <span className="text-menu-yellow"> Artisan</span>
              </h1>
              <p className="text-xl text-menu-dark/90 max-w-2xl font-bold">
                Experience the perfect blend of crispy, juicy, and flavorful fried chicken, 
                crafted with traditional recipes and the finest ingredients.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-menu-yellow text-menu-dark hover:bg-menu-accent font-black text-lg px-8 py-6 border-2 border-menu-yellow">
                🛒 Order Now
              </Button>
              <Button size="lg" variant="outline" className="border-menu-yellow text-menu-yellow hover:bg-menu-yellow hover:text-menu-dark font-black text-lg px-8 py-6">
                📍 Find Branch
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-menu-yellow" />
                <div>
                  <p className="font-black text-menu-dark">Fast Delivery</p>
                  <p className="text-sm text-menu-dark/80 font-bold">30-45 mins</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Star className="h-6 w-6 text-menu-yellow" />
                <div>
                  <p className="font-black text-menu-dark">4.8 Rating</p>
                  <p className="text-sm text-menu-dark/80 font-bold">2,500+ reviews</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-menu-yellow" />
                <div>
                  <p className="font-black text-menu-dark">5 Branches</p>
                  <p className="text-sm text-menu-dark/80 font-bold">Klang Valley</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="bg-menu-light rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="aspect-square bg-gradient-to-br from-menu-yellow/20 to-menu-accent/30 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden bg-menu-yellow">
                    <img 
                      src="/images/logo.jpg" 
                      alt="Ayam Gepuk Artisan Logo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-lg font-black text-menu-dark">Crispy & Delicious</p>
                  <p className="text-menu-dark/80 font-bold">Freshly prepared daily</p>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-menu-yellow text-menu-dark rounded-full p-4 shadow-lg">
              <div className="text-center">
                <p className="text-2xl font-black">20%</p>
                <p className="text-xs font-bold">OFF</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-menu-red text-menu-light rounded-full p-4 shadow-lg">
              <div className="text-center">
                <p className="text-lg font-black">HOT</p>
                <p className="text-xs font-bold">DEAL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}