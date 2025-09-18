'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { useRouter } from "next/navigation"

export function CartSidebar() {
  const { items, removeItem, updateQuantity, clearCart, getSubtotal, setIsOpen } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const router = useRouter()

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setDiscount(getSubtotal() * 0.1)
    } else if (promoCode.toUpperCase() === 'FREESHIP') {
      // Free shipping promo would be handled differently
      setDiscount(5)
    } else {
      setDiscount(0)
    }
  }

  const subtotal = getSubtotal()
  const deliveryFee = subtotal > 50 ? 0 : 5
  const total = subtotal + deliveryFee - discount

  const renderSpiceLevel = (level: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-3 rounded-sm ${
              i < level ? 'bg-menu-red' : 'bg-menu-dark/20'
            }`}
          />
        ))}
      </div>
    )
  }

  const handleCheckout = () => {
    setIsOpen(false)
    router.push('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-menu-dark">Your Cart</h2>
          <ShoppingBag className="h-5 w-5 text-menu-dark/60" />
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <ShoppingBag className="h-16 w-16 text-menu-dark/30 mx-auto mb-4" />
            <p className="text-menu-dark/60 mb-2 font-bold">Your cart is empty</p>
            <p className="text-sm text-menu-dark/40 font-bold">Add some delicious items to get started!</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-menu-dark">Your Cart</h2>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-menu-yellow text-menu-dark font-bold">
            {items.reduce((sum, item) => sum + item.quantity, 0)} items
          </Badge>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={clearCart}
            className="text-menu-red hover:text-menu-red/80"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.cartId} className="border border-menu-yellow/20 rounded-lg p-3 space-y-2 bg-menu-light">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-sm font-black text-menu-dark">{item.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  {renderSpiceLevel(item.spiceLevel)}
                  <span className="text-xs text-menu-dark/60 font-bold">
                    Level {item.spiceLevel}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(item.cartId)}
                className="text-menu-red hover:text-menu-red/80 p-0 h-6 w-6"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="font-semibold text-menu-dark font-black">
                RM{(item.price * item.quantity).toFixed(2)}
              </span>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                  className="h-8 w-8 p-0 border-menu-yellow/20 text-menu-dark hover:bg-menu-yellow/10"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm font-black text-menu-dark">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                  className="h-8 w-8 p-0 border-menu-yellow/20 text-menu-dark hover:bg-menu-yellow/10"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code */}
      <div className="space-y-2 mb-4">
        <label className="text-sm font-medium font-black text-menu-dark">Promo Code</label>
        <div className="flex gap-2">
          <Input
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1"
          />
          <Button 
            variant="outline" 
            size="sm" 
            className="border-menu-yellow/20 text-menu-dark hover:bg-menu-yellow/10"
            onClick={applyPromoCode}
          >
            Apply
          </Button>
        </div>
        {discount > 0 && (
          <p className="text-xs text-menu-accent font-bold">Promo code applied! -RM{discount.toFixed(2)}</p>
        )}
      </div>

      <Separator className="my-4" />

      {/* Order Summary */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="font-bold text-menu-dark/80">Subtotal</span>
          <span className="font-black text-menu-dark">RM{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-bold text-menu-dark/80">Delivery Fee</span>
          <span className="font-black text-menu-dark">{deliveryFee === 0 ? 'FREE' : `RM${deliveryFee.toFixed(2)}`}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-menu-accent">
            <span className="font-bold">Discount</span>
            <span className="font-black">-RM{discount.toFixed(2)}</span>
          </div>
        )}
        <Separator />
        <div className="flex justify-between font-bold text-lg">
          <span className="font-black text-menu-dark">Total</span>
          <span className="font-black text-menu-yellow">RM{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Button 
        size="lg" 
        className="w-full bg-menu-yellow hover:bg-menu-accent text-menu-dark font-black"
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </Button>

      {subtotal < 50 && deliveryFee > 0 && (
        <p className="text-xs text-menu-dark/60 text-center mt-2 font-bold">
          Add RM{(50 - subtotal).toFixed(2)} more for free delivery
        </p>
      )}
    </div>
  )
}