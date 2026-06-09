import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Store } from "@/components/store"
import { products } from "@/lib/products"

/**
 * Integration test: exercises the full store -> cart flow the way a user would.
 * It renders the real Store (with its CartProvider, ProductCard list, header
 * badge, and slide-out CartPanel) and asserts that adding a product updates
 * the cart badge and the cart panel contents.
 */
describe("Store cart integration", () => {
  it("updates the cart when a product is added", async () => {
    const user = userEvent.setup()
    render(<Store />)

    const firstProduct = products[0]

    // No badge before anything is added.
    expect(screen.queryByTestId("cart-count")).not.toBeInTheDocument()

    // Add the first product from the grid.
    await user.click(
      screen.getByRole("button", { name: `Add ${firstProduct.name} to cart` }),
    )

    // Header badge reflects 1 item.
    expect(screen.getByTestId("cart-count")).toHaveTextContent("1")

    // Open the cart panel.
    await user.click(screen.getByRole("button", { name: "Open cart" }))

    const dialog = screen.getByRole("dialog", { name: "Shopping cart" })
    expect(within(dialog).getByText(`Your Cart (1)`)).toBeInTheDocument()

    // The added product appears as a line item with quantity 1.
    const lineItem = within(dialog).getByTestId(`cart-item-${firstProduct.id}`)
    expect(within(lineItem).getByText(firstProduct.name)).toBeInTheDocument()
    expect(screen.getByTestId(`quantity-${firstProduct.id}`)).toHaveTextContent("1")

    // The cart total matches the product price.
    expect(screen.getByTestId("cart-total")).toHaveTextContent("$199.00")
  })

  it("increases quantity and total when the same product is added twice", async () => {
    const user = userEvent.setup()
    render(<Store />)

    const firstProduct = products[0]
    const addButton = screen.getByRole("button", {
      name: `Add ${firstProduct.name} to cart`,
    })

    await user.click(addButton)
    await user.click(addButton)

    expect(screen.getByTestId("cart-count")).toHaveTextContent("2")

    await user.click(screen.getByRole("button", { name: "Open cart" }))
    expect(screen.getByTestId(`quantity-${firstProduct.id}`)).toHaveTextContent("2")
    expect(screen.getByTestId("cart-total")).toHaveTextContent("$398.00")
  })

  it("adjusts quantity from within the cart panel", async () => {
    const user = userEvent.setup()
    render(<Store />)

    const firstProduct = products[0]
    await user.click(
      screen.getByRole("button", { name: `Add ${firstProduct.name} to cart` }),
    )
    await user.click(screen.getByRole("button", { name: "Open cart" }))

    await user.click(
      screen.getByRole("button", { name: `Increase ${firstProduct.name} quantity` }),
    )
    expect(screen.getByTestId(`quantity-${firstProduct.id}`)).toHaveTextContent("2")

    await user.click(
      screen.getByRole("button", { name: `Decrease ${firstProduct.name} quantity` }),
    )
    await user.click(
      screen.getByRole("button", { name: `Decrease ${firstProduct.name} quantity` }),
    )

    // Removed from cart; empty message shows.
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument()
  })
})
