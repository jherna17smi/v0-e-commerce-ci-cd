"use client"

import Image from "next/image"
import { Minus, Plus, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { formatPrice } from "@/lib/products"

export function CartPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, totalItems, totalPrice, addItem, decrementItem, removeItem, clear } = useCart()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-label="Shopping cart">
      <button
        type="button"
        aria-label="Close cart overlay"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40"
      />
      <aside className="relative flex h-full w-full max-w-md flex-col bg-card shadow-xl">
        <header className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-semibold text-card-foreground">
            Your Cart ({totalItems})
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close cart">
            <X className="size-5" />
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="mt-8 text-center text-sm text-muted-foreground">Your cart is empty.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex gap-3 rounded-lg border border-border p-3"
                  data-testid={`cart-item-${item.product.id}`}
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <span className="text-sm font-medium text-card-foreground">
                      {item.product.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatPrice(item.product.price)}
                    </span>
                    <div className="mt-1 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-7"
                        onClick={() => decrementItem(item.product.id)}
                        aria-label={`Decrease ${item.product.name} quantity`}
                      >
                        <Minus className="size-3" />
                      </Button>
                      <span
                        className="min-w-6 text-center text-sm font-medium text-card-foreground"
                        data-testid={`quantity-${item.product.id}`}
                      >
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-7"
                        onClick={() => addItem(item.product)}
                        aria-label={`Increase ${item.product.name} quantity`}
                      >
                        <Plus className="size-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto size-7 text-muted-foreground"
                        onClick={() => removeItem(item.product.id)}
                        aria-label={`Remove ${item.product.name} from cart`}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-border p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-lg font-bold text-card-foreground" data-testid="cart-total">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={clear}>
                Clear
              </Button>
              <Button className="flex-1">Checkout</Button>
            </div>
          </footer>
        )}
      </aside>
    </div>
  )
}
