# thatskin — REST API Reference (`/api/v1`)

All endpoints are versioned under `/api/v1`. Responses are strictly JSON.

## Public Endpoints

### 1. Health Check
- **Endpoint**: `GET /api/v1/health`
- **Response** `(200 OK)`:
  ```json
  {
    "status": "ok"
  }
  ```

---

### 2. Homepage Configuration & Spotlight Products
- **Endpoint**: `GET /api/v1/home`
- **Cache-Control**: `public, max-age=60`
- **Response** `(200 OK)`:
  ```json
  {
    "hero": {
      "badge": "New arrivals · Free delivery over $30",
      "title": "Skin that feels calm, clear and cared for",
      "highlight_word": "calm",
      "subtitle": "Authentic skincare and simple routines, delivered to your door.",
      "button_label": "Shop now",
      "button_link": "/shop"
    },
    "featured": [
      {
        "id": "prod-1",
        "slug": "dewy-hydration-serum",
        "name": "Dewy Hydration Serum",
        "category_name": "Serum",
        "price": 24.00,
        "sale_price": null,
        "size_label": "30 ml",
        "image_url": null,
        "illustration_type": "serum",
        "badge_text": "Bestseller",
        "tint": "soft",
        "body_color": "accent"
      }
    ]
  }
  ```

---

### 3. Filter Options
- **Endpoint**: `GET /api/v1/filters`
- **Response** `(200 OK)`:
  ```json
  {
    "categories": [
      { "name": "Serum", "slug": "serum", "count": 3 },
      { "name": "Cleanser", "slug": "cleanser", "count": 2 }
    ],
    "skin_types": [
      { "name": "Dry", "count": 5 },
      { "name": "Oily", "count": 4 }
    ],
    "concerns": [
      { "name": "Hydration", "count": 6 },
      { "name": "Acne", "count": 3 }
    ]
  }
  ```

---

### 4. Products Catalog
- **Endpoint**: `GET /api/v1/products`
- **Query Parameters**:
  - `category` (string, category slug)
  - `skin` (comma-separated list, e.g. `dry,combination`)
  - `concern` (comma-separated list, e.g. `hydration,acne`)
  - `price` (`u20` | `m` | `o30`)
  - `q` (search keyword)
  - `sort` (`popular` | `new` | `low` | `high`)
  - `page` (integer, default 1)
  - `per_page` (integer, default 6, max 24)
- **Response** `(200 OK)`:
  ```json
  {
    "data": [
      {
        "id": "prod-1",
        "slug": "dewy-hydration-serum",
        "name": "Dewy Hydration Serum",
        "brand": "Lumière",
        "category": { "name": "Serum", "slug": "serum" },
        "skin_types": ["Dry", "Combination"],
        "concerns": ["Hydration"],
        "badge": "Bestseller",
        "image_url": null,
        "illustration_type": "serum",
        "tint": "soft",
        "body_color": "accent",
        "popularity_rank": 1,
        "created_at": "2026-08-01T00:00:00Z",
        "variants": [
          { "id": "var-1-1", "sku": "DHS-30ML", "size_label": "30 ml", "price": 24.00, "sale_price": null, "stock_qty": 12 },
          { "id": "var-1-2", "sku": "DHS-50ML", "size_label": "50 ml", "price": 34.00, "sale_price": 29.00, "stock_qty": 4 }
        ]
      }
    ],
    "total": 12,
    "page": 1,
    "per_page": 6,
    "last_page": 2
  }
  ```

---

### 5. Product Detail
- **Endpoint**: `GET /api/v1/products/{slug}`
- **Response** `(200 OK)`: Includes full descriptions, key ingredients, usage steps, and variant availability.
- **Response** `(404 Not Found)`:
  ```json
  {
    "message": "Product not found or currently unavailable."
  }
  ```

---

### 6. Authentication Endpoints
- `POST /api/v1/auth/register` (name, email, password, password_confirmation, phone?)
- `POST /api/v1/auth/login` (email, password) — Rate-limited to 5 requests / min.
- `POST /api/v1/auth/logout` (Sanctum bearer token required)
- `GET /api/v1/auth/me` (Sanctum bearer token required)
