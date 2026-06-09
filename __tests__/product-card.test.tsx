import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ProductCard } from "@/components/product-card"
import { CartProvider, useCart } from "@/components/cart-context"
import type { Product } from "@/lib/products"

const product: Product = {
  id: "1",
  name: "Aero Wireless Headphones",
  description: "Active noise cancelling over-ear headphones.",
  price: 199,
  image: "/wireless-headphones.png",
}

// Small helper that surfaces cart state for assertions in the DOM.
function CartCount() {
  const { totalItems } = useCart()
  return <span data-testid="count">{totalItems}</span>
}

function renderWithCart(ui: React.ReactElement) {
  return render(
    <CartProvider>
      {ui}
      <CartCount />
    </CartProvider>,
  )
}

describe("ProductCard", () => {
  it("renders the product name, description, and formatted price", () => {
    renderWithCart(<ProductCard product={product} />)

    expect(screen.getByText("Aero Wireless Headphones")).toBeInTheDocument()
    expect(
      screen.getByText("Active noise cancelling over-ear headphones."),
    ).toBeInTheDocument()
    expect(screen.getByText("$199.00")).toBeInTheDocument()
  })

  it("renders an accessible image with alt text", () => {
    renderWithCart(<ProductCard product={product} />)
    expect(screen.getByAltText("Aero Wireless Headphones")).toBeInTheDocument()
  })

  it("adds the product to the cart when the button is clicked", async () => {
    const user = userEvent.setup()
    renderWithCart(<ProductCard product={product} />)

    expect(screen.getByTestId("count")).toHaveTextContent("0")

    await user.click(
      screen.getByRole("button", { name: "Add Aero Wireless Headphones to cart" }),
    )

    expect(screen.getByTestId("count")).toHaveTextContent("1")
  })

  it("increments the count when clicked multiple times", async () => {
    const user = userEvent.setup()
    renderWithCart(<ProductCard product={product} />)

    const button = screen.getByRole("button", {
      name: "Add Aero Wireless Headphones to cart",
    })
    await user.click(button)
    await user.click(button)
    await user.click(button)

    expect(screen.getByTestId("count")).toHaveTextContent("3")
  })
})
