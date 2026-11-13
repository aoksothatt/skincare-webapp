# thatskin — Next.js Storefront Frontend

The customer-facing e-commerce storefront for **thatskin**, built with Next.js App Router, TypeScript, and Tailwind CSS.

## Architecture & Features

- **App Router & Server Components**: Server-side rendering by default; client components used strictly for interactive controls.
- **Design System**: Colors as CSS variables in `app/globals.css`, typography via `next/font` (Anton, Cormorant Garamond, Inter).
- **Decoupled API Layer**: All data fetched via async functions in `lib/api.ts`. Supports zero-code-change switching between local mock data and the Laravel JSON API via `USE_MOCK_DATA`.
- **In-Memory Cart & Toast**: Lightweight React Context cart state with accessible `aria-live` toast notifications.

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description | Default |
|---|---|---|
| `API_URL` | Server-to-server endpoint for backend API calls | `http://localhost:8000/api/v1` |
| `NEXT_PUBLIC_SITE_URL` | Canonical public URL of the storefront | `http://localhost:3000` |
| `USE_MOCK_DATA` | Toggle between local mock data and Laravel backend | `true` |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run linting
npm run lint

# Build production bundle
npm run build
```

## Docker

```bash
# Build standalone image
docker build -t thatskin-frontend:latest .

# Run container
docker run -p 3000:3000 --env-file .env.local thatskin-frontend:latest
```
