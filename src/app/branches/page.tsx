'use client'

import { useState } from 'react'
import { Navigation } from "@/components/layout/Navigation"
import { Footer } from "@/components/layout/Footer"
import { BranchMap } from "@/components/branches/BranchMap"
import { BranchList } from "@/components/branches/BranchList"
import { BranchCard } from "@/components/branches/BranchCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, Phone, Clock, Star, Filter } from "lucide-react"

// Mock branches data
const mockBranches = [
  {
    id: '1',
    name: 'Ayam Gepuk Artisan - Taman Melawati',
    address: 'Jalan Bandar 11, Taman Melawati, 53100 Kuala Lumpur',
    city: 'Kuala Lumpur',
    postalCode: '53100',
    phone: '03-4107 1234',
    email: 'melawati@ayamgepukartisan.com',
    latitude: 3.2088,
    longitude: 101.7551,
    openingHours: '11:00 AM - 10:00 PM',
    isActive: true,
    rating: 4.8,
    totalReviews: 342,
    distance: 2.5,
    features: ['Delivery', 'Dine-in', 'Takeaway', 'Parking'],
    description: 'Our flagship branch located in the heart of Taman Melawati, offering the authentic Ayam Gepuk experience with comfortable seating and quick service.'
  },
  {
    id: '2',
    name: 'Ayam Gepuk Artisan - Wangsa Maju',
    address: 'Jalan 1/27A, Wangsa Maju, 53300 Kuala Lumpur',
    city: 'Kuala Lumpur',
    postalCode: '53300',
    phone: '03-4142 5678',
    email: 'wangsamaju@ayamgepukartisan.com',
    latitude: 3.2075,
    longitude: 101.7380,
    openingHours: '11:00 AM - 10:00 PM',
    isActive: true,
    rating: 4.7,
    totalReviews: 256,
    distance: 5.8,
    features: ['Delivery', 'Dine-in', 'Takeaway'],
    description: 'Conveniently located near Wangsa Maju LRT station, perfect for students and residents in the area.'
  },
  {
    id: '3',
    name: 'Ayam Gepuk Artisan - Setapak',
    address: 'Jalan Genting Klang, Setapak, 53300 Kuala Lumpur',
    city: 'Kuala Lumpur',
    postalCode: '53300',
    phone: '03-4148 9012',
    email: 'setapak@ayamgepukartisan.com',
    latitude: 3.3333,
    longitude: 101.7188,
    openingHours: '11:00 AM - 10:30 PM',
    isActive: true,
    rating: 4.9,
    totalReviews: 445,
    distance: 8.2,
    features: ['Delivery', 'Dine-in', 'Takeaway', 'Parking', 'Wifi'],
    description: 'Our largest branch with extended hours, featuring a spacious dining area and ample parking space.'
  },
  {
    id: '4',
    name: 'Ayam Gepuk Artisan - Ampang',
    address: 'Jalan Ampang, Ampang, 68000 Selangor',
    city: 'Ampang',
    postalCode: '68000',
    phone: '03-4289 3456',
    email: 'ampang@ayamgepukartisan.com',
    latitude: 3.1496,
    longitude: 101.7629,
    openingHours: '11:00 AM - 10:00 PM',
    isActive: true,
    rating: 4.6,
    totalReviews: 189,
    distance: 12.1,
    features: ['Delivery', 'Dine-in', 'Takeaway'],
    description: 'Serving the Ampang community with the same great taste and quality that Ayam Gepuk Artisan is known for.'
  },
  {
    id: '5',
    name: 'Ayam Gepuk Artisan - Gombak',
    address: 'Jalan Gombak, Gombak, 53100 Selangor',
    city: 'Gombak',
    postalCode: '53100',
    phone: '03-6189 7890',
    email: 'gombak@ayamgepukartisan.com',
    latitude: 3.2029,
    longitude: 101.6891,
    openingHours: '11:00 AM - 9:30 PM',
    isActive: true,
    rating: 4.5,
    totalReviews: 167,
    distance: 15.3,
    features: ['Delivery', 'Dine-in', 'Takeaway', 'Parking'],
    description: 'Located near UIA campus, popular among students and locals for authentic Malaysian fried chicken.'
  }
]

export default function BranchesPage() {
  const [branches] = useState(mockBranches)
  const [selectedBranch, setSelectedBranch] = useState(mockBranches[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('distance')
  const [filterCity, setFilterCity] = useState('all')

  const filteredBranches = branches
    .filter(branch => {
      const matchesSearch = branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           branch.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           branch.city.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCity = filterCity === 'all' || branch.city === filterCity
      return matchesSearch && matchesCity
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance
        case 'rating':
          return b.rating - a.rating
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  const cities = Array.from(new Set(branches.map(branch => branch.city)))

  return (
    <div className="min-h-screen bg-menu-light">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-menu-yellow text-menu-dark font-bold">
            📍 Find Us
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black text-menu-dark mb-4">
            Our Branches
          </h1>
          <p className="text-lg text-menu-dark/70 max-w-2xl mx-auto font-bold">
            Visit us at any of our convenient locations across Klang Valley
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-black text-menu-yellow">{branches.length}</div>
              <div className="text-sm text-menu-dark/60 font-bold">Total Branches</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-black text-menu-accent">{branches.filter(b => b.isActive).length}</div>
              <div className="text-sm text-menu-dark/60 font-bold">Open Now</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-black text-menu-red">{cities.length}</div>
              <div className="text-sm text-menu-dark/60 font-bold">Cities</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-black text-menu-yellow">
                {(branches.reduce((sum, b) => sum + b.rating, 0) / branches.length).toFixed(1)}
              </div>
              <div className="text-sm text-menu-dark/60 font-bold">Avg Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search branches..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={filterCity} onValueChange={setFilterCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <BranchMap
              branches={filteredBranches}
              selectedBranch={selectedBranch}
              onBranchSelect={setSelectedBranch}
            />
          </div>

          {/* Branch List */}
          <div className="lg:col-span-1">
            <BranchList
              branches={filteredBranches}
              selectedBranch={selectedBranch}
              onBranchSelect={setSelectedBranch}
            />
          </div>
        </div>

        {/* Selected Branch Details */}
        {selectedBranch && (
          <div className="mt-8">
            <BranchCard
              branch={selectedBranch}
              isExpanded={true}
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}