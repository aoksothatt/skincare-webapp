# thatskin — Skincare E-Commerce Platform

A high-performance, decoupled skincare e-commerce platform built with **Next.js App Router (Storefront UI)** and **Laravel 11 (PostgreSQL REST API)**.

---

## Folder Map

```
/
├─ frontend/                 Next.js app (own package.json, .env.example, Dockerfile, README.md)
├─ backend/                  Laravel API (own composer.json, .env.example, Dockerfile, README.md)
├─ docs/                     ARCHITECTURE.md, DEPLOYMENT.md, API.md
├─ .github/workflows/ci.yml  Automated CI: backend tests + frontend lint & build
├─ docker-compose.yml        DEV: PostgreSQL 16 only
├─ docker-compose.prod.yml   PROD: frontend, backend, Caddy reverse proxy, PostgreSQL
├─ package.json              Root convenience scripts only (concurrently)
├─ .env.example              Root development database credentials
├─ .gitignore                Ignored artifacts (node_modules, vendor, .env, .next, logs)
├─ .editorconfig             Multi-language style standards (2-space TS, 4-space PHP)
└─ README.md                 Root project documentation
```

---

## Prerequisites

- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **npm**: `v10.x` or later
- **PHP**: `8.2` or `8.3` (with extensions: `pdo_pgsql`, `mbstring`, `bcmath`, `zip`)
- **Composer**: `v2.x`
- **Docker & Docker Compose**: (For local PostgreSQL 16 and production containerization)

---

## Quick Start (Local Development)

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/your-org/skincare-web.git
cd skincare-web

# Install root, frontend, and backend dependencies
npm run setup
```

### 2. Configure Environment Files
```bash
# Frontend environment
cp frontend/.env.example frontend/.env.local

# Backend environment
cp backend/.env.example backend/.env

# Root database environment
cp .env.example .env
```

### 3. Start Database (Docker)
```bash
npm run db:up
```

### 4. Run Both Frontend and Backend Concurrently
```bash
npm run dev
```

- **Storefront**: [http://localhost:3000](http://localhost:3000)
- **REST API**: [http://localhost:8000/api/v1](http://localhost:8000/api/v1)
- **Style Guide**: [http://localhost:3000/style-guide](http://localhost:3000/style-guide)

---

## Environment Variables Table

### Frontend (`/frontend/.env.local`)
| Variable | Description | Example / Default |
|---|---|---|
| `API_URL` | Server-to-server endpoint for Laravel API | `http://localhost:8000/api/v1` |
| `NEXT_PUBLIC_SITE_URL` | Canonical client-accessible public URL | `http://localhost:3000` |
| `USE_MOCK_DATA` | Toggle between local mock data and API calls | `true` |

### Backend (`/backend/.env`)
| Variable | Description | Example / Default |
|---|---|---|
| `APP_ENV` | Environment stage (`local`, `production`) | `local` |
| `APP_KEY` | Laravel encryption key (`php artisan key:generate`) | `base64:...` |
| `APP_DEBUG` | Detailed debug error reporting | `true` |
| `APP_URL` | URL of the Laravel application | `http://localhost:8000` |
| `FRONTEND_URL` | Storefront domain allowed for CORS | `http://localhost:3000` |
| `DB_CONNECTION` | Database driver | `pgsql` |
| `DB_HOST` | Database host | `127.0.0.1` |
| `DB_PORT` | Database port | `5432` |
| `DB_DATABASE` | Database name | `skincare_db` |
| `DB_USERNAME` | Database user | `skincare_user` |
| `DB_PASSWORD` | Database user password | `skincare_secret` |
| `ADMIN_EMAIL` | Seed administrator account email | `admin@thatskin.com` |
| `ADMIN_PASSWORD` | Seed administrator password | `admin_secret_password` |
| `FILESYSTEM_DISK` | Storage driver (`local`, `s3`) | `local` |

---

## Command Reference

| Command | Action |
|---|---|
| `npm run setup` | Installs root, frontend, and backend packages |
| `npm run dev` | Runs Next.js (`:3000`) and Laravel (`:8000`) concurrently |
| `npm run db:up` | Starts local PostgreSQL 16 via Docker |
| `npm run db:down` | Stops local PostgreSQL container |
| `npm run backend:test` | Runs Laravel Pest / PHPUnit test suite |
| `npm run frontend:build`| Builds Next.js production storefront |
| `npm run lint` | Runs ESLint across frontend code |
