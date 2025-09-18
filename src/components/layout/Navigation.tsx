'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { 
  Menu, 
  ShoppingCart, 
  Phone, 
  MapPin, 
  User,
  Home,
  Utensils,
  Store,
  Percent
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { CartSidebar } from "@/components/menu/CartSidebar"
import { AuthModal } from "@/components/auth/AuthModal"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"

export function Navigation() {
  const { items, isOpen, setIsOpen, getTotalItems } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const { toast } = useToast()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const navigationItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Menu', href: '/menu', icon: Utensils },
    { name: 'Branches', href: '/branches', icon: Store },
    { name: 'Promotions', href: '/promotions', icon: Percent },
  ]

  const handleSignIn = () => {
    setIsAuthModalOpen(true)
  }

  const handleSignOut = () => {
    logout()
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
      duration: 3000,
    })
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-menu-dark border-b border-menu-yellow/20 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden bg-menu-yellow">
                <img 
                  src="/images/logo.jpg" 
                  alt="Ayam Gepuk Artisan Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-bold text-lg text-menu-light">Ayam Gepuk</span>
                <span className="text-menu-yellow font-bold text-lg"> Artisan</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-menu-light/90 hover:text-menu-yellow font-bold transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Phone number */}
              <div className="hidden md:flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-menu-yellow" />
                <a 
                  href="tel:03-41071234" 
                  className="text-menu-light/80 hover:text-menu-yellow transition-colors"
                >
                  03-4107 1234
                </a>
              </div>

              {/* User Account */}
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <div className="hidden md:flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-menu-yellow" />
                    <span className="text-menu-light/80 font-bold">{user?.name}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-menu-yellow/20 text-menu-yellow hover:bg-menu-yellow/10"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-menu-yellow/20 text-menu-yellow hover:bg-menu-yellow/10"
                  onClick={handleSignIn}
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}

              {/* Cart */}
              <Button 
                variant="outline" 
                size="sm" 
                className="relative bg-menu-yellow text-menu-dark border-menu-yellow hover:bg-menu-accent hover:text-menu-light"
                onClick={() => setIsOpen(true)}
              >
                <ShoppingCart className="h-4 w-4" />
                {getTotalItems() > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-menu-red text-menu-light"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>

              {/* Mobile menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden bg-menu-yellow text-menu-dark border-menu-yellow hover:bg-menu-accent">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-menu-dark text-menu-light border-menu-yellow/20">
                  <div className="flex flex-col space-y-4 mt-8">
                    <div className="flex items-center gap-2 pb-4 border-b border-menu-yellow/20">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden bg-menu-yellow">
                        <img 
                          src="/images/logo.jpg" 
                          alt="Ayam Gepuk Artisan Logo" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-bold text-lg text-menu-light">Ayam Gepuk Artisan</span>
                    </div>

                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 text-menu-light/90 hover:text-menu-yellow font-bold p-2 rounded-lg hover:bg-menu-red/10 transition-colors"
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    ))}

                    {isAuthenticated && (
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 text-menu-light/90 hover:text-menu-yellow font-bold p-2 rounded-lg hover:bg-menu-red/10 transition-colors"
                      >
                        <User className="h-5 w-5" />
                        My Profile
                      </Link>
                    )}

                    <div className="border-t border-menu-yellow/20 pt-4 mt-4">
                      <div className="flex items-center gap-3 text-menu-light/90 p-2">
                        <Phone className="h-5 w-5 text-menu-yellow" />
                        <div>
                          <p className="font-medium">Call Us</p>
                          <a 
                            href="tel:03-41071234" 
                            className="text-sm text-menu-light/70 hover:text-menu-yellow transition-colors"
                          >
                            03-4107 1234
                          </a>
                        </div>
                      </div>

                      <Link 
                        href="/branches"
                        className="flex items-center gap-3 text-menu-light/90 hover:text-menu-yellow font-bold p-2 rounded-lg hover:bg-menu-red/10 transition-colors"
                      >
                        <MapPin className="h-5 w-5 text-menu-yellow" />
                        <div>
                          <p className="font-medium">Find Branch</p>
                          <p className="text-sm text-menu-light/70">5 locations</p>
                        </div>
                      </Link>
                    </div>

                    {isAuthenticated ? (
                      <Button 
                        className="w-full mt-4 border-menu-yellow/20 text-menu-yellow hover:bg-menu-yellow/10"
                        variant="outline"
                        onClick={handleSignOut}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    ) : (
                      <Button 
                        className="w-full mt-4 bg-menu-yellow text-menu-dark hover:bg-menu-accent"
                        onClick={handleSignIn}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-96 sm:max-w-md">
          <CartSidebar />
        </SheetContent>
      </Sheet>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  )
}