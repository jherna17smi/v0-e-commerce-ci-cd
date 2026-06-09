import { cartReducer } from "@/components/cart-context"
import type { Product } from "@/lib/products"

const productA: Product = {
  id: "a",
  name: "Product A",
  description: "First product",
  price: 10,
  image: "/a.png",
}

const productB: Product = {
  id: "b",
  name: "Product B",
  description: "Second product",
  price: 25,
  image: "/b.png",
}

describe("cartReducer", () => {
  it("adds a new item with quantity 1", () => {
    const state = cartReducer({ items: [] }, { type: "ADD_ITEM", product: productA })
    expect(state.items).toHaveLength(1)
    expect(state.items[0].quantity).toBe(1)
    expect(state.items[0].product.id).toBe("a")
  })

  it("increments quantity when adding an existing item", () => {
    const first = cartReducer({ items: [] }, { type: "ADD_ITEM", product: productA })
    const second = cartReducer(first, { type: "ADD_ITEM", product: productA })
    expect(second.items).toHaveLength(1)
    expect(second.items[0].quantity).toBe(2)
  })

  it("keeps separate line items for different products", () => {
    let state = cartReducer({ items: [] }, { type: "ADD_ITEM", product: productA })
    state = cartReducer(state, { type: "ADD_ITEM", product: productB })
    expect(state.items).toHaveLength(2)
  })

  it("decrements quantity and removes the item when it reaches zero", () => {
    let state = cartReducer({ items: [] }, { type: "ADD_ITEM", product: productA })
    state = cartReducer(state, { type: "DECREMENT_ITEM", productId: "a" })
    expect(state.items).toHaveLength(0)
  })

  it("removes an item entirely regardless of quantity", () => {
    let state = cartReducer({ items: [] }, { type: "ADD_ITEM", product: productA })
    state = cartReducer(state, { type: "ADD_ITEM", product: productA })
    state = cartReducer(state, { type: "REMOVE_ITEM", productId: "a" })
    expect(state.items).toHaveLength(0)
  })

  it("clears the entire cart", () => {
    let state = cartReducer({ items: [] }, { type: "ADD_ITEM", product: productA })
    state = cartReducer(state, { type: "ADD_ITEM", product: productB })
    state = cartReducer(state, { type: "CLEAR" })
    expect(state.items).toHaveLength(0)
  })
})
