"use client"

import { createContext, useContext, useMemo, useReducer, type ReactNode } from "react"
import type { Product } from "@/lib/products"

export type CartItem = {
  product: Product
  quantity: number
}

type CartState = {
  items: CartItem[]
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "DECREMENT_ITEM"; productId: string }
  | { type: "CLEAR" }

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((item) => item.product.id === action.product.id)
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }
      }
      return { items: [...state.items, { product: action.product, quantity: 1 }] }
    }
    case "DECREMENT_ITEM": {
      return {
        items: state.items
          .map((item) =>
            item.product.id === action.productId
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      }
    }
    case "REMOVE_ITEM": {
      return { items: state.items.filter((item) => item.product.id !== action.productId) }
    }
    case "CLEAR": {
      return { items: [] }
    }
    default:
      return state
  }
}

type CartContextValue = {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  decrementItem: (productId: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const value = useMemo<CartContextValue>(() => {
    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = state.items.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0,
    )
    return {
      items: state.items,
      totalItems,
      totalPrice,
      addItem: (product) => dispatch({ type: "ADD_ITEM", product }),
      removeItem: (productId) => dispatch({ type: "REMOVE_ITEM", productId }),
      decrementItem: (productId) => dispatch({ type: "DECREMENT_ITEM", productId }),
      clear: () => dispatch({ type: "CLEAR" }),
    }
  }, [state.items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
