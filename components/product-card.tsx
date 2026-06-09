"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { formatPrice, type Product } from "@/lib/products"

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <article
      className="flex flex-col overflow-hidden rounded-lg border border-border bg-card"
      data-testid={`product-${product.id}`}
    >
      <div className="relative aspect-square w-full bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base font-semibold leading-tight text-card-foreground text-balance">
          {product.name}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <span className="text-lg font-bold text-card-foreground">
            {formatPrice(product.price)}
          </span>
          <Button
            onClick={() => addItem(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </article>
  )
}
