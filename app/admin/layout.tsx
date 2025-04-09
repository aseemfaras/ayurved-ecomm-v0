'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      setLoading(true)
      
      try {
        // For testing purposes, set authenticated to true directly
        // In production, you'd want to uncomment the authentication check below
        setAuthenticated(true)
        setLoading(false)
        return;
        
        /*
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Error checking authentication:', error)
          router.push('/admin/login')
          return
        }

        if (!session) {
          router.push('/admin/login')
          return
        }

        // For now, any authenticated user can access the admin area
        // In production, you would check if the user has admin role
        setAuthenticated(true)
        */
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Verifying authentication...</span>
      </div>
    )
  }

  if (!authenticated) {
    return null // Will redirect in the useEffect
  }

  return (
    <div className="flex min-h-screen">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-muted p-4 shadow-md">
        <div className="mb-8">
          <h1 className="text-xl font-bold">Ayurveda Admin</h1>
        </div>
        <nav className="space-y-1">
          <Link 
            href="/admin" 
            className="flex items-center px-4 py-2 text-sm rounded hover:bg-accent"
          >
            Dashboard
          </Link>
          <Link 
            href="/admin/products" 
            className="flex items-center px-4 py-2 text-sm rounded hover:bg-accent"
          >
            Products
          </Link>
          <Link 
            href="/admin/categories" 
            className="flex items-center px-4 py-2 text-sm rounded hover:bg-accent"
          >
            Categories
          </Link>
          <Link 
            href="/admin/orders" 
            className="flex items-center px-4 py-2 text-sm rounded hover:bg-accent"
          >
            Orders
          </Link>
          <Link 
            href="/admin/customers" 
            className="flex items-center px-4 py-2 text-sm rounded hover:bg-accent"
          >
            Customers
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
} 