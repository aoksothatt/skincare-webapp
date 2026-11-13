# thatskin — Laravel REST API Backend

The decoupled JSON API backend for **thatskin**, built with Laravel 11, PostgreSQL, and Sanctum.

## Architecture

- **Stateless JSON REST API**: Versioned under `/api/v1/*`.
- **Database**: PostgreSQL 16 with indexed foreign keys, slugs, and composite filters.
- **Authentication**: Laravel Sanctum bearer tokens with rate-limited login endpoints.
- **Strict Quality**: Form Requests for validation, API Resources for output formatting, strict decimal monetary precision, and eager loading to prevent N+1 queries.

## Environment Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
php artisan key:generate
```

### PostgreSQL Database Configuration

```ini
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=skincare_db
DB_USERNAME=skincare_user
DB_PASSWORD=skincare_secret
```

## Common Commands

```bash
# Start local PHP API server
php artisan serve --port=8000

# Run database migrations and seeders
php artisan migrate:fresh --seed

# Execute test suite (Pest / PHPUnit)
php artisan test
```

## Docker

```bash
# Build backend image
docker build -t thatskin-backend:latest .

# Run container
docker run -p 8000:8000 --env-file .env thatskin-backend:latest
```
