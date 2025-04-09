import { supabase } from "./client"
import type { Product, Category } from "@/lib/types"

interface ProductQueryParams {
  categorySlug?: string
  sortBy?: string
  search?: string
  minPrice?: string
  maxPrice?: string
  limit?: number
}

export async function getProducts({
  categorySlug,
  sortBy,
  search,
  minPrice,
  maxPrice,
  limit,
}: ProductQueryParams = {}): Promise<Product[]> {
  let query = supabase.from("products").select(`
      *,
      categories (
        id,
        name,
        slug
      )
    `)

  // Apply category filter
  if (categorySlug) {
    query = query.eq("categories.slug", categorySlug)
  }

  // Apply price filters
  if (minPrice) {
    query = query.gte("price", Number.parseFloat(minPrice))
  }

  if (maxPrice) {
    query = query.lte("price", Number.parseFloat(maxPrice))
  }

  // Apply search filter
  if (search) {
    query = query.ilike("name", `%${search}%`)
  }

  // Apply sorting
  if (sortBy) {
    switch (sortBy) {
      case "price-asc":
        query = query.order("price", { ascending: true })
        break
      case "price-desc":
        query = query.order("price", { ascending: false })
        break
      case "popular":
        query = query.order("popularity", { ascending: false })
        break
      default:
        query = query.order("created_at", { ascending: false })
    }
  } else {
    query = query.order("created_at", { ascending: false })
  }

  // Apply limit
  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data as Product[]
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name,
        slug
      )
    `)
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching product:", error)
    return null
  }

  return data as Product
}

export async function getRelatedProducts(productId: string, categoryId: string, limit = 4): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .neq("id", productId)
    .limit(limit)

  if (error) {
    console.error("Error fetching related products:", error)
    return []
  }

  return data as Product[]
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const { data, error } = await supabase.from("products").select("*").eq("is_featured", true).limit(limit)

  if (error) {
    console.error("Error fetching featured products:", error)
    return []
  }

  return data as Product[]
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from("categories").select("*").order("name")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data as Category[]
}
