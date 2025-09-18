'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, ZoomIn, ZoomOut, Maximize } from "lucide-react"

interface Branch {
  id: string
  name: string
  address: string
  city: string
  postalCode: string
  phone: string
  email: string
  latitude: number
  longitude: number
  openingHours: string
  isActive: boolean
  rating: number
  totalReviews: number
  distance: number
  features: string[]
  description: string
}

interface BranchMapProps {
  branches: Branch[]
  selectedBranch: Branch
  onBranchSelect: (branch: Branch) => void
}

export function BranchMap({ branches, selectedBranch, onBranchSelect }: BranchMapProps) {
  const [zoom, setZoom] = useState(1)

  // Simple map visualization using relative positioning
  const getMapPosition = (lat: number, lng: number) => {
    // Normalize coordinates to percentage positions
    const minLat = Math.min(...branches.map(b => b.latitude))
    const maxLat = Math.max(...branches.map(b => b.latitude))
    const minLng = Math.min(...branches.map(b => b.longitude))
    const maxLng = Math.max(...branches.map(b => b.longitude))
    
    const x = ((lng - minLng) / (maxLng - minLng)) * 80 + 10 // 10-90% range
    const y = ((maxLat - lat) / (maxLat - minLat)) * 80 + 10 // 10-90% range
    
    return { x, y }
  }

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5))

  return (
    <Card className="h-96">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Branch Locations
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 h-full">
        <div className="relative h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-b-lg overflow-hidden">
          {/* Map Background */}
          <div className="absolute inset-0 opacity-30">
            <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="border border-gray-200" />
              ))}
            </div>
          </div>

          {/* Branch Markers */}
          <div 
            className="relative w-full h-full"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
          >
            {branches.map((branch) => {
              const position = getMapPosition(branch.latitude, branch.longitude)
              const isSelected = branch.id === selectedBranch.id
              
              return (
                <div
                  key={branch.id}
                  className={`absolute cursor-pointer transition-all duration-200 ${
                    isSelected ? 'z-20' : 'z-10'
                  }`}
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    transform: `translate(-50%, -50%) scale(${isSelected ? 1.2 : 1})`
                  }}
                  onClick={() => onBranchSelect(branch)}
                >
                  <div className={`
                    relative flex flex-col items-center
                    ${isSelected ? 'animate-pulse' : ''}
                  `}>
                    {/* Marker */}
                    <div className={`
                      w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center
                      ${isSelected 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                      }
                      transition-colors duration-200
                    `}>
                      <MapPin className="h-4 w-4" />
                    </div>
                    
                    {/* Label */}
                    {isSelected && (
                      <div className="mt-2 bg-white rounded-lg shadow-lg border p-2 min-w-max">
                        <div className="font-semibold text-sm text-gray-900">
                          {branch.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          {branch.distance}km away
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs">⭐</span>
                          <span className="text-xs font-medium">{branch.rating}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Map Controls Overlay */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
            <div className="text-xs text-gray-600 mb-2">Legend</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-xs">Branch</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span className="text-xs">Selected</span>
              </div>
            </div>
          </div>

          {/* Distance Info */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3">
            <div className="text-xs text-gray-600 mb-1">Selected Branch</div>
            <div className="text-sm font-medium">{selectedBranch.name}</div>
            <div className="text-xs text-gray-600">{selectedBranch.distance}km away</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}