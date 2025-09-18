'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Navigation,
  Car,
  Wifi,
  Utensils,
  ShoppingBag,
  Mail,
  ExternalLink
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

interface BranchCardProps {
  branch: Branch
  isExpanded?: boolean
}

const featureIcons = {
  'Delivery': <ShoppingBag className="h-5 w-5" />,
  'Dine-in': <Utensils className="h-5 w-5" />,
  'Takeaway': <ShoppingBag className="h-5 w-5" />,
  'Parking': <Car className="h-5 w-5" />,
  'Wifi': <Wifi className="h-5 w-5" />
}

export function BranchCard({ branch, isExpanded = false }: BranchCardProps) {
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

  const status = getOpenStatus(branch.openingHours)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-2xl mb-2">{branch.name}</CardTitle>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge 
                variant={status.isOpen ? "default" : "secondary"}
                className={status.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
              >
                <Clock className="h-3 w-3 mr-1" />
                {status.isOpen ? 'Open Now' : 'Closed'}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-medium">{branch.rating}</span>
                <span className="text-gray-500">({branch.totalReviews} reviews)</span>
              </div>
              <Badge variant="outline">
                <MapPin className="h-3 w-3 mr-1" />
                {branch.distance}km away
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Description */}
        <div>
          <p className="text-gray-600 leading-relaxed">{branch.description}</p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-gray-600 text-sm">{branch.address}</p>
                <p className="text-gray-500 text-xs">{branch.city}, {branch.postalCode}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-500 flex-shrink-0" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-600 text-sm">{branch.phone}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-500 flex-shrink-0" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-600 text-sm">{branch.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-500 flex-shrink-0" />
              <div>
                <p className="font-medium">Hours</p>
                <p className="text-gray-600 text-sm">{branch.openingHours}</p>
                {!status.isOpen && (
                  <p className="text-xs text-red-600 mt-1">
                    Opens at {branch.openingHours.split(' - ')[0]}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Features */}
        <div>
          <h4 className="font-medium mb-3">Available Features</h4>
          <div className="flex flex-wrap gap-3">
            {branch.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                {featureIcons[feature as keyof typeof featureIcons]}
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            className="flex-1 bg-orange-500 hover:bg-orange-600"
            onClick={() => window.open(`https://maps.google.com/?q=${branch.latitude},${branch.longitude}`, '_blank')}
          >
            <Navigation className="h-4 w-4 mr-2" />
            Get Directions
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => window.open(`tel:${branch.phone}`, '_blank')}
          >
            <Phone className="h-4 w-4 mr-2" />
            Call Now
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.open(`mailto:${branch.email}`, '_blank')}
          >
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
        </div>

        {/* Additional Info */}
        {isExpanded && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Location Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Coordinates:</span>
                <p className="font-mono">{branch.latitude.toFixed(4)}, {branch.longitude.toFixed(4)}</p>
              </div>
              <div>
                <span className="text-gray-500">Status:</span>
                <p className={branch.isActive ? "text-green-600" : "text-red-600"}>
                  {branch.isActive ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}