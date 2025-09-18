'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  spiceLevel: number
  cartId: number
  image?: string
  description?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'cartId'>) => void
  removeItem: (cartId: number) => void
  updateQuantity: (cartId: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getSubtotal: () => number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ayam-gepuk-cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('ayam-gepuk-cart', JSON.stringify(items))
  }, [items])

  const addItem = (item: Omit<CartItem, 'cartId'>) => {
    setItems(prev => {
      const existingItem = prev.find(i => i.id === item.id && i.spiceLevel === item.spiceLevel)
      if (existingItem) {
        return prev.map(i =>
          i.id === item.id && i.spiceLevel === item.spiceLevel
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      } else {
        return [...prev, { ...item, cartId: Date.now() }]
      }
    })
    
    // Show cart notification
    setIsOpen(true)
  }

  const removeItem = (cartId: number) => {
    setItems(prev => prev.filter(item => item.cartId !== cartId))
  }

  const updateQuantity = (cartId: number, quantity: number) => {
    if (quantity < 1) {
      removeItem(cartId)
      return
    }
    setItems(prev => prev.map(item => 
      item.cartId === cartId ? { ...item, quantity } : item
    ))
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }

  const getSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getTotalItems,
      getSubtotal,
      isOpen,
      setIsOpen
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}