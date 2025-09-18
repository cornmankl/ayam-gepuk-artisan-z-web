'use client'

import { useEffect, useState } from 'react'
import { Navigation } from "@/components/layout/Navigation"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  Store, 
  Truck, 
  Receipt,
  ChefHat,
  Package,
  Navigation as NavigationIcon
} from "lucide-react"
import Link from "next/link"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  spiceLevel: number
}

interface OrderData {
  orderNumber: string
  status: 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED'
  orderType: 'delivery' | 'pickup'
  customerName: string
  customerPhone: string
  deliveryAddress?: string
  pickupBranch?: string
  estimatedTime: string
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  discount: number
  total: number
  paymentMethod: string
  createdAt: string
}

// Mock order data - in real app, this would come from API or localStorage
const mockOrderData: OrderData = {
  orderNumber: 'AGA-2024-001234',
  status: 'CONFIRMED',
  orderType: 'delivery',
  customerName: 'Ahmad bin Ibrahim',
  customerPhone: '012-3456789',
  deliveryAddress: 'No. 123, Jalan Melawati 1, Taman Melawati, 53100 Kuala Lumpur',
  estimatedTime: '30-45 minutes',
  items: [
    { id: '1', name: 'SET A Krispy', price: 7.99, quantity: 2, spiceLevel: 3 },
    { id: '2', name: 'Ayam Goreng Krispy', price: 4.70, quantity: 1, spiceLevel: 2 },
    { id: '3', name: 'Teh Tarik', price: 2.00, quantity: 2, spiceLevel: 0 }
  ],
  subtotal: 22.68,
  deliveryFee: 5.00,
  discount: 0,
  total: 27.68,
  paymentMethod: 'Online Banking (FPX)',
  createdAt: new Date().toISOString()
}

