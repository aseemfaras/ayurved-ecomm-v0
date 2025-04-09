"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"
import { useState, useEffect } from "react"
import type { Category } from "@/lib/types"
import { useMobile } from "@/hooks/use-mobile"

interface ProductFiltersProps {
  categories: Category[]
  selectedCategory?: string
}

export default function ProductFilters({ categories, selectedCategory }: ProductFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  const [filters, setFilters] = useState({
    category: selectedCategory || "",
    minPrice: "",
    maxPrice: "",
    sort: searchParams.get("sort") || "newest",
  })

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: selectedCategory || "",
    }))
  }, [selectedCategory])

  const handleCategoryChange = (value: string) => {
    setFilters((prev) => ({ ...prev, category: value }))

    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set("category", value)
    } else {
      params.delete("category")
    }

    router.push(`${pathname}?${params.toString()}`)
    if (isMobile) setIsOpen(false)
  }

  const handleSortChange = (value: string) => {
    setFilters((prev) => ({ ...prev, sort: value }))

    const params = new URLSearchParams(searchParams.toString())
    if (value !== "newest") {
      params.set("sort", value)
    } else {
      params.delete("sort")
    }

    router.push(`${pathname}?${params.toString()}`)
    if (isMobile) setIsOpen(false)
  }

  const handlePriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (filters.minPrice) {
      params.set("minPrice", filters.minPrice)
    } else {
      params.delete("minPrice")
    }

    if (filters.maxPrice) {
      params.set("maxPrice", filters.maxPrice)
    } else {
      params.delete("maxPrice")
    }

    router.push(`${pathname}?${params.toString()}`)
    if (isMobile) setIsOpen(false)
  }

  const clearFilters = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      sort: "newest",
    })

    router.push(pathname)
    if (isMobile) setIsOpen(false)
  }

  const filterContent = (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="category-all"
              name="category"
              className="h-4 w-4 rounded-full border-muted-foreground"
              checked={filters.category === ""}
              onChange={() => handleCategoryChange("")}
            />
            <Label htmlFor="category-all" className="ml-2 text-sm font-normal">
              All Categories
            </Label>
          </div>

          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <input
                type="radio"
                id={`category-${category.id}`}
                name="category"
                className="h-4 w-4 rounded-full border-muted-foreground"
                checked={filters.category === category.slug}
                onChange={() => handleCategoryChange(category.slug)}
              />
              <Label htmlFor={`category-${category.id}`} className="ml-2 text-sm font-normal">
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-4">Price Range</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="min-price" className="text-sm">
              Min
            </Label>
            <Input
              id="min-price"
              type="number"
              placeholder="₹0"
              value={filters.minPrice}
              onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-price" className="text-sm">
              Max
            </Label>
            <Input
              id="max-price"
              type="number"
              placeholder="₹5000"
              value={filters.maxPrice}
              onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
            />
          </div>
        </div>
        <Button className="w-full mt-4" size="sm" onClick={handlePriceFilter}>
          Apply Price Filter
        </Button>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-4">Sort By</h3>
        <RadioGroup value={filters.sort} onValueChange={handleSortChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="newest" id="newest" />
            <Label htmlFor="newest">Newest</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price-asc" id="price-asc" />
            <Label htmlFor="price-asc">Price: Low to High</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price-desc" id="price-desc" />
            <Label htmlFor="price-desc">Price: High to Low</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="popular" id="popular" />
            <Label htmlFor="popular">Popularity</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
        Clear All Filters
      </Button>
    </div>
  )

  if (isMobile) {
    return (
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">Filters</h2>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">{filterContent}</div>
          </SheetContent>
        </Sheet>
      </div>
    )
  }

  return filterContent
}
