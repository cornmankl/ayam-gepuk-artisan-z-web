'use client'

import { Navigation } from "@/components/layout/Navigation"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Percent, Gift, Calendar, Star, MapPin, Phone } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface Promotion {
  id: number
  title: string
  description: string
  discount: string
  icon: string
  validUntil: string
  type: string
  color: string
  terms: string[]
  isFeatured: boolean
}

export default function PromotionsPage() {
  const { toast } = useToast()
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const promotions: Promotion[] = [
    {
      id: 1,
      title: "Weekend Special",
      description: "Get 20% off on all combo meals every Saturday & Sunday",
      discount: "20% OFF",
      icon: "🍗",
      validUntil: "Valid until Dec 31, 2024",
      type: "percentage",
      color: "bg-menu-red/10 text-menu-red border-menu-red/20",
      isFeatured: true,
      terms: [
        "Valid on weekends only (Saturday & Sunday)",
        "Minimum order of RM20 required",
        "Not applicable with other promotions",
        "Valid for dine-in and delivery"
      ]
    },
    {
      id: 2,
      title: "Free Delivery",
      description: "Free delivery for orders above RM50 within 10km radius",
      discount: "FREE",
      icon: "🛵",
      validUntil: "Ongoing promotion",
      type: "delivery",
      color: "bg-menu-accent/10 text-menu-accent border-menu-accent/20",
      isFeatured: true,
      terms: [
        "Minimum order of RM50 required",
        "Within 10km radius from our branches",
        "Valid for online orders only",
        "Not applicable during peak hours (12-2pm, 6-9pm)"
      ]
    },
    {
      id: 3,
      title: "First Order Deal",
      description: "RM10 off on your first order with us",
      discount: "RM10 OFF",
      icon: "🎁",
      validUntil: "For new customers only",
      type: "fixed",
      color: "bg-menu-yellow/20 text-menu-dark border-menu-yellow/30",
      isFeatured: false,
      terms: [
        "For new customers only",
        "Minimum order of RM30 required",
        "Valid for first order only",
        "One-time use per customer"
      ]
    },
    {
      id: 4,
      title: "Family Bundle",
      description: "Special family package for 4-6 persons with discount",
      discount: "SAVE 25%",
      icon: "👨‍👩‍👧‍👦",
      validUntil: "Valid until Jan 31, 2025",
      type: "bundle",
      color: "bg-menu-accent/10 text-menu-accent border-menu-accent/20",
      isFeatured: true,
      terms: [
        "Includes 4 main dishes, 4 drinks, and 2 sides",
        "Valid for dine-in only",
        "Advance booking required",
        "Not applicable with other promotions"
      ]
    },
    {
      id: 5,
      title: "Student Discount",
      description: "15% discount for students with valid student ID",
      discount: "15% OFF",
      icon: "🎓",
      validUntil: "Ongoing promotion",
      type: "student",
      color: "bg-menu-light/20 text-menu-dark border-menu-yellow/30",
      isFeatured: false,
      terms: [
        "Valid student ID required",
        "Valid for dine-in only",
        "Not applicable during public holidays",
        "Maximum discount of RM20 per transaction"
      ]
    },
    {
      id: 6,
      title: "Lunch Hour Special",
      description: "Special prices during lunch hours (11am-3pm)",
      discount: "FROM RM8.99",
      icon: "🕐",
      validUntil: "Daily 11am-3pm",
      type: "time-based",
      color: "bg-menu-red/10 text-menu-red border-menu-red/20",
      isFeatured: false,
      terms: [
        "Valid Monday to Friday only",
        "Lunch hours: 11am-3pm",
        "Selected menu items only",
        "Dine-in and takeaway available"
      ]
    }
  ]

  const filteredPromotions = activeFilter === 'all' 
    ? promotions 
    : activeFilter === 'featured' 
      ? promotions.filter(p => p.isFeatured)
      : promotions.filter(p => p.type === activeFilter)

  const handleClaimOffer = (promotion: Promotion) => {
    toast({
      title: "Offer Claimed!",
      description: `You have successfully claimed the ${promotion.title} offer.`,
      duration: 3000,
    })
  }

  const filters = [
    { id: 'all', label: 'All Promotions' },
    { id: 'featured', label: 'Featured' },
    { id: 'percentage', label: 'Discount' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'bundle', label: 'Bundles' },
  ]

  return (
    <div className="min-h-screen bg-menu-light">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-menu-yellow to-menu-red py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-menu-dark mb-4">
              Amazing Promotions & Deals
            </h1>
            <p className="text-xl text-menu-dark/90 font-bold max-w-2xl mx-auto">
              Discover our latest offers and save big on your favorite Ayam Gepuk dishes!
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-menu-dark">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`${
                    activeFilter === filter.id 
                      ? "bg-menu-yellow text-menu-dark hover:bg-menu-accent" 
                      : "bg-menu-light text-menu-dark hover:bg-menu-yellow/20"
                  } font-bold`}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Promotions Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPromotions.map((promo) => (
                <Card 
                  key={promo.id} 
                  className={`border-2 ${promo.color} hover:shadow-lg transition-all duration-300 bg-menu-light relative overflow-hidden ${promo.isFeatured ? 'ring-2 ring-menu-yellow' : ''}`}
                >
                  {promo.isFeatured && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-menu-yellow text-menu-dark font-black">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className="text-6xl mb-4">{promo.icon}</div>
                    <CardTitle className="text-xl font-black text-menu-dark">{promo.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-menu-dark/70 text-center font-bold">{promo.description}</p>
                    
                    <div className="text-center">
                      <Badge className={`${promo.color} text-lg font-black py-2 px-4`}>
                        {promo.discount}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-sm text-menu-dark/60">
                      <Clock className="h-4 w-4" />
                      <span>{promo.validUntil}</span>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="border-t border-menu-yellow/20 pt-4">
                      <h4 className="font-bold text-menu-dark mb-2">Terms & Conditions:</h4>
                      <ul className="text-sm text-menu-dark/60 space-y-1">
                        {promo.terms.map((term, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-menu-yellow mt-1">•</span>
                            <span>{term}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      className="w-full mt-4 bg-menu-yellow text-menu-dark hover:bg-menu-accent font-black" 
                      onClick={() => handleClaimOffer(promo)}
                    >
                      Claim Offer
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPromotions.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-menu-dark/60 font-bold">No promotions found for the selected filter.</p>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-menu-dark">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-menu-light mb-4">
              Stay Updated with More Deals!
            </h2>
            <p className="text-lg text-menu-light/80 mb-8 font-bold">
              Subscribe to our newsletter and never miss out on exclusive offers and new promotions.
            </p>
            
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-menu-yellow/20 bg-menu-light text-menu-dark placeholder:text-menu-dark/50 focus:outline-none focus:ring-2 focus:ring-menu-yellow"
              />
              <Button className="bg-menu-yellow text-menu-dark hover:bg-menu-accent font-black px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-menu-yellow">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center gap-3">
                <Phone className="h-8 w-8 text-menu-dark" />
                <h3 className="font-bold text-menu-dark text-lg">Call Us</h3>
                <p className="text-menu-dark/80 font-bold">03-4107 1234</p>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <MapPin className="h-8 w-8 text-menu-dark" />
                <h3 className="font-bold text-menu-dark text-lg">Visit Us</h3>
                <p className="text-menu-dark/80 font-bold">5 Locations Available</p>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <Clock className="h-8 w-8 text-menu-dark" />
                <h3 className="font-bold text-menu-dark text-lg">Opening Hours</h3>
                <p className="text-menu-dark/80 font-bold">10:00 AM - 10:00 PM</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}