# thatskin Backend API

Decoupled Laravel 11/12 JSON REST API for the **thatskin** skincare e-commerce platform.

## Requirements
- PHP 8.3+ with `pdo`, `pdo_pgsql`, `zip`, `bcmath`, `curl`, and `openssl` extensions.
- Composer 2.x
- PostgreSQL 16 (or Docker Desktop)

## Local Development Setup

### 1. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Ensure database credentials match your environment. In the default Docker setup (`docker compose up -d postgres` from repo root), port `5433` is exposed on the host to avoid port 5432 host collisions:
```ini
APP_NAME=thatskin
APP_ENV=local
APP_KEY=...
APP_DEBUG=true
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5433
DB_DATABASE=skincare_db
DB_USERNAME=skincare_user
DB_PASSWORD=skincare_secret
```

Generate the application encryption key:
```bash
php artisan key:generate
```

### 2. Database Migrations
Run database migrations:
```bash
php artisan migrate
```
To refresh the database:
```bash
php artisan migrate:fresh
```

### 3. Run Development Server
Start the Laravel local server:
```bash
php artisan serve --port=8000
```
The API is available at `http://localhost:8000`.

### 4. Run Test Suite
Run PHPUnit test suite:
```bash
php artisan test
```

## API Endpoints (v1)

### Health Check
- **Route**: `GET /api/v1/health`
- **Headers**: `Accept: application/json`
- **Response**: `200 OK`
```json
{
  "status": "ok"
}
```

### Consistent JSON Errors
All `/api/*` routes return standardized JSON errors:
```json
{
  "message": "Resource not found"
}
```
Validation errors return `422 Unprocessable Content` with `{ "message": "...", "errors": { ... } }`.
