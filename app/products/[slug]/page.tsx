import { getProductBySlug, getRelatedProducts } from "@/lib/supabase/products"
import { notFound } from "next/navigation"
import ProductDetails from "@/components/products/ProductDetails"
import RelatedProducts from "@/components/products/RelatedProducts"
import type { Metadata } from "next"

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Process params safely
  const safeParams = await Promise.resolve(params);
  const product = await getProductBySlug(safeParams.slug)

  if (!product) {
    return {
      title: "Product Not Found | Ayurveda",
      description: "The requested product could not be found",
    }
  }

  return {
    title: `${product.name} | Ayurveda`,
    description: product.description.substring(0, 160),
    openGraph: {
      images: [{ url: product.image_url }],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  // Process params safely
  const safeParams = await Promise.resolve(params);
  const product = await getProductBySlug(safeParams.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.id, product.category_id)

  return (
    <div className="container px-4 py-8 sm:px-6 lg:px-8">
      <ProductDetails product={product} />
      <RelatedProducts products={relatedProducts} />
    </div>
  )
}
