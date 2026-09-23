# Sumnay Cosmetic — Full Website

Final year project — a working e-commerce website for a cosmetics store.

## What's in this folder

- **`frontend/`** — all the pages you see (HTML/CSS/JS): homepage, product listing,
  product detail, cart, checkout, login, register. Uses your 42 real product photos.
- **`backend/`** — the Node.js/Express + MongoDB API that powers accounts, the product
  catalog, and orders. See `backend/README.md` for detailed setup steps.

## How to run the whole thing

### 1. Start the backend first
```
cd backend
npm install
cp .env.example .env
npm run seed      (loads your 42 products into the database)
npm run dev        (starts the API on http://localhost:5000)
```
Full details, including how to set up MongoDB, are in `backend/README.md`.

### 2. Open the frontend
The frontend is plain HTML/CSS/JS — no build step needed. Just open
`frontend/pages/index.html` in your browser (or use a simple local server like
VS Code's "Live Server" extension for the best experience with page links).

**Important:** the backend must be running for login, registration, and checkout
to work. Browsing products and the shopping bag work fine without it (data comes
from `frontend/js/products-data.js`), but creating an account, signing in, and
placing an order all call the real API at `http://localhost:5000`.

## How the pieces connect

- **Product browsing (home, listing, detail, cart)** — uses `products-data.js`,
  a local copy of your 42 real products. Fast, works offline, no backend needed.
- **Accounts (login/register)** — calls the real backend (`/api/auth/...`),
  stores a login token in the browser.
- **Checkout** — requires being signed in. It matches your cart items to the
  real database records by product name, then places a real order through
  `/api/orders`. This updates stock and saves order history in MongoDB.

## What's still worth adding, time permitting

- Product search bar — already done (top of the product listing page)
- Order history page — already done (`orders.html`)
- Admin dashboard — already done (`admin.html`) — manage products and update order statuses

### How to access the admin dashboard
1. Register a normal account through the site (or use one you already made).
2. Open MongoDB (Compass, or `mongosh`) and find your user in the `users` collection.
3. Change that user's `role` field from `"customer"` to `"admin"`.
4. Sign out and sign back in on the site, then visit `admin.html` directly.

## Recommender system

The product detail page includes a **"You might also like"** section powered by a
content-based recommender. For a given product, every other product is scored by
weighted similarity and the top 4 are shown:

| Signal | Weight | Method |
|---|---|---|
| Category match | 50 | Exact match — same category products score highest |
| Price closeness | 30 | Inverse of price difference, normalized against the widest price gap in the catalog |
| Description similarity | 20 | Jaccard similarity — overlap of words between the two product descriptions, divided by the total unique words across both |

The same algorithm is implemented in two places:
- **Client-side** (`frontend/js/product-detail.js`) — runs instantly against the
  local product data, no backend required, used for the actual page.
- **Backend API** (`GET /api/products/:id/recommendations?limit=4`) — same logic,
  querying MongoDB directly. Useful to reference in your report/documentation as
  the "real" recommender system, and can be swapped in later if you want the
  frontend to depend on live backend computation instead.

This is a lightweight content-based filtering approach — no external ML libraries
or training data required, appropriate for a catalog this size, and easy to explain
and defend in a viva/demo.

## Project structure
```
sumnay-cosmetic-website/
├── frontend/
│   ├── css/style.css
│   ├── js/
│   ├── images/products/   (your 42 real photos)
│   └── pages/
│       ├── index.html          — homepage
│       ├── products.html       — full catalog, filter + search
│       ├── product-detail.html — single product view
│       ├── cart.html           — shopping bag
│       ├── checkout.html       — place order
│       ├── login.html / register.html
│       ├── orders.html         — customer order history
│       └── admin.html          — admin dashboard (products + orders)
└── backend/
    ├── config/, controllers/, middleware/, models/, routes/
    ├── server.js, seed.js
    └── README.md
```
