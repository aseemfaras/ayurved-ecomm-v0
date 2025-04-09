export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compare_at_price?: number
  image_url?: string
  category_id: string
  is_featured: boolean
  in_stock: boolean
  created_at: string
  categories?: Category
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  image_url?: string
  quantity: number
}
