import "@testing-library/jest-dom"
import React from "react"

// Mock next/image so it renders a plain <img> in the jsdom test environment.
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { fill, priority, sizes, ...rest } = props as {
      fill?: boolean
      priority?: boolean
      sizes?: string
      [key: string]: unknown
    }
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return React.createElement("img", rest)
  },
}))
