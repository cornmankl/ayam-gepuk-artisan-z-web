'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Receipt, Clock, MapPin, Store, Phone } from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  spiceLevel: number
}

interface OrderSummaryProps {
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  discount: number
  total: number
  onPlaceOrder: () => void
  isFormValid: boolean
}

export function OrderSummary({
  items,
  subtotal,
  deliveryFee,
  discount,
  total,
  onPlaceOrder,
  isFormValid
}: OrderSummaryProps) {
  const renderSpiceLevel = (level: number) => {
    if (level === 0) return null
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-3 rounded-sm ${
              i < level ? 'bg-red-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Order Summary Card */}
      <Card className="sticky top-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Order Items */}
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium text-sm">{item.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    {renderSpiceLevel(item.spiceLevel)}
                    <span className="text-xs text-gray-500">x{item.quantity}</span>
                  </div>
                </div>
                <span className="font-semibold text-menu-red">
                  RM{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <Separator />

          {/* Price Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>RM{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? 'FREE' : `RM${deliveryFee.toFixed(2)}`}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>-RM{discount.toFixed(2)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span className="font-black text-menu-dark">Total</span>
              <span className="font-black text-menu-yellow">RM{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Estimated Time */}
          <div className="bg-menu-yellow/10 p-3 rounded-lg border border-menu-yellow/20">
            <div className="flex items-center gap-2 text-menu-dark">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium font-black">Estimated Time</span>
            </div>
            <p className="text-sm text-menu-dark/80 mt-1 font-bold">
              {deliveryFee === 0 ? '15-30 minutes for pickup' : '30-45 minutes for delivery'}
            </p>
          </div>

          {/* Place Order Button */}
          <Button 
            size="lg" 
            className="w-full bg-menu-yellow hover:bg-menu-accent text-menu-dark font-black"
            onClick={onPlaceOrder}
            disabled={!isFormValid}
          >
            {isFormValid ? 'Place Order' : 'Complete the form to continue'}
          </Button>

          {!isFormValid && (
            <p className="text-xs text-menu-dark/60 text-center font-bold">
              Please fill in all required fields to place your order
            </p>
          )}
        </CardContent>
      </Card>

      {/* Security & Info */}
      <div className="space-y-4">
        <div className="bg-menu-accent/10 p-4 rounded-lg border border-menu-accent/20">
          <h4 className="font-medium text-menu-dark mb-2 font-black">Secure Payment</h4>
          <p className="text-sm text-menu-dark/80 font-bold">
            Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.
          </p>
        </div>

        <div className="bg-menu-light p-4 rounded-lg border border-menu-yellow/20">
          <h4 className="font-medium text-menu-dark mb-2 font-black">Need Help?</h4>
          <p className="text-sm text-menu-dark/80 font-bold mb-2">
            Contact our customer service:
          </p>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-menu-red" />
              <span className="font-bold text-menu-dark">03-4107 1234</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-menu-red" />
              <span className="font-bold text-menu-dark">Multiple locations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}