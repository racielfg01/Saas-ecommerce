# ShopStore - E-commerce Application

A complete e-commerce application built with Next.js 13+, shadcn/ui, and Tailwind CSS.

## Features

### 🔐 Authentication
- Login page with email and password validation
- Simulated authentication with localStorage persistence
- Protected admin routes
- Demo credentials: `admin@email.com` / `password123`

### 🛒 Store
- Beautiful responsive product grid
- Featured banner
- Product search and category filtering
- Stock management (only shows available products)
- Mobile-first design

### 🛍️ Shopping Cart
- Add/remove products
- Update quantities
- Real-time total calculation
- Persistent cart (localStorage)
- Visual feedback for stock limits

### 💳 Checkout
- Customer information form
- Form validation with Zod
- Order summary
- WhatsApp integration for order submission

### ⚙️ Admin Panel
- Dashboard for product management
- Full CRUD operations (Create, Read, Update, Delete)
- Product form with image preview
- Real-time stock monitoring

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: Zustand with persistence
- **Styling**: Tailwind CSS
- **Forms**: react-hook-form + Zod validation
- **Icons**: lucide-react

## Getting Started

### Prerequisites
- Node.js 18+ installed

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with navbar
│   ├── page.tsx           # Home/store page
│   ├── login/             # Login page
│   └── admin/             # Admin panel
│       ├── page.tsx       # Admin dashboard
│       └── products/      # Product CRUD pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── navbar.tsx        # Navigation with cart drawer
│   ├── banner.tsx        # Hero banner
│   ├── product-card.tsx  # Product display card
│   ├── login-form.tsx    # Authentication form
│   ├── product-form.tsx  # Product creation/edit form
│   └── checkout-modal.tsx # Checkout form with WhatsApp
├── lib/                   # Utilities
│   ├── store.ts          # Zustand global store
│   ├── mock-data.ts      # Initial products data
│   └── utils.ts          # Utility functions
└── types/                 # TypeScript definitions
    └── index.ts          # Shared types
```

## Usage

### As a Customer
1. Browse products on the home page
2. Use search or category filters
3. Add products to cart
4. Review cart in the drawer
5. Proceed to checkout
6. Fill in your details
7. Submit order via WhatsApp

### As an Admin
1. Login with: `admin@email.com` / `password123`
2. Access the Admin panel
3. View all products with stock levels
4. Create new products
5. Edit existing products
6. Delete products

## Configuration

### WhatsApp Number
Edit the `WHATSAPP_NUMBER` in `src/lib/mock-data.ts`:
```typescript
export const WHATSAPP_NUMBER = "1234567890"; // Your WhatsApp number
```

### Initial Products
Modify the `initialProducts` array in `src/lib/mock-data.ts` to customize your catalog.

## Features Implemented

✅ Login with simulated authentication
✅ Protected admin routes
✅ Product CRUD operations
✅ Responsive product grid
✅ Shopping cart with persistence
✅ Checkout form with validation
✅ WhatsApp integration
✅ Category filtering
✅ Product search
✅ Mobile-first design
✅ Stock management
✅ Image preview in forms

## Build for Production

```bash
npm run build
npm start
```

## License

MIT
