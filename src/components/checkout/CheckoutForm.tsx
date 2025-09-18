'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MapPin, Phone, Mail, User, CreditCard, Wallet, Store } from "lucide-react"

interface CheckoutFormProps {
  orderType: 'delivery' | 'pickup'
  formData: {
    customerName: string
    customerPhone: string
    customerEmail: string
    deliveryAddress: string
    deliveryNotes: string
    paymentMethod: string
  }
  branches: { id: string; name: string; address: string }[]
  selectedBranch: string
  onFormChange: (field: string, value: string) => void
  onBranchChange: (branchId: string) => void
}

export function CheckoutForm({
  orderType,
  formData,
  branches,
  selectedBranch,
  onFormChange,
  onBranchChange
}: CheckoutFormProps) {
  return (
    <div className="space-y-6">
      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.customerName}
                onChange={(e) => onFormChange('customerName', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="01x-xxxx xxxx"
                value={formData.customerPhone}
                onChange={(e) => onFormChange('customerPhone', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.customerEmail}
              onChange={(e) => onFormChange('customerEmail', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Delivery/Pickup Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {orderType === 'delivery' ? (
              <>
                <MapPin className="h-5 w-5" />
                Delivery Information
              </>
            ) : (
              <>
                <Store className="h-5 w-5" />
                Pickup Information
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {orderType === 'delivery' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address *</Label>
                <Textarea
                  id="address"
                  placeholder="Enter your complete delivery address including unit number, street, area, and postal code"
                  value={formData.deliveryAddress}
                  onChange={(e) => onFormChange('deliveryAddress', e.target.value)}
                  rows={3}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special instructions for delivery?"
                  value={formData.deliveryNotes}
                  onChange={(e) => onFormChange('deliveryNotes', e.target.value)}
                  rows={2}
                />
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label>Select Pickup Branch *</Label>
              <Select value={selectedBranch} onValueChange={onBranchChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      <div>
                        <div className="font-medium">{branch.name}</div>
                        <div className="text-sm text-gray-500">{branch.address}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="mt-4 p-4 bg-menu-yellow/10 rounded-lg border border-menu-yellow/20">
                <p className="text-sm text-menu-dark/80 font-bold">
                  <strong className="font-black text-menu-dark">Pickup Instructions:</strong> Orders are typically ready within 15-30 minutes. 
                  You'll receive a notification when your order is ready for pickup.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={formData.paymentMethod}
            onValueChange={(value) => onFormChange('paymentMethod', value)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="online_banking" id="online_banking" />
              <Label htmlFor="online_banking" className="flex items-center gap-3 cursor-pointer flex-1">
                <Wallet className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="font-medium">Online Banking (FPX)</div>
                  <div className="text-sm text-gray-500">Pay using your bank account</div>
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                <CreditCard className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="font-medium">Credit/Debit Card</div>
                  <div className="text-sm text-gray-500">Visa, Mastercard, etc.</div>
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="ewallet" id="ewallet" />
              <Label htmlFor="ewallet" className="flex items-center gap-3 cursor-pointer flex-1">
                <Wallet className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-medium">E-Wallet</div>
                  <div className="text-sm text-gray-500">Touch 'n Go, GrabPay, Boost</div>
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash" className="flex items-center gap-3 cursor-pointer flex-1">
                <Wallet className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-medium">Cash on Delivery/Pickup</div>
                  <div className="text-sm text-gray-500">Pay when you receive your order</div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  )
}