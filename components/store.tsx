"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartProvider, useCart } from "@/components/cart-context"
import { ProductCard } from "@/components/product-card"
import { CartPanel } from "@/components/cart-panel"
import { products } from "@/lib/products"

function StoreHeader({ onOpenCart }: { onOpenCart: () => void }) {
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="text-xl font-bold tracking-tight text-foreground">Vellum</span>
        <Button
          variant="outline"
          onClick={onOpenCart}
          className="relative bg-transparent"
          aria-label="Open cart"
        >
          <ShoppingCart className="size-4" />
          Cart
          {totalItems > 0 && (
            <span
              className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
              data-testid="cart-count"
            >
              {totalItems}
            </span>
          )}
        </Button>
      </div>
    </header>
  )
}

function StoreContent() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader onOpenCart={() => setCartOpen(true)} />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 max-w-xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
            Thoughtfully designed essentials.
          </h1>
          <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
            A small collection of everyday products built to last. Free shipping on orders over
            $100.
          </p>
        </div>

        <section
          aria-label="Products"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </main>

      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}

export function Store() {
  return (
    <CartProvider>
      <StoreContent />
    </CartProvider>
  )
}
