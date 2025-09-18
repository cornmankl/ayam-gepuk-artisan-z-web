'use client'

import { useState, useEffect } from 'react'
import { Navigation } from "@/components/layout/Navigation"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { OrderList } from "@/components/admin/OrderList"
import { OrderDetails } from "@/components/admin/OrderDetails"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, RefreshCw, TrendingUp, Users, Clock, CheckCircle } from "lucide-react"

// Mock orders data
const mockOrders = [
  {
    id: '1',
    orderNumber: 'AGA-2024-001',
    status: 'PENDING',
    orderType: 'DELIVERY',
    customerName: 'Ahmad bin Ibrahim',
    customerPhone: '012-3456789',
    deliveryAddress: 'No. 123, Jalan Melawati 1, Taman Melawati, 53100 KL',
    subtotal: 47.70,
    deliveryFee: 5.00,
    totalAmount: 52.70,
    paymentStatus: 'PENDING',
    createdAt: '2024-01-15T10:30:00Z',
    items: [
      { name: 'Ayam Gepuk Krispy', quantity: 2, price: 12.90, spiceLevel: 3 },
      { name: 'Teh Tarik', quantity: 2, price: 3.50, spiceLevel: 0 }
    ]
  },
  {
    id: '2',
    orderNumber: 'AGA-2024-002',
    status: 'CONFIRMED',
    orderType: 'PICKUP',
    customerName: 'Siti Aminah',
    customerPhone: '019-8765432',
    deliveryAddress: '',
    subtotal: 35.80,
    deliveryFee: 0.00,
    totalAmount: 35.80,
    paymentStatus: 'PAID',
    createdAt: '2024-01-15T10:15:00Z',
    items: [
      { name: 'Ayam Gepuk Madu', quantity: 1, price: 14.90, spiceLevel: 1 },
      { name: 'Nasi Ayam Gepuk', quantity: 1, price: 16.90, spiceLevel: 2 },
      { name: 'Teh Tarik', quantity: 1, price: 3.50, spiceLevel: 0 }
    ]
  },
  {
    id: '3',
    orderNumber: 'AGA-2024-003',
    status: 'PREPARING',
    orderType: 'DELIVERY',
    customerName: 'Mohamed Rafi',
    customerPhone: '017-1234567',
    deliveryAddress: 'Apt-5-15, Blok A, Wangsa Maju, 53300 KL',
    subtotal: 89.60,
    deliveryFee: 0.00,
    totalAmount: 89.60,
    paymentStatus: 'PAID',
    createdAt: '2024-01-15T09:45:00Z',
    items: [
      { name: 'Set Kombo A', quantity: 2, price: 18.90, spiceLevel: 3 },
      { name: 'Ayam Gepuk Cheese', quantity: 2, price: 15.90, spiceLevel: 2 }
    ]
  }
]

export default function AdminPage() {
  const [orders, setOrders] = useState(mockOrders)
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('all')
  const [notificationCount, setNotificationCount] = useState(2)

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true
    return order.status === activeTab.toUpperCase()
  })

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus.toUpperCase() }
        : order
    ))
    
    // Show notification for status changes
    if (newStatus.toUpperCase() === 'COMPLETED') {
      setNotificationCount(prev => prev + 1)
    }
  }

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'PENDING').length,
    preparingOrders: orders.filter(o => o.status === 'PREPARING').length,
    completedOrders: orders.filter(o => o.status === 'COMPLETED').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0)
  }

  return (
    <div className="min-h-screen bg-menu-light">
      <Navigation />
      
      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-black text-menu-dark">Admin Dashboard</h1>
              <p className="text-menu-dark/70 font-bold">Manage orders and monitor business performance</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="border-menu-yellow/20 text-menu-dark hover:bg-menu-yellow/10">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              
              <div className="relative">
                <Button variant="outline" size="sm" className="border-menu-yellow/20 text-menu-dark hover:bg-menu-yellow/10">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
                {notificationCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-menu-red text-menu-light"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-menu-dark/60 font-bold">Total Orders</p>
                    <p className="text-2xl font-black text-menu-dark">{stats.totalOrders}</p>
                  </div>
                  <Users className="h-8 w-8 text-menu-yellow" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-menu-dark/60 font-bold">Pending</p>
                    <p className="text-2xl font-black text-menu-red">{stats.pendingOrders}</p>
                  </div>
                  <Clock className="h-8 w-8 text-menu-red" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-menu-dark/60 font-bold">Preparing</p>
                    <p className="text-2xl font-black text-menu-accent">{stats.preparingOrders}</p>
                  </div>
                  <RefreshCw className="h-8 w-8 text-menu-accent" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-menu-dark/60 font-bold">Completed</p>
                    <p className="text-2xl font-black text-menu-yellow">{stats.completedOrders}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-menu-yellow" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-menu-dark/60 font-bold">Revenue</p>
                    <p className="text-2xl font-black text-menu-accent">RM{stats.totalRevenue.toFixed(2)}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-menu-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders Tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
                  <TabsTrigger value="pending">Pending ({stats.pendingOrders})</TabsTrigger>
                  <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                  <TabsTrigger value="preparing">Preparing</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeTab} className="mt-4">
                  <OrderList 
                    orders={filteredOrders}
                    selectedOrder={selectedOrder}
                    onOrderSelect={setSelectedOrder}
                    onStatusUpdate={updateOrderStatus}
                  />
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <OrderDetails 
                order={selectedOrder ? orders.find(o => o.id === selectedOrder) : null}
                onStatusUpdate={updateOrderStatus}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}