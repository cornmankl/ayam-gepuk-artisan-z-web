'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { 
  Edit, 
  Trash2, 
  Gift, 
  Percent, 
  Truck,
  Calculator,
  Calendar,
  Users,
  Copy
} from "lucide-react"

interface Promotion {
  id: string
  code: string
  name: string
  description: string
  type: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_DELIVERY'
  value: number
  minOrderAmount: number
  maxUsage: number | null
  usageCount: number
  startDate: string
  endDate: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface PromotionListProps {
  promotions: Promotion[]
  onEdit: (promotion: Promotion) => void
  onDelete: (promoId: string) => void
  onToggleStatus: (promoId: string, isActive: boolean) => void
}

export function PromotionList({ 
  promotions, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}: PromotionListProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PERCENTAGE':
        return <Percent className="h-4 w-4" />
      case 'FIXED_AMOUNT':
        return <Calculator className="h-4 w-4" />
      case 'FREE_DELIVERY':
        return <Truck className="h-4 w-4" />
      default:
        return <Gift className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'PERCENTAGE':
        return 'Percentage'
      case 'FIXED_AMOUNT':
        return 'Fixed Amount'
      case 'FREE_DELIVERY':
        return 'Free Delivery'
      default:
        return 'Unknown'
    }
  }

  const getValueDisplay = (type: string, value: number) => {
    switch (type) {
      case 'PERCENTAGE':
        return `${value}% OFF`
      case 'FIXED_AMOUNT':
        return `RM${value} OFF`
      case 'FREE_DELIVERY':
        return 'FREE Delivery'
      default:
        return 'Discount'
    }
  }

  const getUsagePercentage = (usageCount: number, maxUsage: number | null) => {
    if (!maxUsage) return 0
    return Math.min((usageCount / maxUsage) * 100, 100)
  }

  const isExpired = (endDate: string) => {
    return new Date(endDate) < new Date()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    alert('Code copied to clipboard!')
  }

  if (promotions.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Gift className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No promotions found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {promotions.map((promo) => {
        const usagePercentage = getUsagePercentage(promo.usageCount, promo.maxUsage)
        const expired = isExpired(promo.endDate)
        
        return (
          <Card key={promo.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Promotion Info */}
                <div className="md:col-span-8 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{promo.name}</h3>
                        <Badge 
                          variant={promo.isActive && !expired ? "default" : "secondary"}
                          className={promo.isActive && !expired ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                          {promo.isActive && !expired ? 'Active' : 'Inactive'}
                        </Badge>
                        {expired && (
                          <Badge variant="destructive" className="bg-red-100 text-red-800">
                            Expired
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{promo.description}</p>
                      
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            {getTypeIcon(promo.type)}
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Type</p>
                            <p className="font-medium">{getTypeLabel(promo.type)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Gift className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Discount</p>
                            <p className="font-medium text-green-600">
                              {getValueDisplay(promo.type, promo.value)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Calculator className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Min Order</p>
                            <p className="font-medium">
                              {promo.minOrderAmount > 0 ? `RM${promo.minOrderAmount}` : 'No minimum'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Code and Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Promo Code</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(promo.code)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="font-mono text-lg font-bold text-orange-600 bg-white px-3 py-2 rounded border">
                        {promo.code}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {formatDate(promo.startDate)} - {formatDate(promo.endDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Usage Statistics */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>Usage: {promo.usageCount}{promo.maxUsage ? ` / ${promo.maxUsage}` : ''}</span>
                      </div>
                      <span className="text-gray-500">
                        {promo.maxUsage ? `${usagePercentage.toFixed(0)}% used` : 'Unlimited'}
                      </span>
                    </div>
                    {promo.maxUsage && (
                      <Progress value={usagePercentage} className="h-2" />
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="md:col-span-4 space-y-4">
                  {/* Toggle Switch */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Active</span>
                    </div>
                    <Switch
                      checked={promo.isActive && !expired}
                      onCheckedChange={(checked) => onToggleStatus(promo.id, checked)}
                      disabled={expired}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(promo)}
                      className="w-full"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(promo.id)}
                      className="w-full text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>

                  {/* Status Info */}
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>Created: {formatDate(promo.createdAt)}</div>
                    <div>Updated: {formatDate(promo.updatedAt)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}