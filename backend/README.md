# Sumnay Cosmetic — Backend Setup

## Prerequisites
1. **Node.js** installed (v18+ recommended) — https://nodejs.org
2. **MongoDB** installed and running locally — https://www.mongodb.com/try/download/community
   - Or use a free cloud database at https://www.mongodb.com/cloud/atlas (easier, no local install)

## Setup steps

1. Open a terminal in the `backend` folder.

2. Install dependencies:
   ```
   npm install
   ```

3. Create your `.env` file (copy the example and edit if needed):
   ```
   cp .env.example .env
   ```
   - If using local MongoDB, the default `MONGO_URI` in `.env.example` will work as-is.
   - If using MongoDB Atlas (cloud), replace `MONGO_URI` with the connection string Atlas gives you.

4. Seed the database with your 7 categories and 42 real products:
   ```
   npm run seed
   ```
   You should see: `Seeded 7 categories and 42 products.`

5. Start the server:
   ```
   npm run dev
   ```
   (uses nodemon, auto-restarts on file changes — or use `npm start` for a plain run)

6. You should see:
   ```
   MongoDB connected: mongodb://127.0.0.1:27017/sumnay_cosmetic
   Sumnay Cosmetic API running on http://localhost:5000
   ```

## Test it's working

Open in your browser: `http://localhost:5000/api/health`
You should see: `{"status":"ok","message":"Sumnay Cosmetic API is running."}`

Then try: `http://localhost:5000/api/products`
You should see all 42 products as JSON.

## API Endpoints reference

| Method | Endpoint | Auth required | Description |
|--------|----------|---------------|--------------|
| POST | /api/auth/register | No | Create account |
| POST | /api/auth/login | No | Log in, get token |
| GET | /api/auth/me | Yes | Get current user |
| GET | /api/products | No | List all products (supports ?category= and ?search=) |
| GET | /api/products/:id | No | Get single product |
| POST | /api/products | Admin | Create product |
| PUT | /api/products/:id | Admin | Update product |
| DELETE | /api/products/:id | Admin | Delete product |
| POST | /api/orders | Yes | Place an order (mock checkout) |
| GET | /api/orders/mine | Yes | Get your order history |
| GET | /api/orders | Admin | Get all orders |
| PUT | /api/orders/:id/status | Admin | Update order status |

## Creating an admin account

By default, all registered users are `customer` role. To make yourself an admin for testing
the admin routes, after registering, open MongoDB (Compass or shell) and manually change
your user's `role` field from `"customer"` to `"admin"` in the `users` collection.
