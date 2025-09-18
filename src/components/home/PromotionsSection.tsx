'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Percent, Gift } from "lucide-react"
import Link from "next/link"

export function PromotionsSection() {
  const promotions = [
    {
      id: 1,
      title: "Weekend Special",
      description: "Get 20% off on all combo meals every Saturday & Sunday",
      discount: "20% OFF",
      icon: "🍗",
      validUntil: "Valid until Dec 31, 2024",
      type: "percentage",
      color: "bg-brand-spicy/10 text-brand-spicy border-brand-spicy/20"
    },
    {
      id: 2,
      title: "Free Delivery",
      description: "Free delivery for orders above RM50 within 10km radius",
      discount: "FREE",
      icon: "🛵",
      validUntil: "Ongoing promotion",
      type: "delivery",
      color: "bg-brand-fresh/10 text-brand-fresh border-brand-fresh/20"
    },
    {
      id: 3,
      title: "First Order Deal",
      description: "RM10 off on your first order with us",
      discount: "RM10 OFF",
      icon: "🎁",
      validUntil: "For new customers only",
      type: "fixed",
      color: "bg-brand-crispy/10 text-brand-crispy border-brand-crispy/20"
    }
  ]

  return (
    <section className="py-16 bg-menu-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-menu-yellow text-menu-dark font-bold">
            🔥 Hot Deals
          </Badge>
          <h2 className="text-3xl md:text-4xl font-black text-menu-light mb-4">
            Current Promotions
          </h2>
          <p className="text-lg text-menu-light/80 max-w-2xl mx-auto font-bold">
            Don't miss out on our amazing deals and special offers!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promotions.map((promo) => (
            <Card key={promo.id} className={`border-2 ${promo.color} hover:shadow-lg transition-shadow duration-300 bg-menu-light`}>
              <CardHeader className="text-center pb-4">
                <div className="text-5xl mb-4">{promo.icon}</div>
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

                <Button className="w-full mt-4 bg-menu-yellow text-menu-dark hover:bg-menu-accent font-black" variant={promo.type === 'delivery' ? 'default' : 'outline'}>
                  Claim Offer
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/promotions">
            <Button size="lg" className="bg-menu-yellow text-menu-dark hover:bg-menu-accent font-black">
              View All Promotions
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}