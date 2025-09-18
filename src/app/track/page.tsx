'use client'

import { useState, useEffect } from 'react'
import { Navigation } from "@/components/layout/Navigation"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { 
  Search, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  Store, 
  Truck,
  ChefHat,
  Package,
  Navigation as NavigationIcon,
  RefreshCw
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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
  driverInfo?: {
    name: string
    phone: string
    vehiclePlate: string
    currentLocation?: string
    estimatedArrival?: string
  }
}

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  spiceLevel: number
}

const statusSteps = [
  { key: 'CONFIRMED', label: 'Order Confirmed', icon: CheckCircle, description: 'Your order has been received' },
  { key: 'PREPARING', label: 'Preparing', icon: ChefHat, description: 'Our chefs are preparing your food' },
  { key: 'READY', label: 'Ready', icon: Package, description: 'Your order is ready for pickup/delivery' },
  { key: 'DELIVERED', label: 'Delivered', icon: CheckCircle, description: 'Order completed successfully' }
]

export default function TrackOrderPage() {
  const [searchOrderNumber, setSearchOrderNumber] = useState('')
  const [order, setOrder] = useState<OrderData | null>(null)
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSearchOrder = async () => {
    if (!searchOrderNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter an order number",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock order data - in real app, this would come from API
      const mockOrder: OrderData = {
        orderNumber: searchOrderNumber,
        status: 'PREPARING',
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
        createdAt: new Date().toISOString(),
        driverInfo: {
          name: 'Ali bin Abu',
          phone: '019-8765432',
          vehiclePlate: 'VWX 1234',
          currentLocation: 'Near Taman Melawati',
          estimatedArrival: '25 minutes'
        }
      }
      
      setOrder(mockOrder)
      
      // Set current status index
      const statusIndex = statusSteps.findIndex(step => step.key === mockOrder.status)
      setCurrentStatusIndex(statusIndex >= 0 ? statusIndex : 0)
      
      toast({
        title: "Order Found",
        description: `Order #${searchOrderNumber} has been found.`,
      })
    } catch (error) {
      toast({
        title: "Order Not Found",
        description: "Please check your order number and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const simulateStatusUpdate = () => {
    if (!order || currentStatusIndex >= statusSteps.length - 1) return
    
    setCurrentStatusIndex(prev => {
      const newIndex = prev + 1
      const newStatus = statusSteps[newIndex].key as OrderData['status']
      
      setOrder(prevOrder => {
        if (!prevOrder) return null
        
        // Add driver info when order is ready for delivery
        let updatedOrder = { ...prevOrder, status: newStatus }
        if (newStatus === 'READY' && prevOrder.orderType === 'delivery') {
          updatedOrder = {
            ...updatedOrder,
            driverInfo: {
              name: 'Ali bin Abu',
              phone: '019-8765432',
              vehiclePlate: 'VWX 1234',
              currentLocation: 'At Restaurant',
              estimatedArrival: '30 minutes'
            }
          }
        }
        
        return updatedOrder
      })
      
      return newIndex
    })
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

  return (
    <div className="min-h-screen bg-menu-light">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-menu-yellow text-menu-dark font-bold">
            📍 Track Your Order
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black text-menu-dark mb-4">
            Real-Time Order Tracking
          </h1>
          <p className="text-lg text-menu-dark/70 max-w-2xl mx-auto font-bold">
            Enter your order number to track your order in real-time
          </p>
        </div>

        {/* Order Search */}
        <Card className="max-w-2xl mx-auto mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Input
                placeholder="Enter your order number (e.g., AGA-2024-001234)"
                value={searchOrderNumber}
                onChange={(e) => setSearchOrderNumber(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSearchOrder()}
              />
              <Button 
                onClick={handleSearchOrder}
                className="bg-menu-yellow hover:bg-menu-accent text-menu-dark font-black"
                disabled={isLoading}
              >
                {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                {isLoading ? 'Searching...' : 'Track Order'}
              </Button>
            </div>
            <p className="text-sm text-menu-dark/60 mt-2 font-bold">
              Demo: Try "AGA-2024-001234"
            </p>
          </CardContent>
        </Card>

        {/* Order Tracking Results */}
        {order && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Order Status Tracking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Order Status - #{order.orderNumber}
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

                  {/* Simulate Update Button (Demo Only) */}
                  <div className="text-center">
                    <Button 
                      onClick={simulateStatusUpdate}
                      className="bg-menu-accent hover:bg-menu-accent/80 text-menu-light font-black"
                      disabled={currentStatusIndex >= statusSteps.length - 1}
                    >
                      Simulate Next Status
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Order Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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

                  <Separator />

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
                      <span className="font-black text-menu-dark">Total</span>
                      <span className="font-black text-menu-yellow">RM{order.total.toFixed(2)}</span>
                    </div>
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
                    <>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-menu-red mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-menu-dark font-black">Delivery Address</p>
                            <p className="text-sm text-menu-dark/70 font-bold">{order.deliveryAddress}</p>
                          </div>
                        </div>
                        
                        {order.driverInfo && (
                          <>
                            <Separator />
                            <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                <NavigationIcon className="h-5 w-5 text-menu-red mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="font-medium text-menu-dark font-black">Driver Information</p>
                                  <p className="text-sm text-menu-dark/70 font-bold">{order.driverInfo.name}</p>
                                  <p className="text-sm text-menu-dark/70 font-bold">{order.driverInfo.phone}</p>
                                  <p className="text-sm text-menu-dark/70 font-bold">Vehicle: {order.driverInfo.vehiclePlate}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-menu-red mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="font-medium text-menu-dark font-black">Driver Location</p>
                                  <p className="text-sm text-menu-dark/70 font-bold">{order.driverInfo.currentLocation}</p>
                                  <p className="text-sm text-menu-dark/70 font-bold">ETA: {order.driverInfo.estimatedArrival}</p>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </>
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

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-menu-red mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-menu-dark font-black">Customer Support</p>
                      <p className="text-sm text-menu-dark/70 font-bold">03-4107 1234</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!order && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="font-bold text-lg text-menu-dark mb-2 font-black">How to Track Your Order</h3>
                <div className="space-y-2 text-sm text-menu-dark/70">
                  <p className="font-bold">1. Enter your order number in the search field above</p>
                  <p className="font-bold">2. Your order number can be found in your confirmation email or SMS</p>
                  <p className="font-bold">3. Format: AGA-2024-XXXXXX</p>
                  <p className="font-bold">4. Click "Track Order" to see real-time updates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  )
}