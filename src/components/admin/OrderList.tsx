'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Truck, 
  Store,
  Phone,
  MapPin,
  User,
  Receipt
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

interface OrderListProps {
  orders: Order[]
  selectedOrder: string | null
  onOrderSelect: (orderId: string) => void
  onStatusUpdate: (orderId: string, newStatus: string) => void
}

const statusConfig = {
  PENDING: {
    color: 'bg-menu-red/10 text-menu-red',
    icon: Clock,
    label: 'Pending'
  },
  CONFIRMED: {
    color: 'bg-menu-accent/10 text-menu-accent',
    icon: CheckCircle,
    label: 'Confirmed'
  },
  PREPARING: {
    color: 'bg-menu-yellow/20 text-menu-dark',
    icon: Receipt,
    label: 'Preparing'
  },
  READY_FOR_PICKUP: {
    color: 'bg-menu-accent/10 text-menu-accent',
    icon: Store,
    label: 'Ready for Pickup'
  },
  OUT_FOR_DELIVERY: {
    color: 'bg-menu-yellow/20 text-menu-dark',
    icon: Truck,
    label: 'Out for Delivery'
  },
  COMPLETED: {
    color: 'bg-menu-accent/10 text-menu-accent',
    icon: CheckCircle,
    label: 'Completed'
  },
  CANCELLED: {
    color: 'bg-menu-red/10 text-menu-red',
    icon: XCircle,
    label: 'Cancelled'
  }
}

export function OrderList({ orders, selectedOrder, onOrderSelect, onStatusUpdate }: OrderListProps) {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusOptions = (currentStatus: string) => {
    const statusFlow = {
      PENDING: ['CONFIRMED', 'CANCELLED'],
      CONFIRMED: ['PREPARING', 'CANCELLED'],
      PREPARING: ['READY_FOR_PICKUP', 'CANCELLED'],
      READY_FOR_PICKUP: ['OUT_FOR_DELIVERY', 'COMPLETED'],
      OUT_FOR_DELIVERY: ['COMPLETED'],
      COMPLETED: [],
      CANCELLED: []
    }
    
    return statusFlow[currentStatus as keyof typeof statusFlow] || []
  }

  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Receipt className="h-16 w-16 text-menu-dark/30 mx-auto mb-4" />
            <h3 className="text-lg font-black text-menu-dark mb-2">No orders found</h3>
            <p className="text-menu-dark/60 font-bold">There are no orders in this category.</p>
          </CardContent>
        </Card>
      ) : (
        orders.map((order) => {
          const statusInfo = statusConfig[order.status as keyof typeof statusConfig]
          const StatusIcon = statusInfo.icon

          return (
            <Card 
              key={order.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedOrder === order.id ? 'ring-2 ring-menu-yellow' : ''
              }`}
              onClick={() => onOrderSelect(order.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <CardTitle className="text-lg font-black text-menu-dark">{order.orderNumber}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-menu-dark/60 font-bold">
                          {formatDate(order.createdAt)} at {formatTime(order.createdAt)}
                        </span>
                        <Badge 
                          variant="secondary" 
                          className={statusInfo.color}
                        >
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusInfo.label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-black text-menu-yellow">
                      RM{order.totalAmount.toFixed(2)}
                    </div>
                    <Badge 
                      variant={order.paymentStatus === 'PAID' ? 'default' : 'secondary'}
                      className="text-xs bg-menu-accent text-menu-light"
                    >
                      {order.paymentStatus}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Customer Info */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-menu-dark/60" />
                      <span className="font-bold text-menu-dark">{order.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-menu-dark/60" />
                      <span className="font-bold text-menu-dark">{order.customerPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {order.orderType === 'DELIVERY' ? (
                        <Truck className="h-4 w-4 text-menu-accent" />
                      ) : (
                        <Store className="h-4 w-4 text-menu-yellow" />
                      )}
                      <span className="font-bold text-menu-dark">{order.orderType}</span>
                    </div>
                  </div>

                  {/* Delivery Address (if applicable) */}
                  {order.deliveryAddress && (
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-menu-dark/60 mt-0.5 flex-shrink-0" />
                      <span className="text-menu-dark/70 font-bold">{order.deliveryAddress}</span>
                    </div>
                  )}

                  {/* Order Items Preview */}
                  <div className="flex items-center gap-2 text-sm text-menu-dark/60 font-bold">
                    <span>{order.items.length} items</span>
                    <span>•</span>
                    <span>{order.items.reduce((sum, item) => sum + item.quantity, 0)} total quantity</span>
                  </div>

                  {/* Status Update */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-menu-dark/60 font-bold">Update Status:</span>
                      <Select
                        value={order.status}
                        onValueChange={(value) => onStatusUpdate(order.id, value)}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <SelectTrigger className="w-40 h-8 border-menu-yellow/20 text-menu-dark">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {getStatusOptions(order.status).map((status) => {
                            const optionStatus = statusConfig[status as keyof typeof statusConfig]
                            const OptionIcon = optionStatus.icon
                            return (
                              <SelectItem key={status} value={status}>
                                <div className="flex items-center gap-2">
                                  <OptionIcon className="h-4 w-4" />
                                  {optionStatus.label}
                                </div>
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-menu-yellow/20 text-menu-dark hover:bg-menu-yellow/10"
                      onClick={(e) => {
                        e.stopPropagation()
                        onOrderSelect(order.id)
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })
      )}
    </div>
  )
}