'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Upload, X } from "lucide-react"

interface MenuItem {
  id?: string
  name: string
  description: string
  price: number
  image: string
  categoryId: string
  isAvailable: boolean
  isPopular: boolean
  spiceLevel: number
  crop?: string
}

interface Category {
  id: string
  name: string
  description: string
}

interface MenuFormProps {
  item?: MenuItem | null
  categories: Category[]
  onSubmit: (itemData: MenuItem) => void
  onCancel: () => void
}

export function MenuForm({ item, categories, onSubmit, onCancel }: MenuFormProps) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    description: item?.description || '',
    price: item?.price || 0,
    image: item?.image || '',
    categoryId: item?.categoryId || '',
    isAvailable: item?.isAvailable ?? true,
    isPopular: item?.isPopular ?? false,
    spiceLevel: item?.spiceLevel || 0,
    crop: item?.crop || 'center'
  })

  const [imagePreview, setImagePreview] = useState<string | null>(item?.image || null)

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, you would upload to a server and get a URL back
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        handleInputChange('image', result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    handleInputChange('image', '')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.name || !formData.description || !formData.categoryId || formData.price <= 0) {
      alert('Please fill in all required fields')
      return
    }

    onSubmit({
      ...formData,
      price: Number(formData.price)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>
        
        <div className="space-y-2">
          <Label htmlFor="name">Item Name *</Label>
          <Input
            id="name"
            placeholder="Enter item name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Enter item description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price (RM) *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={formData.categoryId} 
              onValueChange={(value) => handleInputChange('categoryId', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* Image Upload */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Item Image</h3>
        
        <div className="space-y-2">
          <Label htmlFor="image">Upload Image</Label>
          
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Click to upload or drag and drop</p>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('image')?.click()}
              >
                Choose File
              </Button>
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Item Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Item Settings</h3>
        
        <div className="space-y-2">
          <Label htmlFor="spiceLevel">Spice Level</Label>
          <Select 
            value={formData.spiceLevel.toString()} 
            onValueChange={(value) => handleInputChange('spiceLevel', parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select spice level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">No Spice</SelectItem>
              <SelectItem value="1">Mild</SelectItem>
              <SelectItem value="2">Medium</SelectItem>
              <SelectItem value="3">Spicy</SelectItem>
              <SelectItem value="4">Very Spicy</SelectItem>
              <SelectItem value="5">Extra Spicy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="crop">Image Crop Position</Label>
          <Select 
            value={formData.crop} 
            onValueChange={(value) => handleInputChange('crop', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select crop position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top">Top</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="bottom">Bottom</SelectItem>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Available</Label>
            <p className="text-sm text-gray-500">Show this item in the menu</p>
          </div>
          <Switch
            checked={formData.isAvailable}
            onCheckedChange={(checked) => handleInputChange('isAvailable', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Popular Item</Label>
            <p className="text-sm text-gray-500">Feature this item as popular</p>
          </div>
          <Switch
            checked={formData.isPopular}
            onCheckedChange={(checked) => handleInputChange('isPopular', checked)}
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
          {item ? 'Update Item' : 'Add Item'}
        </Button>
      </div>
    </form>
  )
}