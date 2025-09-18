'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Camera, Mail, Phone, Calendar, Shield } from "lucide-react"

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

interface ProfileHeaderProps {
  user: User
  onUpdateProfile: (updatedData: any) => void
}

export function ProfileHeader({ user, onUpdateProfile }: ProfileHeaderProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl bg-orange-500 text-white">
                  {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                variant="secondary"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-3 flex items-center gap-2">
              {user.isVerified && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
                <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm text-gray-600">
                  <div className="flex items-center justify-center md:justify-start gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                  <span className="hidden md:inline">•</span>
                  <div className="flex items-center justify-center md:justify-start gap-1">
                    <Phone className="h-4 w-4" />
                    <span>{user.phone}</span>
                  </div>
                </div>
              </div>
              <Button className="mt-4 md:mt-0" onClick={() => onUpdateProfile({})}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>

            {/* Account Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Member Since</span>
                </div>
                <div className="font-medium text-gray-900 mt-1">
                  {formatDate(user.joinDate)}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Last Login</span>
                </div>
                <div className="font-medium text-gray-900 mt-1">
                  {formatDate(user.lastLogin)}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span>Account Status</span>
                </div>
                <div className="font-medium text-green-600 mt-1">
                  Active
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}