'use client'

import { useState, useEffect } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  Percent, 
  MapPin, 
  Settings, 
  Bell,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface AdminSidebarProps {
  className?: string
}

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    badge: null
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
    badge: "3" // Number of pending orders
  },
  {
    title: "Menu Management",
    href: "/admin/menu",
    icon: Package,
    badge: null
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
    badge: null
  },
  {
    title: "Promotions",
    href: "/admin/promotions",
    icon: Percent,
    badge: "2" // Active promotions
  },
  {
    title: "Branches",
    href: "/admin/branches",
    icon: MapPin,
    badge: null
  },
  {
    title: "Notifications",
    href: "/admin/notifications",
    icon: Bell,
    badge: "5" // Unread notifications
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    badge: null
  }
]

export function AdminSidebar({ className }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={cn(
      "bg-menu-light border-r border-menu-yellow/20 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-menu-yellow/20">
          {!isCollapsed ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden bg-menu-yellow">
                <img 
                  src="/images/logo.jpg" 
                  alt="Ayam Gepuk Artisan Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-black text-sm text-menu-dark">Admin</span>
                <span className="text-menu-yellow font-black text-sm"> Panel</span>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden mx-auto bg-menu-yellow">
              <img 
                src="/images/logo.jpg" 
                alt="Ayam Gepuk Artisan Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 p-0 text-menu-dark hover:bg-menu-yellow/10"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-menu-yellow/20 text-menu-dark border border-menu-yellow/30"
                    : "text-menu-dark/70 hover:bg-menu-yellow/10 hover:text-menu-dark"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                
                {!isCollapsed && (
                  <>
                    <span className="flex-1 font-bold">{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs bg-menu-red text-menu-light">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-menu-yellow/20">
          {!isCollapsed && (
            <div className="space-y-2">
              <div className="text-xs text-menu-dark/60 font-bold">
                Ayam Gepuk Artisan Admin v1.0
              </div>
              <div className="text-xs text-menu-dark/40 font-bold">
                Last login: Today, 10:30 AM
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}