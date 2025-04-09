'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { PlusCircle, Search, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'

// Mock categories for testing
const mockCategories = [
  { id: 'cat-1', name: 'Herbs & Supplements', slug: 'herbs', description: 'Traditional herbs and supplements for daily wellness', productCount: 12 },
  { id: 'cat-2', name: 'Essential Oils', slug: 'oils', description: 'Pure essential oils for aromatherapy and healing', productCount: 8 },
  { id: 'cat-3', name: 'Skincare', slug: 'skincare', description: 'Natural skincare products for radiant skin', productCount: 15 },
  { id: 'cat-4', name: 'Wellness Products', slug: 'wellness', description: 'Products for overall health and wellbeing', productCount: 10 }
];

export default function CategoriesAdmin() {
  const { toast } = useToast()
  const [categories, setCategories] = useState(mockCategories)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      // Filter out the deleted category
      setCategories(categories.filter(category => category.id !== id))
      
      toast({
        title: 'Success',
        description: 'Category deleted successfully',
      })
    }
  }

  const filteredCategories = categories.filter((category) => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Manage your product categories
          </p>
        </div>
        <Button
          onClick={() => {
            toast({
              title: 'Add Category',
              description: 'This feature is under development',
            })
          }}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Category Management</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
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
                    <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Slug</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Description</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Products</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center">Loading categories...</td>
                    </tr>
                  ) : filteredCategories.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center">No categories found</td>
                    </tr>
                  ) : (
                    filteredCategories.map((category) => (
                      <tr 
                        key={category.id} 
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle">
                          <div className="font-medium">{category.name}</div>
                        </td>
                        <td className="p-4 align-middle">{category.slug}</td>
                        <td className="p-4 align-middle">
                          <div className="text-sm text-muted-foreground truncate max-w-xs">
                            {category.description}
                          </div>
                        </td>
                        <td className="p-4 align-middle">{category.productCount}</td>
                        <td className="p-4 align-middle">
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => {
                                toast({
                                  title: 'Edit',
                                  description: `Editing category ${category.name}`,
                                })
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleDelete(category.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
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