const statusSteps = [
  { key: 'CONFIRMED', label: 'Order Confirmed', icon: CheckCircle, description: 'Your order has been received' },
  { key: 'PREPARING', label: 'Preparing', icon: ChefHat, description: 'Our chefs are preparing your food' },
  { key: 'READY', label: 'Ready', icon: Package, description: 'Your order is ready for pickup/delivery' },
  { key: 'DELIVERED', label: 'Delivered', icon: CheckCircle, description: 'Order completed successfully' }
]

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<OrderData | null>(null)
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0)

  useEffect(() => {
    // In real app, fetch order data from API or get from localStorage
    const orderData = localStorage.getItem('lastOrder')
    if (orderData) {
      setOrder(JSON.parse(orderData))
    } else {
      setOrder(mockOrderData)
    }

    // Simulate order status updates
    const interval = setInterval(() => {
      setCurrentStatusIndex(prev => {
        if (prev < statusSteps.length - 1) {
          return prev + 1
        }
        clearInterval(interval)
        return prev
      })
    }, 10000) // Update every 10 seconds for demo

    return () => clearInterval(interval)
  }, [])

  const renderSpiceLevel = (level: number) => {
    if (level === 0) return null
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return 'bg-menu-yellow text-menu-dark'
      case 'PREPARING': return 'bg-menu-accent text-menu-light'
      case 'READY': return 'bg-menu-red text-menu-light'
      case 'DELIVERED': return 'bg-green-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-menu-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-menu-yellow mx-auto mb-4"></div>
          <p className="text-menu-dark font-bold">Loading order details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-menu-light">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-menu-yellow rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-menu-dark" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-menu-dark mb-4">
            Order Confirmed!
          </h1>
          <p className="text-lg text-menu-dark/70 max-w-2xl mx-auto font-bold">
            Thank you for your order. We're preparing your delicious meal now!
          </p>
          <Badge className={`mt-4 ${getStatusColor(order.status)} font-black text-lg px-4 py-2`}>
            Order #{order.orderNumber}
          </Badge>
        </div>

        {/* Order Status Tracking */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Order Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="relative">
                <div className="absolute top-5 left-0 w-full h-0.5 bg-menu-dark/20"></div>
                <div 
                  className="absolute top-5 left-0 h-0.5 bg-menu-yellow transition-all duration-500"
                  style={{ width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%` }}
                ></div>
                
                <div className="relative flex justify-between">
                  {statusSteps.map((step, index) => {
                    const Icon = step.icon
                    const isActive = index <= currentStatusIndex
                    const isCurrent = index === currentStatusIndex
                    
                    return (
                      <div key={step.key} className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                          isActive 
                            ? 'bg-menu-yellow text-menu-dark' 
                            : 'bg-menu-dark/20 text-menu-dark/50'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="mt-2 text-center max-w-20">
                          <p className={`text-xs font-medium ${
                            isCurrent ? 'text-menu-yellow font-black' : isActive ? 'text-menu-dark' : 'text-menu-dark/50'
                          }`}>
                            {step.label}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              {/* Current Status Description */}
              <div className="text-center p-4 bg-menu-yellow/10 rounded-lg border border-menu-yellow/20">
                <p className="font-black text-menu-dark">
                  {statusSteps[currentStatusIndex].description}
                </p>
                <p className="text-sm text-menu-dark/80 font-bold mt-1">
                  Estimated time: {order.estimatedTime}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start py-2 border-b border-menu-yellow/20 last:border-b-0">
                      <div className="flex-1">
                        <div className="font-medium text-sm font-black text-menu-dark">{item.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          {renderSpiceLevel(item.spiceLevel)}
                          <span className="text-xs text-menu-dark/60 font-bold">x{item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-semibold text-menu-red font-black">
                        RM{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery/Pickup Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {order.orderType === 'delivery' ? (
                    <>
                      <Truck className="h-5 w-5" />
                      Delivery Information
                    </>
                  ) : (
                    <>
                      <Store className="h-5 w-5" />
                      Pickup Information
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.orderType === 'delivery' ? (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-menu-red mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-menu-dark font-black">Delivery Address</p>
                        <p className="text-sm text-menu-dark/70 font-bold">{order.deliveryAddress}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Store className="h-5 w-5 text-menu-red mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-menu-dark font-black">Pickup Branch</p>
                        <p className="text-sm text-menu-dark/70 font-bold">{order.pickupBranch}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-menu-red mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-menu-dark font-black">Estimated Time</p>
                    <p className="text-sm text-menu-dark/70 font-bold">{order.estimatedTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-menu-dark/80">Subtotal</span>
                    <span className="font-black text-menu-dark">RM{order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-menu-dark/80">Delivery Fee</span>
                    <span className="font-black text-menu-dark">
                      {order.deliveryFee === 0 ? 'FREE' : `RM${order.deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-sm text-menu-accent">
                      <span className="font-bold">Discount</span>
                      <span className="font-black">-RM{order.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span className="font-black text-menu-dark">Total Paid</span>
                    <span className="font-black text-menu-yellow">RM{order.total.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-menu-dark/80 font-black">Payment Method</p>
                    <p className="text-sm text-menu-dark font-bold">{order.paymentMethod}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-menu-dark/80 font-black">Customer</p>
                    <p className="text-sm text-menu-dark font-bold">{order.customerName}</p>
                    <p className="text-sm text-menu-dark/70 font-bold">{order.customerPhone}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <Button asChild className="w-full bg-menu-yellow hover:bg-menu-accent text-menu-dark font-black">
                    <Link href="/menu">
                      Order Again
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full border-menu-red text-menu-red hover:bg-menu-red hover:text-menu-light font-black">
                    <Link href="/profile">
                      View Order History
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Customer Support */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="font-bold text-lg text-menu-dark mb-2 font-black">Need Help?</h3>
              <p className="text-menu-dark/70 font-bold mb-4">
                If you have any questions about your order, feel free to contact us
              </p>
              <div className="flex justify-center gap-6">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-menu-red" />
                  <span className="font-bold text-menu-dark">03-4107 1234</span>
                </div>
                <div className="flex items-center gap-2">
                  <NavigationIcon className="h-5 w-5 text-menu-red" />
                  <span className="font-bold text-menu-dark">Live Chat</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}