'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Edit, Save, X } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  joinDate: string
  lastLogin: string
  isVerified: boolean
}

interface PersonalInfoProps {
  user: User
  onUpdateProfile: (updatedData: any) => void
}

export function PersonalInfo({ user, onUpdateProfile }: PersonalInfoProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    bio: ''
  })

  const handleEdit = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      bio: ''
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    onUpdateProfile(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Personal Information</CardTitle>
          {!isEditing && (
            <Button variant="outline" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio (Optional)</Label>
              <Textarea
                id="bio"
                placeholder="Tell us a little about yourself..."
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={3}
              />
            </div>

            <Separator />

            <div className="flex gap-3">
              <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium text-gray-500">Full Name</Label>
                <p className="text-lg font-medium text-gray-900">{user.name}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Email Address</Label>
                <p className="text-lg font-medium text-gray-900">{user.email}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Phone Number</Label>
                <p className="text-lg font-medium text-gray-900">{user.phone}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Account Status</Label>
                <p className="text-lg font-medium text-green-600">Active</p>
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-sm font-medium text-gray-500">Account Security</Label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Password</p>
                    <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}