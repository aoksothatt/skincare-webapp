# thatskin — Production Deployment Guide

This guide details two deployment topologies for **thatskin**:
- **Option A (Recommended for scale)**: Frontend on Vercel / Node.js PaaS, Backend on a VPS / Container Platform, Managed PostgreSQL.
- **Option B (All-in-one VPS)**: Everything running on a single cloud VPS via `docker-compose.prod.yml`.

> [!NOTE]
> For users in Cambodia, deploying servers in **Singapore (AWS ap-southeast-1, DigitalOcean SGP1, or Linode SGP)** provides the lowest network latency (~25–35 ms).

---

## Topology Option A: Decoupled Multi-Platform

1. **Frontend (Vercel / Cloudflare Pages / Railway)**:
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Output directory: `.next`
   - Environment variables:
     ```ini
     API_URL=https://api.yourdomain.com/api/v1
     NEXT_PUBLIC_SITE_URL=https://yourdomain.com
     USE_MOCK_DATA=false
     ```

2. **Backend (VPS / Railway / Fly.io / AWS ECS)**:
   - Root directory: `backend`
   - Build using `backend/Dockerfile`.
   - Run production migrations:
     ```bash
     php artisan migrate --force --seed
     ```
   - Cache config, routes, and views:
     ```bash
     php artisan config:cache
     php artisan route:cache
     php artisan view:cache
     ```

---

## Topology Option B: All-in-One Cloud VPS (`docker-compose.prod.yml`)

### Step 1: Server Provisioning
On an Ubuntu 24.04 LTS VPS with Docker and Docker Compose installed:

```bash
git clone https://github.com/your-org/skincare-web.git /var/www/thatskin
cd /var/www/thatskin
cp .env.example .env
```

Edit `.env` with secure production secrets.

### Step 2: Launch Containers
```bash
docker compose -f docker-compose.prod.yml up -d --build
```

### Step 3: Run First-Time Migrations
```bash
docker compose -f docker-compose.prod.yml exec backend php artisan key:generate --force
docker compose -f docker-compose.prod.yml exec backend php artisan migrate --force --seed
```

---

## PostgreSQL Automated Backup (Cron)

Set up a daily automated database dump on the VPS:

```bash
# Add to crontab (crontab -e)
0 3 * * * docker compose -f /var/www/thatskin/docker-compose.prod.yml exec -T db pg_dump -U skincare_user skincare_db | gzip > /var/backups/skincare_db_$(date +\%F).sql.gz
```

---

## Production Security & Readiness Checklist

- [ ] `APP_DEBUG=false` in backend environment.
- [ ] `APP_ENV=production`.
- [ ] Unique 32-character base64 `APP_KEY` generated.
- [ ] Strong alphanumeric passwords for database and administrator.
- [ ] `FRONTEND_URL` set strictly to production domain (CORS whitelist).
- [ ] HTTPS enforced across both storefront and API subdomains.
- [ ] Trusted proxies configured in Laravel for SSL offloading reverse proxies.
- [ ] Automated PostgreSQL backups verified and stored off-server.
