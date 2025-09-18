'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "lucide-react"

interface Promotion {
  id?: string
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
  createdAt?: string
  updatedAt?: string
}

interface PromotionFormProps {
  promotion?: Promotion | null
  onSubmit: (promotionData: Promotion) => void
  onCancel: () => void
}

export function PromotionForm({ promotion, onSubmit, onCancel }: PromotionFormProps) {
  const [formData, setFormData] = useState({
    code: promotion?.code || '',
    name: promotion?.name || '',
    description: promotion?.description || '',
    type: promotion?.type || 'PERCENTAGE',
    value: promotion?.value || 0,
    minOrderAmount: promotion?.minOrderAmount || 0,
    maxUsage: promotion?.maxUsage || null,
    startDate: promotion?.startDate ? promotion.startDate.split('T')[0] : '',
    endDate: promotion?.endDate ? promotion.endDate.split('T')[0] : '',
    isActive: promotion?.isActive ?? true
  })

  const handleInputChange = (field: string, value: string | number | boolean | null) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.code || !formData.name || !formData.description || 
        !formData.startDate || !formData.endDate) {
      alert('Please fill in all required fields')
      return
    }

    // Validate dates
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      alert('End date must be after start date')
      return
    }

    // Validate value based on type
    if (formData.type === 'PERCENTAGE' && (formData.value < 0 || formData.value > 100)) {
      alert('Percentage value must be between 0 and 100')
      return
    }

    if (formData.type === 'FIXED_AMOUNT' && formData.value <= 0) {
      alert('Fixed amount must be greater than 0')
      return
    }

    onSubmit({
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      usageCount: promotion?.usageCount || 0
    })
  }

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    handleInputChange('code', result)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Promotion Name *</Label>
            <Input
              id="name"
              placeholder="Enter promotion name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Promo Code *</Label>
            <div className="flex gap-2">
              <Input
                id="code"
                placeholder="Enter promo code"
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value.toUpperCase())}
                required
              />
              <Button
                type="button"
                variant="outline"
                onClick={generateRandomCode}
                className="whitespace-nowrap"
              >
                Generate
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Enter promotion description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            required
          />
        </div>
      </div>

      <Separator />

      {/* Promotion Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Promotion Settings</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Promotion Type *</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value) => handleInputChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select promotion type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PERCENTAGE">Percentage Discount</SelectItem>
                <SelectItem value="FIXED_AMOUNT">Fixed Amount Discount</SelectItem>
                <SelectItem value="FREE_DELIVERY">Free Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">
              {formData.type === 'PERCENTAGE' ? 'Discount Percentage *' : 
               formData.type === 'FIXED_AMOUNT' ? 'Discount Amount (RM) *' : 
               'Value'}
            </Label>
            <Input
              id="value"
              type="number"
              min="0"
              step={formData.type === 'PERCENTAGE' ? '1' : '0.01'}
              placeholder={formData.type === 'PERCENTAGE' ? '0-100' : '0.00'}
              value={formData.value}
              onChange={(e) => handleInputChange('value', parseFloat(e.target.value) || 0)}
              required={formData.type !== 'FREE_DELIVERY'}
              disabled={formData.type === 'FREE_DELIVERY'}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="minOrderAmount">Minimum Order Amount (RM)</Label>
          <Input
            id="minOrderAmount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={formData.minOrderAmount}
            onChange={(e) => handleInputChange('minOrderAmount', parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxUsage">Maximum Usage (Leave empty for unlimited)</Label>
          <Input
            id="maxUsage"
            type="number"
            min="1"
            placeholder="Unlimited"
            value={formData.maxUsage || ''}
            onChange={(e) => handleInputChange('maxUsage', e.target.value ? parseInt(e.target.value) : null)}
          />
        </div>
      </div>

      <Separator />

      {/* Date Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Date Settings
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date *</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">End Date *</Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Status */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Status</h3>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Active</Label>
            <p className="text-sm text-gray-500">Make this promotion available for use</p>
          </div>
          <Switch
            checked={formData.isActive}
            onCheckedChange={(checked) => handleInputChange('isActive', checked)}
          />
        </div>
      </div>

      <Separator />

      {/* Form Actions */}
      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
          {promotion ? 'Update Promotion' : 'Create Promotion'}
        </Button>
      </div>
    </form>
  )
}