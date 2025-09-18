'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  phone: string
  addresses: Address[]
  orderHistory: Order[]
  createdAt: string
  lastLogin?: string
}

interface Address {
  id: string
  label: string
  address: string
  city: string
  postalCode: string
  isDefault: boolean
}

interface Order {
  id: string
  orderNumber: string
  status: string
  orderType: 'delivery' | 'pickup'
  items: OrderItem[]
  total: number
  createdAt: string
  deliveryAddress?: string
  pickupBranch?: string
}

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  spiceLevel: number
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  updateProfile: (userData: Partial<User>) => Promise<boolean>
  addAddress: (address: Omit<Address, 'id'>) => Promise<boolean>
  updateAddress: (addressId: string, addressData: Partial<Address>) => Promise<boolean>
  deleteAddress: (addressId: string) => Promise<boolean>
  isAuthenticated: boolean
}

interface RegisterData {
  name: string
  email: string
  phone: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data on mount
    const savedUser = localStorage.getItem('ayam-gepuk-user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error loading user from localStorage:', error)
        localStorage.removeItem('ayam-gepuk-user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock authentication - in real app, this would be an API call
      if (email === 'demo@example.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          name: 'Ahmad bin Ibrahim',
          email: 'demo@example.com',
          phone: '012-3456789',
          addresses: [
            {
              id: '1',
              label: 'Home',
              address: 'No. 123, Jalan Melawati 1, Taman Melawati',
              city: 'Kuala Lumpur',
              postalCode: '53100',
              isDefault: true
            }
          ],
          orderHistory: [],
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        }
        
        setUser(mockUser)
        localStorage.setItem('ayam-gepuk-user', JSON.stringify(mockUser))
        return true
      }
      
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock registration - in real app, this would be an API call
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        addresses: [],
        orderHistory: [],
        createdAt: new Date().toISOString()
      }
      
      setUser(newUser)
      localStorage.setItem('ayam-gepuk-user', JSON.stringify(newUser))
      return true
    } catch (error) {
      console.error('Registration error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('ayam-gepuk-user')
  }

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!user) return false
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem('ayam-gepuk-user', JSON.stringify(updatedUser))
      return true
    } catch (error) {
      console.error('Profile update error:', error)
      return false
    }
  }

  const addAddress = async (address: Omit<Address, 'id'>): Promise<boolean> => {
    if (!user) return false
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newAddress: Address = {
        ...address,
        id: Date.now().toString()
      }
      
      // If this is set as default, remove default from other addresses
      const updatedAddresses = address.isDefault 
        ? user.addresses.map(addr => ({ ...addr, isDefault: false }))
        : user.addresses
      
      const updatedUser = {
        ...user,
        addresses: [...updatedAddresses, newAddress]
      }
      
      setUser(updatedUser)
      localStorage.setItem('ayam-gepuk-user', JSON.stringify(updatedUser))
      return true
    } catch (error) {
      console.error('Add address error:', error)
      return false
    }
  }

  const updateAddress = async (addressId: string, addressData: Partial<Address>): Promise<boolean> => {
    if (!user) return false
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const updatedAddresses = user.addresses.map(addr => {
        if (addr.id === addressId) {
          // If setting as default, remove default from other addresses
          if (addressData.isDefault) {
            user.addresses.forEach(otherAddr => {
              if (otherAddr.id !== addressId) {
                otherAddr.isDefault = false
              }
            })
          }
          return { ...addr, ...addressData }
        }
        return addr
      })
      
      const updatedUser = {
        ...user,
        addresses: updatedAddresses
      }
      
      setUser(updatedUser)
      localStorage.setItem('ayam-gepuk-user', JSON.stringify(updatedUser))
      return true
    } catch (error) {
      console.error('Update address error:', error)
      return false
    }
  }

  const deleteAddress = async (addressId: string): Promise<boolean> => {
    if (!user) return false
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const updatedAddresses = user.addresses.filter(addr => addr.id !== addressId)
      
      const updatedUser = {
        ...user,
        addresses: updatedAddresses
      }
      
      setUser(updatedUser)
      localStorage.setItem('ayam-gepuk-user', JSON.stringify(updatedUser))
      return true
    } catch (error) {
      console.error('Delete address error:', error)
      return false
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      updateProfile,
      addAddress,
      updateAddress,
      deleteAddress,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}