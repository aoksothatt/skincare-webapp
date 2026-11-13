# thatskin — Architecture Specification

## Overview

**thatskin** is structured as an enterprise-grade decoupled monorepo containing two fully independent applications:
1. **Storefront Frontend (`/frontend`)**: Next.js App Router (React 19, TypeScript, Tailwind CSS).
2. **REST API Backend (`/backend`)**: Laravel 11 (PHP 8.3, PostgreSQL 16, Laravel Sanctum).

They communicate exclusively over HTTP/HTTPS. There are **zero direct code imports** between `/frontend` and `/backend`.

---

## High-Level Data Flow

```
[ Customer Browser ]
        │
        ▼
[ Next.js Storefront (Port 3000) ]
        │  • Server Components (SSR & ISR cached via Next.js fetch cache)
        │  • Client Components ("use client" for carousels, filters, cart context)
        │  • /frontend/lib/api.ts (Unified data fetching contract)
        │
        ▼ (HTTP REST JSON under /api/v1/*)
[ Laravel JSON API (Port 8000) ]
        │  • Route middleware: CORS, Sanctum Auth, RateLimiter
        │  • Form Requests: Strict parameter validation
        │  • Query Builders / Scopes: active(), withEffectivePrice()
        │  • Eloquent Resources: Consistent JSON response shape
        │
        ▼ (PostgreSQL Wire Protocol, Port 5432)
[ PostgreSQL 16 Database ]
        • Relational schema with B-tree indexes on slugs, foreign keys, & popularity
```

---

## What Lives Where

| Domain / Responsibility | Location | Technology & Purpose |
|---|---|---|
| **Storefront UI & Pages** | `/frontend/app/*` | Next.js Server Components, layouts, metadata, JSON-LD, SEO |
| **Interactive Controls** | `/frontend/components/*` | Client components for product stage carousel, drawer, toolbar |
| **Frontend Data Contract** | `/frontend/lib/api.ts` | Async API calls with fallback to `mock-data.ts` via `USE_MOCK_DATA` |
| **Client State** | `/frontend/lib/cart-context.tsx` | In-memory shopping cart and accessible toast notifications |
| **API Endpoints & Routing**| `/backend/routes/api.php` | Versioned REST endpoints (`/api/v1/auth`, `/api/v1/products`, etc.) |
| **Business Logic & Queries**| `/backend/app/Models/*` | Eloquent models, relationships, scopes (`active`, `withEffectivePrice`) |
| **Database Migrations** | `/backend/database/migrations/*` | Relational tables for products, variants, tags, reviews, settings |
| **Data Seeders** | `/backend/database/seeders/*` | Idempotent seeders for the 12 skincare catalog products |
| **Dev Environment** | `/docker-compose.yml` | Standalone PostgreSQL 16 service on port 5432 |
| **Prod Environment** | `/docker-compose.prod.yml` | Multi-container setup (Next.js, Laravel, Nginx/Caddy, PostgreSQL) |

---

## Architectural Rules

1. **Complete Decoupling**: Frontend and backend are independently testable, buildable, and deployable.
2. **Environment Variable Parity**: No secrets or hardcoded endpoints in source code. All configuration is loaded from `.env` files.
3. **API Contract Stability**: Frontend consumes domain models matching backend API resources. Money is always represented as numeric float/decimals, dates as ISO 8601 strings.
4. **Resilience & Graceful Degradation**:
   - Setting `USE_MOCK_DATA=true` enables instant offline development without requiring PostgreSQL or backend running.
   - Setting `USE_MOCK_DATA=false` connects to `API_URL` (`http://localhost:8000/api/v1`).
