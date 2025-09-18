'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { 
  Edit, 
  Trash2, 
  Star, 
  Eye, 
  EyeOff,
  Clock,
  DollarSign
} from "lucide-react"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  categoryId: string
  isAvailable: boolean
  isPopular: boolean
  spiceLevel: number
  crop?: string
  createdAt: string
  updatedAt: string
}

interface Category {
  id: string
  name: string
  description: string
}

interface MenuListProps {
  items: MenuItem[]
  categories: Category[]
  onEdit: (item: MenuItem) => void
  onDelete: (itemId: string) => void
  onToggleAvailability: (itemId: string, isAvailable: boolean) => void
  onTogglePopular: (itemId: string, isPopular: boolean) => void
}

export function MenuList({ 
  items, 
  categories, 
  onEdit, 
  onDelete, 
  onToggleAvailability, 
  onTogglePopular 
}: MenuListProps) {
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category?.name || 'Unknown'
  }

  const renderSpiceLevel = (level: number) => {
    if (level === 0) return null
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-3 rounded-sm ${
              i < level ? 'bg-red-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No menu items found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Item Image */}
              <div className="md:col-span-2">
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className={`w-full h-full object-cover object-${item.crop || 'center'}`}
                  />
                </div>
              </div>

              {/* Item Details */}
              <div className="md:col-span-6 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.isPopular && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        <Star className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    <Badge variant={item.isAvailable ? "default" : "secondary"}>
                      {item.isAvailable ? 'Available' : 'Unavailable'}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="font-semibold text-green-600">RM{item.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Category:</span>
                    <span className="font-medium">{getCategoryName(item.categoryId)}</span>
                  </div>
                  {renderSpiceLevel(item.spiceLevel)}
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Created: {formatDate(item.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Updated: {formatDate(item.updatedAt)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="md:col-span-4 space-y-4">
                {/* Toggle Switches */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Available</span>
                    </div>
                    <Switch
                      checked={item.isAvailable}
                      onCheckedChange={(checked) => onToggleAvailability(item.id, checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Popular</span>
                    </div>
                    <Switch
                      checked={item.isPopular}
                      onCheckedChange={(checked) => onTogglePopular(item.id, checked)}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(item)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}