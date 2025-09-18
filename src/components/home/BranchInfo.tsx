'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, Star } from "lucide-react"

export function BranchInfo() {
  const branches = [
    {
      id: 1,
      name: "Ayam Gepuk Artisan - Taman Melawati",
      address: "Jalan Bandar 11, Taman Melawati, 53100 Kuala Lumpur",
      phone: "03-4107 1234",
      hours: "11:00 AM - 10:00 PM",
      rating: 4.8,
      distance: "2.5 km"
    },
    {
      id: 2,
      name: "Ayam Gepuk Artisan - Wangsa Maju",
      address: "Jalan 1/27A, Wangsa Maju, 53300 Kuala Lumpur",
      phone: "03-4142 5678",
      hours: "11:00 AM - 10:00 PM",
      rating: 4.7,
      distance: "5.8 km"
    },
    {
      id: 3,
      name: "Ayam Gepuk Artisan - Setapak",
      address: "Jalan Genting Klang, Setapak, 53300 Kuala Lumpur",
      phone: "03-4148 9012",
      hours: "11:00 AM - 10:30 PM",
      rating: 4.9,
      distance: "8.2 km"
    }
  ]

  return (
    <section className="py-16 bg-menu-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-menu-yellow text-menu-dark font-bold">
            📍 Find Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-black text-menu-light mb-4">
            Our Branches
          </h2>
          <p className="text-lg text-menu-light/80 max-w-2xl mx-auto font-bold">
            Visit us at any of our convenient locations across Klang Valley
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {branches.map((branch) => (
            <Card key={branch.id} className="hover:shadow-lg transition-shadow duration-300 bg-menu-light border-menu-yellow/20">
              <CardHeader>
                <CardTitle className="text-lg font-black text-menu-dark">
                  {branch.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-menu-yellow fill-current" />
                  <span className="text-sm font-black">{branch.rating}</span>
                  <Badge variant="outline" className="text-xs font-bold border-menu-yellow/20 text-menu-dark/70">
                    {branch.distance} away
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-menu-red mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-menu-dark/70 font-bold">{branch.address}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-menu-red flex-shrink-0" />
                    <p className="text-sm text-menu-dark/70 font-bold">{branch.phone}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-menu-red flex-shrink-0" />
                    <p className="text-sm text-menu-dark/70 font-bold">{branch.hours}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1 bg-menu-yellow text-menu-dark hover:bg-menu-accent font-black">
                    Get Directions
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 border-menu-red text-menu-red hover:bg-menu-red hover:text-menu-light font-black">
                    Call Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-menu-yellow text-menu-yellow hover:bg-menu-yellow hover:text-menu-dark font-black">
            View All Locations
          </Button>
        </div>
      </div>
    </section>
  )
}