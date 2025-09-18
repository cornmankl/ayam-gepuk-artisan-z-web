'use client'

import { useState } from 'react'
import { Navigation } from "@/components/layout/Navigation"
import { Footer } from "@/components/layout/Footer"
import { CheckoutForm } from "@/components/checkout/CheckoutForm"
import { OrderSummary } from "@/components/checkout/OrderSummary"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Shield, Truck, Store } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/CartContext"

// Mock branches
const mockBranches = [
  { id: '1', name: 'Taman Melawati', address: 'Jalan Bandar 11, Taman Melawati' },
  { id: '2', name: 'Wangsa Maju', address: 'Jalan 1/27A, Wangsa Maju' },
  { id: '3', name: 'Setapak', address: 'Jalan Genting Klang, Setapak' }
]

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCart()
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery')
  const [selectedBranch, setSelectedBranch] = useState('1')
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    deliveryAddress: '',
    deliveryNotes: '',
    paymentMethod: ''
  })

  // If cart is empty, redirect to menu
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-menu-light flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-black text-menu-dark mb-4">Your cart is empty</h1>
          <p className="text-menu-dark/70 mb-6 font-bold">Add some items to your cart to proceed with checkout</p>
          <Link href="/menu">
            <Button className="bg-menu-yellow hover:bg-menu-accent text-menu-dark font-black">
              Browse Menu
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = getSubtotal()
  const deliveryFee = orderType === 'delivery' && subtotal < 50 ? 5 : 0
  const discount = 0 // Could be calculated from promo codes
  const total = subtotal + deliveryFee - discount

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handlePlaceOrder = () => {
    // Create order data
    const orderData = {
      orderNumber: `AGA-2024-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
      status: 'CONFIRMED' as const,
      orderType,
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerEmail: formData.customerEmail,
      deliveryAddress: orderType === 'delivery' ? formData.deliveryAddress : undefined,
      pickupBranch: orderType === 'pickup' ? mockBranches.find(b => b.id === selectedBranch)?.name : undefined,
      estimatedTime: orderType === 'delivery' ? '30-45 minutes' : '15-30 minutes',
      items,
      subtotal,
      deliveryFee,
      discount,
      total,
      paymentMethod: formData.paymentMethod,
      createdAt: new Date().toISOString()
    }
    
    // Save order to localStorage for confirmation page
    localStorage.setItem('lastOrder', JSON.stringify(orderData))
    
    // Clear cart
    clearCart()
    
    // Redirect to order confirmation page
    window.location.href = '/checkout/confirmation'
  }

  return (
    <div className="min-h-screen bg-menu-light">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/menu" className="inline-flex items-center gap-2 text-menu-yellow hover:text-menu-accent mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Menu
          </Link>
          
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 bg-menu-yellow text-menu-dark font-bold">
              🛒 Checkout
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black text-menu-dark mb-4">
              Complete Your Order
            </h1>
            <p className="text-lg text-menu-dark/70 max-w-2xl mx-auto font-bold">
              Almost there! Review your order and provide delivery details
            </p>
          </div>
        </div>

        {/* Order Type Selection */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant={orderType === 'delivery' ? 'default' : 'outline'}
              className={`h-auto p-6 flex flex-col items-center gap-3 ${
                orderType === 'delivery' 
                  ? 'bg-menu-yellow hover:bg-menu-accent text-menu-dark' 
                  : 'border-menu-yellow/20 text-menu-yellow hover:bg-menu-yellow/10'
              }`}
              onClick={() => setOrderType('delivery')}
            >
              <Truck className="h-8 w-8" />
              <div className="text-center">
                <div className="font-semibold text-lg font-black">Delivery</div>
                <div className="text-sm opacity-75 font-bold">We deliver to your doorstep</div>
                {deliveryFee > 0 && (
                  <div className="text-xs mt-1 font-bold">RM{deliveryFee.toFixed(2)} delivery fee</div>
                )}
              </div>
            </Button>
            
            <Button
              variant={orderType === 'pickup' ? 'default' : 'outline'}
              className={`h-auto p-6 flex flex-col items-center gap-3 ${
                orderType === 'pickup' 
                  ? 'bg-menu-yellow hover:bg-menu-accent text-menu-dark' 
                  : 'border-menu-yellow/20 text-menu-yellow hover:bg-menu-yellow/10'
              }`}
              onClick={() => setOrderType('pickup')}
            >
              <Store className="h-8 w-8" />
              <div className="text-center">
                <div className="font-semibold text-lg font-black">Self Pickup</div>
                <div className="text-sm opacity-75 font-bold">Pick up at our branch</div>
                <div className="text-xs mt-1 font-bold">No delivery fee</div>
              </div>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm
              orderType={orderType}
              formData={formData}
              branches={mockBranches}
              selectedBranch={selectedBranch}
              onFormChange={handleFormChange}
              onBranchChange={setSelectedBranch}
            />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              discount={discount}
              total={total}
              onPlaceOrder={handlePlaceOrder}
              isFormValid={formData.customerName && formData.customerPhone && 
                           (orderType === 'pickup' || formData.deliveryAddress) &&
                           formData.paymentMethod}
            />
          </div>
        </div>

        {/* Security Note */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-menu-dark/60">
            <Shield className="h-4 w-4" />
            <span className="font-bold">Your payment information is secure and encrypted</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}