'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  User, 
  Phone, 
  MapPin, 
  Store, 
  Truck, 
  Clock,
  CheckCircle,
  Receipt,
  Printer,
  MessageSquare
} from "lucide-react"

interface OrderItem {
  name: string
  quantity: number
  price: number
  spiceLevel: number
}

interface Order {
  id: string
  orderNumber: string
  status: string
  orderType: string
  customerName: string
  customerPhone: string
  deliveryAddress: string
  subtotal: number
  deliveryFee: number
  totalAmount: number
  paymentStatus: string
  createdAt: string
  items: OrderItem[]
}

interface OrderDetailsProps {
  order: Order | null
  onStatusUpdate: (orderId: string, newStatus: string) => void
}

const statusConfig = {
  PENDING: {
    color: 'bg-orange-100 text-orange-800',
    icon: Clock,
    label: 'Pending'
  },
  CONFIRMED: {
    color: 'bg-blue-100 text-blue-800',
    icon: CheckCircle,
    label: 'Confirmed'
  },
  PREPARING: {
    color: 'bg-purple-100 text-purple-800',
    icon: Receipt,
    label: 'Preparing'
  },
  READY_FOR_PICKUP: {
    color: 'bg-green-100 text-green-800',
    icon: Store,
    label: 'Ready for Pickup'
  },
  OUT_FOR_DELIVERY: {
    color: 'bg-yellow-100 text-yellow-800',
    icon: Truck,
    label: 'Out for Delivery'
  },
  COMPLETED: {
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle,
    label: 'Completed'
  },
  CANCELLED: {
    color: 'bg-red-100 text-red-800',
    icon: Clock,
    label: 'Cancelled'
  }
}

export function OrderDetails({ order, onStatusUpdate }: OrderDetailsProps) {
  if (!order) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Receipt className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Order Selected</h3>
          <p className="text-gray-500">Select an order to view details</p>
        </CardContent>
      </Card>
    )
  }

  const statusInfo = statusConfig[order.status as keyof typeof statusConfig]
  const StatusIcon = statusInfo.icon

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const renderSpiceLevel = (level: number) => {
    if (level === 0) return null
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-3 rounded-sm ${
              i < level ? 'bg-red-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{order.orderNumber}</CardTitle>
              <p className="text-sm text-gray-500">{formatDateTime(order.createdAt)}</p>
            </div>
            <Badge className={statusInfo.color}>
              <StatusIcon className="h-4 w-4 mr-1" />
              {statusInfo.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Order Type</p>
              <div className="flex items-center gap-2 font-medium">
                {order.orderType === 'DELIVERY' ? (
                  <Truck className="h-4 w-4 text-blue-500" />
                ) : (
                  <Store className="h-4 w-4 text-green-500" />
                )}
                {order.orderType}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Status</p>
              <Badge 
                variant={order.paymentStatus === 'PAID' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {order.paymentStatus}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-gray-500" />
            <div>
              <p className="font-medium">{order.customerName}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-gray-500" />
            <div>
              <p className="font-medium">{order.customerPhone}</p>
            </div>
          </div>

          {order.deliveryAddress && (
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Delivery Address</p>
                <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Order Items ({order.items.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.name}</span>
                    {renderSpiceLevel(item.spiceLevel)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Quantity: {item.quantity} × RM{item.price.toFixed(2)}
                  </div>
                </div>
                <span className="font-semibold text-orange-500">
                  RM{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>RM{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery Fee</span>
              <span>{order.deliveryFee === 0 ? 'FREE' : `RM${order.deliveryFee.toFixed(2)}`}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-orange-500">RM{order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            className="w-full bg-orange-500 hover:bg-orange-600"
            onClick={() => onStatusUpdate(order.id, 'COMPLETED')}
            disabled={order.status === 'COMPLETED'}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark as Completed
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full">
              <Printer className="h-4 w-4 mr-2" />
              Print Receipt
            </Button>
            <Button variant="outline" className="w-full">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Customer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}