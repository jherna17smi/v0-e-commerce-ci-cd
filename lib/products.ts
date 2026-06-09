export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Aero Wireless Headphones",
    description: "Active noise cancelling over-ear headphones with 40h battery.",
    price: 199,
    image: "/wireless-headphones.png",
  },
  {
    id: "2",
    name: "Pulse Smart Watch",
    description: "Fitness tracking, heart rate, and notifications on your wrist.",
    price: 149,
    image: "/smartwatch.png",
  },
  {
    id: "3",
    name: "Lumen Desk Lamp",
    description: "Adjustable LED lamp with warm and cool light modes.",
    price: 59,
    image: "/desk-lamp.png",
  },
  {
    id: "4",
    name: "Terra Ceramic Mug",
    description: "Handcrafted 12oz ceramic mug, microwave and dishwasher safe.",
    price: 24,
    image: "/ceramic-mug.png",
  },
  {
    id: "5",
    name: "Drift Mechanical Keyboard",
    description: "Hot-swappable switches with RGB backlighting and aluminum frame.",
    price: 129,
    image: "/mechanical-keyboard.png",
  },
  {
    id: "6",
    name: "Nimbus Backpack",
    description: "Water-resistant 22L backpack with padded laptop sleeve.",
    price: 89,
    image: "/canvas-backpack.png",
  },
]

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}
