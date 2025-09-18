'use client'

import { useState } from 'react'
import { Navigation } from "@/components/layout/Navigation"
import { Footer } from "@/components/layout/Footer"
import { ProfileHeader } from "@/components/profile/ProfileHeader"
import { PersonalInfo } from "@/components/profile/PersonalInfo"
import { OrderHistory } from "@/components/profile/OrderHistory"
import { AddressBook } from "@/components/profile/AddressBook"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, ShoppingBag, MapPin, Settings, Bell, Shield } from "lucide-react"

// Mock user data
const mockUser = {
  id: '1',
  name: 'Ahmad bin Ibrahim',
  email: 'ahmad.ibrahim@email.com',
  phone: '012-3456789',
  avatar: '/api/placeholder/150/150',
  joinDate: '2024-01-01T00:00:00Z',
  lastLogin: '2024-01-15T10:30:00Z',
  isVerified: true,
  notifications: {
    email: true,
    sms: false,
    push: true
  }
}

// Mock order history
const mockOrders = [
  {
    id: '1',
    orderNumber: 'AGA-2024-001',
    status: 'COMPLETED',
    orderType: 'DELIVERY',
    totalAmount: 52.70,
    createdAt: '2024-01-15T10:30:00Z',
    items: [
      { name: 'Ayam Gepuk Krispy', quantity: 2 },
      { name: 'Teh Tarik', quantity: 2 }
    ]
  },
  {
    id: '2',
    orderNumber: 'AGA-2024-002',
    status: 'COMPLETED',
    orderType: 'PICKUP',
    totalAmount: 35.80,
    createdAt: '2024-01-10T14:20:00Z',
    items: [
      { name: 'Ayam Gepuk Madu', quantity: 1 },
      { name: 'Nasi Ayam Gepuk', quantity: 1 },
      { name: 'Teh Tarik', quantity: 1 }
    ]
  },
  {
    id: '3',
    orderNumber: 'AGA-2024-003',
    status: 'CANCELLED',
    orderType: 'DELIVERY',
    totalAmount: 89.60,
    createdAt: '2024-01-05T19:15:00Z',
    items: [
      { name: 'Set Kombo A', quantity: 2 },
      { name: 'Ayam Gepuk Cheese', quantity: 2 }
    ]
  }
]

// Mock addresses
const mockAddresses = [
  {
    id: '1',
    label: 'Home',
    name: 'Ahmad bin Ibrahim',
    phone: '012-3456789',
    address: 'No. 123, Jalan Melawati 1, Taman Melawati, 53100 Kuala Lumpur',
    isDefault: true,
    coordinates: { lat: 3.2088, lng: 101.7551 }
  },
  {
    id: '2',
    label: 'Office',
    name: 'Ahmad bin Ibrahim',
    phone: '012-3456789',
    address: 'Level 15, Menara KLCC, 50088 Kuala Lumpur',
    isDefault: false,
    coordinates: { lat: 3.1577, lng: 101.7116 }
  }
]

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser)
  const [orders] = useState(mockOrders)
  const [addresses, setAddresses] = useState(mockAddresses)

  const stats = {
    totalOrders: orders.length,
    completedOrders: orders.filter(o => o.status === 'COMPLETED').length,
    totalSpent: orders.reduce((sum, order) => sum + order.totalAmount, 0),
    favoriteBranch: 'Taman Melawati'
  }

  const handleUpdateProfile = (updatedData: any) => {
    setUser(prev => ({ ...prev, ...updatedData }))
  }

  const handleAddAddress = (newAddress: any) => {
    const address = {
      ...newAddress,
      id: Date.now().toString(),
      isDefault: addresses.length === 0
    }
    setAddresses(prev => [...prev, address])
  }

  const handleUpdateAddress = (addressId: string, updatedData: any) => {
    setAddresses(prev => prev.map(addr => 
      addr.id === addressId ? { ...addr, ...updatedData } : addr
    ))
  }

  const handleDeleteAddress = (addressId: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId))
  }

  const handleSetDefaultAddress = (addressId: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })))
  }

  return (
    <div className="min-h-screen bg-menu-light">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-menu-yellow text-menu-dark font-bold">
            👤 My Account
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black text-menu-dark mb-4">
            My Profile
          </h1>
          <p className="text-lg text-menu-dark/70 max-w-2xl mx-auto font-bold">
            Manage your account information, order history, and preferences
          </p>
        </div>

        {/* Profile Header */}
        <ProfileHeader user={user} onUpdateProfile={handleUpdateProfile} />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-black text-menu-yellow">{stats.totalOrders}</div>
              <div className="text-sm text-menu-dark/60 font-bold">Total Orders</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-black text-menu-accent">{stats.completedOrders}</div>
              <div className="text-sm text-menu-dark/60 font-bold">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-black text-menu-red">RM{stats.totalSpent.toFixed(2)}</div>
              <div className="text-sm text-menu-dark/60 font-bold">Total Spent</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-black text-menu-yellow">{stats.favoriteBranch}</div>
              <div className="text-sm text-menu-dark/60 font-bold">Favorite Branch</div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Content */}
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Personal Info</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span className="hidden sm:inline">Order History</span>
              </TabsTrigger>
              <TabsTrigger value="addresses" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Addresses</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="mt-6">
              <PersonalInfo 
                user={user} 
                onUpdateProfile={handleUpdateProfile} 
              />
            </TabsContent>

            <TabsContent value="orders" className="mt-6">
              <OrderHistory orders={orders} />
            </TabsContent>

            <TabsContent value="addresses" className="mt-6">
              <AddressBook 
                addresses={addresses}
                onAddAddress={handleAddAddress}
                onUpdateAddress={handleUpdateAddress}
                onDeleteAddress={handleDeleteAddress}
                onSetDefaultAddress={handleSetDefaultAddress}
              />
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-gray-500">Receive order updates and promotions via email</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm ${user.notifications.email ? 'text-green-600' : 'text-gray-500'}`}>
                          {user.notifications.email ? 'On' : 'Off'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">SMS Notifications</div>
                        <div className="text-sm text-gray-500">Receive order updates via SMS</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm ${user.notifications.sms ? 'text-green-600' : 'text-gray-500'}`}>
                          {user.notifications.sms ? 'On' : 'Off'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Push Notifications</div>
                        <div className="text-sm text-gray-500">Receive push notifications on your device</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm ${user.notifications.push ? 'text-green-600' : 'text-gray-500'}`}>
                          {user.notifications.push ? 'On' : 'Off'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Two-Factor Authentication
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600">
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}