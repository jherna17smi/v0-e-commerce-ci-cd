# Vellum — E-commerce Store with CI/CD & TDD

A small e-commerce storefront built with **Next.js (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. The project demonstrates a complete Test-Driven Development (TDD) workflow with unit and integration tests, plus an automated **CI/CD pipeline** using **GitHub Actions** that builds, tests, and deploys to **Vercel**.

## Live Application

🔗 **Live Demo:** https://v0-e-commerce-ci-cd.vercel.app/

> Replace the URL above with your deployed Vercel link after the first successful deployment.

## Features

- Product catalog with images, descriptions, and pricing
- Slide-out shopping cart with quantity controls
- Add to cart, increment/decrement, remove, and clear
- Live cart badge and running total
- Fully typed, component-driven architecture

## Tech Stack

| Area        | Technology                              |
| ----------- | --------------------------------------- |
| Framework   | Next.js 16 (App Router)                 |
| UI          | React 19, Tailwind CSS, shadcn/ui       |
| Language    | TypeScript                              |
| Testing     | Jest + React Testing Library            |
| CI/CD       | GitHub Actions                          |
| Hosting     | Vercel                                  |

## Getting Started

```bash
# Install dependencies
pnpm install

# Run the dev server
pnpm dev

# Run the test suite
pnpm test

# Build for production
pnpm build
```

Open [http://localhost:3000](http://localhost:3000) to view the store.

## Test-Driven Development (TDD)

Tests live in the `__tests__/` directory and are run with Jest and React Testing Library.

```bash
pnpm test        # run all tests once
pnpm test:watch  # run in watch mode during development
pnpm test:ci     # run in CI mode (used by GitHub Actions)
```

### Unit tests

- **`__tests__/cart-reducer.test.ts`** — Tests the cart reducer state logic: adding items, incrementing quantity, decrementing, removing, and clearing. These are focused, independent, and deterministic.
- **`__tests__/product-card.test.tsx`** — Tests the `ProductCard` component: it asserts correct rendering (name, description, formatted price, image alt text) and user interaction (clicking "Add to cart" updates cart state).

### Integration test

- **`__tests__/store.integration.test.tsx`** — Renders the full `Store` and simulates a user adding a product. It asserts that **the cart gets updated** — the header badge increments, the cart panel lists the line item with the correct quantity, and the total reflects the product price. It also covers adding the same product twice and adjusting quantity from inside the cart.

All tests pass:

```
Test Suites: 3 passed, 3 total
Tests:       13 passed, 13 total
```

## CI/CD Pipeline (GitHub Actions)

The workflow definition lives in [`ci-cd-workflow.yml`](ci-cd-workflow.yml) at the project root and runs on every push and pull request to `main` once activated.

> **Activation step:** v0's GitHub connection cannot push files inside `.github/workflows/`, so the workflow is shipped as `ci-cd-workflow.yml` at the repo root. To turn the pipeline on, recreate it on GitHub:
>
> 1. On github.com, open your repo and click **Add file → Create new file**
> 2. Name it exactly `.github/workflows/main.yml` (the slashes create the folders)
> 3. Paste the contents of `ci-cd-workflow.yml` (everything below the instruction header)
> 4. Commit to the `main` branch

### Continuous Integration — `build-and-test`

1. Checks out the code
2. Sets up pnpm and Node.js 20
3. Installs dependencies with a frozen lockfile
4. Runs the Jest unit & integration tests (`pnpm test:ci`)
5. Builds the application (`pnpm build`)

If any test fails, the job fails and **deployment is blocked**, preventing faulty code from being released.

### Continuous Deployment — `deploy`

- Runs **only** after `build-and-test` succeeds (`needs: build-and-test`)
- Runs **only** on direct pushes to `main`
- Pulls Vercel environment info, builds with the Vercel CLI, and deploys to production

### Required GitHub Secrets

Add these under **Settings → Secrets and variables → Actions** in your GitHub repository:

| Secret              | Description                                      |
| ------------------- | ------------------------------------------------ |
| `VERCEL_TOKEN`      | Vercel access token (Account Settings → Tokens)  |
| `VERCEL_ORG_ID`     | Vercel organization ID (from `.vercel/project.json`) |
| `VERCEL_PROJECT_ID` | Vercel project ID (from `.vercel/project.json`)  |

> Tip: Run `vercel link` locally once to generate `.vercel/project.json`, which contains your `orgId` and `projectId`.

## Project Structure

```
.
├── ci-cd-workflow.yml              # CI/CD pipeline (copy to .github/workflows/main.yml on GitHub)
├── __tests__/                      # Unit & integration tests
│   ├── cart-reducer.test.ts
│   ├── product-card.test.tsx
│   └── store.integration.test.tsx
├── app/                            # Next.js App Router
├── components/
│   ├── cart-context.tsx            # Cart state (reducer + provider)
│   ├── cart-panel.tsx              # Slide-out cart UI
│   ├── product-card.tsx            # Product card UI
│   └── store.tsx                   # Storefront composition
├── lib/products.ts                 # Product data & helpers
├── jest.config.ts
└── jest.setup.ts
```

## License

MIT
