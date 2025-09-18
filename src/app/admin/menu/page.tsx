'use client'

import { useState } from 'react'
import { Navigation } from "@/components/layout/Navigation"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { MenuList } from "@/components/admin/menu/MenuList"
import { MenuForm } from "@/components/admin/menu/MenuForm"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Search, Filter } from "lucide-react"

// Mock data
const mockCategories = [
  { id: '1', name: 'Set Krispy', description: 'Our signature crispy sets' },
  { id: '2', name: 'Set Klasik', description: 'Classic fried chicken sets' },
  { id: '3', name: 'A la Carte', description: 'Individual items' },
  { id: '4', name: 'Minuman', description: 'Refreshing drinks' },
  { id: '5', name: 'Sampingan', description: 'Side dishes' }
]

const mockMenuItems = [
  {
    id: '1',
    name: 'SET A Krispy',
    description: 'Ayam Goreng Krispy + Nasi Putih + Air',
    price: 7.99,
    image: '/images/menu1.jpg',
    categoryId: '1',
    isAvailable: true,
    isPopular: true,
    spiceLevel: 3,
    crop: 'top',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'SET B Krispy',
    description: '2X Ayam Goreng Krispy + Nasi Putih + Air',
    price: 11.99,
    image: '/images/menu1.jpg',
    categoryId: '1',
    isAvailable: true,
    isPopular: true,
    spiceLevel: 3,
    crop: 'center',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '3',
    name: 'SET C Krispy',
    description: '3X Ayam Goreng Krispy + Nasi Putih + Air',
    price: 15.99,
    image: '/images/menu1.jpg',
    categoryId: '1',
    isAvailable: true,
    isPopular: false,
    spiceLevel: 3,
    crop: 'bottom',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '4',
    name: 'SET A Klasik',
    description: 'Ayam Goreng Klasik + Nasi Putih + Air',
    price: 7.99,
    image: '/images/menu2.jpg',
    categoryId: '2',
    isAvailable: true,
    isPopular: false,
    spiceLevel: 2,
    crop: 'top',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '5',
    name: 'SET B Klasik',
    description: '2X Ayam Goreng Klasik + Nasi Putih + Air',
    price: 11.99,
    image: '/images/menu2.jpg',
    categoryId: '2',
    isAvailable: true,
    isPopular: false,
    spiceLevel: 2,
    crop: 'center',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '6',
    name: 'Ayam Goreng Krispy',
    description: 'Ayam Goreng Krispy rangup dan sedap',
    price: 4.70,
    image: '/images/menu1.jpg',
    categoryId: '3',
    isAvailable: true,
    isPopular: true,
    spiceLevel: 2,
    crop: 'center',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '7',
    name: 'Ayam Goreng Quarter',
    description: 'Separuh ekor ayam goreng rangup',
    price: 7.00,
    image: '/images/menu1.jpg',
    categoryId: '3',
    isAvailable: true,
    isPopular: true,
    spiceLevel: 2,
    crop: 'bottom',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '8',
    name: 'Teh Tarik',
    description: 'Teh tarik tradisional',
    price: 2.00,
    image: '/images/menu1.jpg',
    categoryId: '4',
    isAvailable: true,
    isPopular: false,
    spiceLevel: 0,
    crop: 'bottom',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  }
]

export default function AdminMenuPage() {
  const [menuItems, setMenuItems] = useState(mockMenuItems)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddItem = (itemData: any) => {
    const newItem = {
      ...itemData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setMenuItems(prev => [...prev, newItem])
    setIsFormOpen(false)
  }

  const handleEditItem = (itemData: any) => {
    const updatedItem = {
      ...itemData,
      updatedAt: new Date().toISOString()
    }
    setMenuItems(prev => prev.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ))
    setIsFormOpen(false)
    setSelectedItem(null)
  }

  const handleDeleteItem = (itemId: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== itemId))
  }

  const handleToggleAvailability = (itemId: string, isAvailable: boolean) => {
    setMenuItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, isAvailable, updatedAt: new Date().toISOString() }
        : item
    ))
  }

  const handleTogglePopular = (itemId: string, isPopular: boolean) => {
    setMenuItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, isPopular, updatedAt: new Date().toISOString() }
        : item
    ))
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
              <h1 className="text-3xl font-black text-menu-dark">Menu Management</h1>
              <p className="text-menu-dark/70 font-bold">Manage your restaurant menu items and categories</p>
            </div>
            
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button className="bg-menu-yellow hover:bg-menu-accent text-menu-dark font-black">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Menu Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-black text-menu-dark">
                    {selectedItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                  </DialogTitle>
                </DialogHeader>
                <MenuForm
                  item={selectedItem}
                  categories={mockCategories}
                  onSubmit={selectedItem ? handleEditItem : handleAddItem}
                  onCancel={() => {
                    setIsFormOpen(false)
                    setSelectedItem(null)
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-menu-light p-4 rounded-lg border border-menu-yellow/20">
              <div className="text-2xl font-black text-menu-dark">{menuItems.length}</div>
              <div className="text-sm text-menu-dark/60 font-bold">Total Items</div>
            </div>
            <div className="bg-menu-light p-4 rounded-lg border border-menu-yellow/20">
              <div className="text-2xl font-black text-menu-accent">
                {menuItems.filter(item => item.isAvailable).length}
              </div>
              <div className="text-sm text-menu-dark/60 font-bold">Available</div>
            </div>
            <div className="bg-menu-light p-4 rounded-lg border border-menu-yellow/20">
              <div className="text-2xl font-black text-menu-yellow">
                {menuItems.filter(item => item.isPopular).length}
              </div>
              <div className="text-sm text-menu-dark/60 font-bold">Popular</div>
            </div>
            <div className="bg-menu-light p-4 rounded-lg border border-menu-yellow/20">
              <div className="text-2xl font-black text-menu-red">
                {menuItems.filter(item => !item.isAvailable).length}
              </div>
              <div className="text-sm text-menu-dark/60 font-bold">Unavailable</div>
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
                    placeholder="Search menu items..."
                    className="w-full pl-10 pr-4 py-2 border border-menu-yellow/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-menu-yellow bg-menu-light text-menu-dark placeholder:text-menu-dark/40"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <select
                className="px-4 py-2 border border-menu-yellow/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-menu-yellow bg-menu-light text-menu-dark"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {mockCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Menu Items List */}
          <MenuList
            items={filteredItems}
            categories={mockCategories}
            onEdit={(item) => {
              setSelectedItem(item)
              setIsFormOpen(true)
            }}
            onDelete={handleDeleteItem}
            onToggleAvailability={handleToggleAvailability}
            onTogglePopular={handleTogglePopular}
          />
        </main>
      </div>
    </div>
  )
}