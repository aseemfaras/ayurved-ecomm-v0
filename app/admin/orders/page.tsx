'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Search, Eye } from 'lucide-react'

// Mock orders for testing
const mockOrders = [
  { 
    id: 'order-1',
    orderNumber: 'ORD-2023-001',
    customer: 'Rahul Sharma',
    date: '2023-11-10',
    total: 2499.00,
    status: 'completed',
    items: 3
  },
  { 
    id: 'order-2',
    orderNumber: 'ORD-2023-002',
    customer: 'Priya Patel',
    date: '2023-11-12',
    total: 1299.50,
    status: 'processing',
    items: 2
  },
  { 
    id: 'order-3',
    orderNumber: 'ORD-2023-003',
    customer: 'Amit Singh',
    date: '2023-11-15',
    total: 3599.00,
    status: 'completed',
    items: 4
  },
  { 
    id: 'order-4',
    orderNumber: 'ORD-2023-004',
    customer: 'Deepa Gupta',
    date: '2023-11-18',
    total: 899.00,
    status: 'pending',
    items: 1
  },
  { 
    id: 'order-5',
    orderNumber: 'ORD-2023-005',
    customer: 'Vijay Kumar',
    date: '2023-11-20',
    total: 4299.00,
    status: 'shipped',
    items: 5
  }
];

export default function OrdersAdmin() {
  const { toast } = useToast()
  const [orders, setOrders] = useState(mockOrders)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'processing': 'bg-blue-100 text-blue-800',
      'shipped': 'bg-purple-100 text-purple-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    }
    
    return (
      <Badge className={`${variants[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const filteredOrders = orders.filter((order) => 
    order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          Manage customer orders
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Order Management</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">Order Number</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Customer</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Items</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Total</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="p-4 text-center">Loading orders...</td>
                    </tr>
                  ) : filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-4 text-center">No orders found</td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr 
                        key={order.id} 
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle font-medium">{order.orderNumber}</td>
                        <td className="p-4 align-middle">{order.customer}</td>
                        <td className="p-4 align-middle">{order.date}</td>
                        <td className="p-4 align-middle text-center">{order.items}</td>
                        <td className="p-4 align-middle">₹{order.total.toFixed(2)}</td>
                        <td className="p-4 align-middle">{getStatusBadge(order.status)}</td>
                        <td className="p-4 align-middle">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => {
                              toast({
                                title: 'View Order',
                                description: `Viewing details for order ${order.orderNumber}`,
                              })
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 