'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Receipt, 
  Calendar, 
  MapPin, 
  Store,
  Phone,
  Eye,
  Download
} from "lucide-react"

interface OrderItem {
  name: string
  quantity: number
}

interface Order {
  id: string
  orderNumber: string
  status: string
  orderType: string
  totalAmount: number
  createdAt: string
  items: OrderItem[]
}

interface OrderHistoryProps {
  orders: Order[]
}

const statusConfig = {
  PENDING: {
    color: 'bg-orange-100 text-orange-800',
    label: 'Pending'
  },
  CONFIRMED: {
    color: 'bg-blue-100 text-blue-800',
    label: 'Confirmed'
  },
  PREPARING: {
    color: 'bg-purple-100 text-purple-800',
    label: 'Preparing'
  },
  READY_FOR_PICKUP: {
    color: 'bg-green-100 text-green-800',
    label: 'Ready for Pickup'
  },
  OUT_FOR_DELIVERY: {
    color: 'bg-yellow-100 text-yellow-800',
    label: 'Out for Delivery'
  },
  COMPLETED: {
    color: 'bg-green-100 text-green-800',
    label: 'Completed'
  },
  CANCELLED: {
    color: 'bg-red-100 text-red-800',
    label: 'Cancelled'
  }
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Receipt className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-4">You haven't placed any orders with us yet.</p>
          <Button className="bg-orange-500 hover:bg-orange-600">
            Start Ordering
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const statusInfo = statusConfig[order.status as keyof typeof statusConfig]
        
        return (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{order.orderNumber}</h3>
                    <Badge className={statusInfo.color}>
                      {statusInfo.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDateTime(order.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {order.orderType === 'DELIVERY' ? (
                        <MapPin className="h-4 w-4" />
                      ) : (
                        <Store className="h-4 w-4" />
                      )}
                      <span>{order.orderType}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-500 mb-2">
                    RM{order.totalAmount.toFixed(2)}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Receipt
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm text-gray-600">
                          {item.quantity}x {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">
                      {order.items.length} items
                    </div>
                    <div className="text-sm text-gray-500">
                      Total quantity: {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                    </div>
                  </div>
                </div>
              </div>
              
              {order.status === 'DELIVERY' && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 text-blue-800">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm font-medium">Need help with your order?</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    Contact our customer service at 03-4107 1234 for assistance.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}