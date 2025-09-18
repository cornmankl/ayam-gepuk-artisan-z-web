'use client'

import { useState } from 'react'
import { Navigation } from "@/components/layout/Navigation"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { PromotionList } from "@/components/admin/promotions/PromotionList"
import { PromotionForm } from "@/components/admin/promotions/PromotionForm"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Search, Filter, Gift, Percent, Calculator } from "lucide-react"

// Mock promotions data
const mockPromotions = [
  {
    id: '1',
    code: 'WEEKEND20',
    name: 'Weekend Special',
    description: 'Get 20% off on all combo meals every Saturday & Sunday',
    type: 'PERCENTAGE',
    value: 20,
    minOrderAmount: 30,
    maxUsage: 100,
    usageCount: 45,
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    code: 'FREESHIP',
    name: 'Free Delivery',
    description: 'Free delivery for orders above RM50 within 10km radius',
    type: 'FREE_DELIVERY',
    value: 0,
    minOrderAmount: 50,
    maxUsage: null,
    usageCount: 128,
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '3',
    code: 'FIRST10',
    name: 'First Order Deal',
    description: 'RM10 off on your first order with us',
    type: 'FIXED_AMOUNT',
    value: 10,
    minOrderAmount: 20,
    maxUsage: 50,
    usageCount: 32,
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-06-30T23:59:59Z',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '4',
    code: 'RAMADAN15',
    name: 'Ramadan Special',
    description: '15% off during Ramadan month',
    type: 'PERCENTAGE',
    value: 15,
    minOrderAmount: 25,
    maxUsage: 200,
    usageCount: 89,
    startDate: '2024-03-11T00:00:00Z',
    endDate: '2024-04-09T23:59:59Z',
    isActive: false,
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-11T10:30:00Z'
  }
]

export default function AdminPromotionsPage() {
  const [promotions, setPromotions] = useState(mockPromotions)
  const [selectedPromotion, setSelectedPromotion] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')

  const filteredPromotions = promotions.filter(promo => {
    const matchesSearch = promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promo.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || 
                          (filterStatus === 'active' && promo.isActive) ||
                          (filterStatus === 'inactive' && !promo.isActive)
    const matchesType = filterType === 'all' || promo.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  const handleAddPromotion = (promoData: any) => {
    const newPromo = {
      ...promoData,
      id: Date.now().toString(),
      usageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setPromotions(prev => [...prev, newPromo])
    setIsFormOpen(false)
  }

  const handleEditPromotion = (promoData: any) => {
    const updatedPromo = {
      ...promoData,
      updatedAt: new Date().toISOString()
    }
    setPromotions(prev => prev.map(promo => 
      promo.id === updatedPromo.id ? updatedPromo : promo
    ))
    setIsFormOpen(false)
    setSelectedPromotion(null)
  }

  const handleDeletePromotion = (promoId: string) => {
    setPromotions(prev => prev.filter(promo => promo.id !== promoId))
  }

  const handleToggleStatus = (promoId: string, isActive: boolean) => {
    setPromotions(prev => prev.map(promo => 
      promo.id === promoId 
        ? { ...promo, isActive, updatedAt: new Date().toISOString() }
        : promo
    ))
  }

  const stats = {
    totalPromotions: promotions.length,
    activePromotions: promotions.filter(p => p.isActive).length,
    totalUsage: promotions.reduce((sum, promo) => sum + promo.usageCount, 0),
    avgDiscount: promotions.length > 0 
      ? promotions.reduce((sum, promo) => sum + promo.value, 0) / promotions.length 
      : 0
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
              <h1 className="text-3xl font-black text-menu-dark">Promotion Management</h1>
              <p className="text-menu-dark/70 font-bold">Create and manage discount codes and special offers</p>
            </div>
            
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button className="bg-menu-yellow hover:bg-menu-accent text-menu-dark font-black">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Promotion
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-black text-menu-dark">
                    {selectedPromotion ? 'Edit Promotion' : 'Add New Promotion'}
                  </DialogTitle>
                </DialogHeader>
                <PromotionForm
                  promotion={selectedPromotion}
                  onSubmit={selectedPromotion ? handleEditPromotion : handleAddPromotion}
                  onCancel={() => {
                    setIsFormOpen(false)
                    setSelectedPromotion(null)
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-menu-light p-4 rounded-lg border border-menu-yellow/20">
              <div className="flex items-center gap-2">
                <Gift className="h-8 w-8 text-menu-yellow" />
                <div>
                  <div className="text-2xl font-black text-menu-dark">{stats.totalPromotions}</div>
                  <div className="text-sm text-menu-dark/60 font-bold">Total Promotions</div>
                </div>
              </div>
            </div>
            <div className="bg-menu-light p-4 rounded-lg border border-menu-yellow/20">
              <div className="flex items-center gap-2">
                <Percent className="h-8 w-8 text-menu-accent" />
                <div>
                  <div className="text-2xl font-black text-menu-accent">{stats.activePromotions}</div>
                  <div className="text-sm text-menu-dark/60 font-bold">Active</div>
                </div>
              </div>
            </div>
            <div className="bg-menu-light p-4 rounded-lg border border-menu-yellow/20">
              <div className="flex items-center gap-2">
                <Calculator className="h-8 w-8 text-menu-red" />
                <div>
                  <div className="text-2xl font-black text-menu-red">{stats.totalUsage}</div>
                  <div className="text-sm text-menu-dark/60 font-bold">Total Usage</div>
                </div>
              </div>
            </div>
            <div className="bg-menu-light p-4 rounded-lg border border-menu-yellow/20">
              <div className="flex items-center gap-2">
                <Gift className="h-8 w-8 text-menu-yellow" />
                <div>
                  <div className="text-2xl font-black text-menu-yellow">{stats.avgDiscount.toFixed(1)}%</div>
                  <div className="text-sm text-menu-dark/60 font-bold">Avg Discount</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-menu-light p-4 rounded-lg border border-menu-yellow/20 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-menu-dark/40" />
                  <input
                    type="text"
                    placeholder="Search promotions..."
                    className="w-full pl-10 pr-4 py-2 border border-menu-yellow/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-menu-yellow bg-menu-light text-menu-dark placeholder:text-menu-dark/40"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <select
                className="px-4 py-2 border border-menu-yellow/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-menu-yellow bg-menu-light text-menu-dark"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              
              <select
                className="px-4 py-2 border border-menu-yellow/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-menu-yellow bg-menu-light text-menu-dark"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="PERCENTAGE">Percentage</option>
                <option value="FIXED_AMOUNT">Fixed Amount</option>
                <option value="FREE_DELIVERY">Free Delivery</option>
              </select>
            </div>
          </div>

          {/* Promotions List */}
          <PromotionList
            promotions={filteredPromotions}
            onEdit={(promo) => {
              setSelectedPromotion(promo)
              setIsFormOpen(true)
            }}
            onDelete={handleDeletePromotion}
            onToggleStatus={handleToggleStatus}
          />
        </main>
      </div>
    </div>
  )
}