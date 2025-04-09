import { getProducts, getCategories } from "@/lib/supabase/products"
import ProductGrid from "@/components/products/ProductGrid"
import ProductFilters from "@/components/products/ProductFilters"
import { Suspense } from "react"
import { ProductsPageSkeleton } from "@/components/skeletons/ProductsPageSkeleton"

export const metadata = {
  title: "Products | Ayurveda",
  description: "Browse our collection of premium Ayurvedic products for natural healing and wellness",
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Process searchParams safely
  const params = await Promise.resolve(searchParams);
  
  const categorySlug = typeof params.category === "string" ? params.category : undefined
  const sortBy = typeof params.sort === "string" ? params.sort : undefined
  const search = typeof params.search === "string" ? params.search : undefined

  const productsPromise = getProducts({ categorySlug, sortBy, search })
  const categoriesPromise = getCategories()

  const [products, categories] = await Promise.all([productsPromise, categoriesPromise])

  return (
    <div className="container px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Ayurvedic Products</h1>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        <ProductFilters categories={categories} selectedCategory={categorySlug} />

        <div className="lg:col-span-3">
          <Suspense fallback={<ProductsPageSkeleton />}>
            <ProductGrid products={products} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
