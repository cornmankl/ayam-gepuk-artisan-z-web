'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Navigation,
  Car,
  Wifi,
  Utensils,
  ShoppingBag
} from "lucide-react"

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

interface BranchListProps {
  branches: Branch[]
  selectedBranch: Branch
  onBranchSelect: (branch: Branch) => void
}

const featureIcons = {
  'Delivery': <ShoppingBag className="h-4 w-4" />,
  'Dine-in': <Utensils className="h-4 w-4" />,
  'Takeaway': <ShoppingBag className="h-4 w-4" />,
  'Parking': <Car className="h-4 w-4" />,
  'Wifi': <Wifi className="h-4 w-4" />
}

export function BranchList({ branches, selectedBranch, onBranchSelect }: BranchListProps) {
  const getOpenStatus = (openingHours: string) => {
    const [openTime, closeTime] = openingHours.split(' - ')
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentTime = currentHour + currentMinute / 60

    const parseTime = (time: string) => {
      const [timeStr, period] = time.split(' ')
      let [hours, minutes] = timeStr.split(':').map(Number)
      
      if (period === 'PM' && hours !== 12) {
        hours += 12
      } else if (period === 'AM' && hours === 12) {
        hours = 0
      }
      
      return hours + minutes / 60
    }

    const open = parseTime(openTime)
    const close = parseTime(closeTime)

    return {
      isOpen: currentTime >= open && currentTime <= close,
      nextChange: currentTime < open ? open : close
    }
  }

  if (branches.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No branches found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {branches.map((branch) => {
        const isSelected = branch.id === selectedBranch.id
        const status = getOpenStatus(branch.openingHours)
        
        return (
          <Card 
            key={branch.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              isSelected ? 'ring-2 ring-orange-500' : ''
            }`}
            onClick={() => onBranchSelect(branch)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight">{branch.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      variant={status.isOpen ? "default" : "secondary"}
                      className={status.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                    >
                      {status.isOpen ? 'Open Now' : 'Closed'}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{branch.rating}</span>
                      <span className="text-sm text-gray-500">({branch.totalReviews})</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-orange-500">
                    {branch.distance}km
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Address */}
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">{branch.address}</p>
                    <p className="text-xs text-gray-500">{branch.city}, {branch.postalCode}</p>
                  </div>
                </div>
                
                {/* Contact & Hours */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{branch.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{branch.openingHours}</span>
                  </div>
                </div>
                
                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {branch.features.slice(0, 3).map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {featureIcons[feature as keyof typeof featureIcons]}
                      <span className="ml-1">{feature}</span>
                    </Badge>
                  ))}
                  {branch.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{branch.features.length - 3} more
                    </Badge>
                  )}
                </div>
                
                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(`https://maps.google.com/?q=${branch.latitude},${branch.longitude}`, '_blank')
                    }}
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    Directions
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(`tel:${branch.phone}`, '_blank')
                    }}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}