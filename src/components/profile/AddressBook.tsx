'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  MapPin, 
  Plus, 
  Edit, 
  Trash2, 
  Phone,
  Home,
  Building,
  Star,
  Navigation
} from "lucide-react"

interface Address {
  id: string
  label: string
  name: string
  phone: string
  address: string
  isDefault: boolean
  coordinates: { lat: number; lng: number }
}

interface AddressBookProps {
  addresses: Address[]
  onAddAddress: (address: any) => void
  onUpdateAddress: (addressId: string, updatedData: any) => void
  onDeleteAddress: (addressId: string) => void
  onSetDefaultAddress: (addressId: string) => void
}

export function AddressBook({ 
  addresses, 
  onAddAddress, 
  onUpdateAddress, 
  onDeleteAddress, 
  onSetDefaultAddress 
}: AddressBookProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [formData, setFormData] = useState({
    label: '',
    name: '',
    phone: '',
    address: ''
  })

  const handleAddAddress = () => {
    setFormData({
      label: '',
      name: '',
      phone: '',
      address: ''
    })
    setEditingAddress(null)
    setIsFormOpen(true)
  }

  const handleEditAddress = (address: Address) => {
    setFormData({
      label: address.label,
      name: address.name,
      phone: address.phone,
      address: address.address
    })
    setEditingAddress(address)
    setIsFormOpen(true)
  }

  const handleSubmit = () => {
    if (!formData.label || !formData.name || !formData.phone || !formData.address) {
      alert('Please fill in all fields')
      return
    }

    if (editingAddress) {
      onUpdateAddress(editingAddress.id, formData)
    } else {
      onAddAddress(formData)
    }
    
    setIsFormOpen(false)
    setEditingAddress(null)
  }

  const getLabelIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'home':
        return <Home className="h-4 w-4" />
      case 'office':
      case 'work':
        return <Building className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  if (addresses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address Book
            </CardTitle>
            <Button onClick={handleAddAddress} className="bg-orange-500 hover:bg-orange-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Address
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-8 text-center">
          <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
          <p className="text-gray-500 mb-4">Save your addresses for faster checkout.</p>
          <Button onClick={handleAddAddress} className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Address
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address Book
            </CardTitle>
            <Button onClick={handleAddAddress} className="bg-orange-500 hover:bg-orange-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Address
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      {getLabelIcon(address.label)}
                      <span className="font-medium capitalize">{address.label}</span>
                      {address.isDefault && (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                          <Star className="h-3 w-3 mr-1" />
                          Default
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">{address.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{address.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{address.address}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditAddress(address)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteAddress(address.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  {!address.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSetDefaultAddress(address.id)}
                      className="text-orange-500 hover:text-orange-600"
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Address Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="label">Address Label</Label>
              <Select 
                value={formData.label} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, label: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select label" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Recipient Name</Label>
              <Input
                id="name"
                placeholder="Enter recipient name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Complete Address</Label>
              <Textarea
                id="address"
                placeholder="Enter complete address including unit number, street, area, and postal code"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsFormOpen(false)} 
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                {editingAddress ? 'Update Address' : 'Add Address'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}