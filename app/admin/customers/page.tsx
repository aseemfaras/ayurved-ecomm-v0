import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { MoreHorizontal, Search, ArrowDown, ArrowUp } from 'lucide-react';

export default function Customers() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <Button>Add Customer</Button>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Customer List</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search customers..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-2 text-left font-medium">Name</th>
                  <th className="py-3 px-2 text-left font-medium">Email</th>
                  <th className="py-3 px-2 text-left font-medium">Orders</th>
                  <th className="py-3 px-2 text-left font-medium">Total Spent</th>
                  <th className="py-3 px-2 text-left font-medium">Last Order</th>
                  <th className="py-3 px-2 text-center font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dummyCustomers.map((customer, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-2">{customer.name}</td>
                    <td className="py-3 px-2">{customer.email}</td>
                    <td className="py-3 px-2">{customer.orders}</td>
                    <td className="py-3 px-2">₹{customer.spent.toLocaleString()}</td>
                    <td className="py-3 px-2">{customer.lastOrder}</td>
                    <td className="py-3 px-2 text-center">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>24</strong> customers
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dummyCustomers.slice(0, 5).map((customer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                      {index + 1}
                    </div>
                    <span>{customer.name}</span>
                  </div>
                  <span className="font-medium">₹{customer.spent.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dummyCustomers.slice(5, 10).map((customer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">{customer.email}</div>
                  </div>
                  <div className="text-sm">Today</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold">2,431</div>
                  <div className="text-sm text-muted-foreground">Total Customers</div>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ArrowUp className="h-6 w-6 text-primary" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-2 rounded border">
                  <div className="text-xs text-muted-foreground">This Week</div>
                  <div className="flex items-center gap-1">
                    <ArrowUp className="h-3 w-3 text-green-500" />
                    <span className="text-sm font-medium">45</span>
                  </div>
                </div>
                <div className="p-2 rounded border">
                  <div className="text-xs text-muted-foreground">This Month</div>
                  <div className="flex items-center gap-1">
                    <ArrowUp className="h-3 w-3 text-green-500" />
                    <span className="text-sm font-medium">127</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Dummy data for demonstration
const dummyCustomers = [
  { name: 'Rahul Sharma', email: 'rahul.sharma@example.com', orders: 8, spent: 24500, lastOrder: '12 Jun 2023' },
  { name: 'Priya Patel', email: 'priya.patel@example.com', orders: 12, spent: 36400, lastOrder: '23 May 2023' },
  { name: 'Amit Singh', email: 'amit.singh@example.com', orders: 5, spent: 18200, lastOrder: '30 Jun 2023' },
  { name: 'Deepika Reddy', email: 'deepika.r@example.com', orders: 3, spent: 9800, lastOrder: '14 Jul 2023' },
  { name: 'Vikram Mehta', email: 'v.mehta@example.com', orders: 7, spent: 28900, lastOrder: '2 Jul 2023' },
  { name: 'Neha Kumar', email: 'neha.k@example.com', orders: 4, spent: 12600, lastOrder: '19 Jun 2023' },
  { name: 'Arun Joshi', email: 'arun.joshi@example.com', orders: 6, spent: 19700, lastOrder: '5 Jul 2023' },
  { name: 'Kavita Nair', email: 'kavita.n@example.com', orders: 2, spent: 7800, lastOrder: '28 Jul 2023' },
  { name: 'Rajesh Gupta', email: 'r.gupta@example.com', orders: 9, spent: 33200, lastOrder: '10 Jun 2023' },
  { name: 'Sneha Verma', email: 'sneha.v@example.com', orders: 1, spent: 4500, lastOrder: '25 Jul 2023' },
]; 