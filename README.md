# 🌟 Argentum - Premium Silver Jewelry E-commerce

A production-ready, full-stack silver jewelry e-commerce platform built with Next.js 14, featuring **live market-based pricing**, Razorpay payment integration, and stunning UI/UX animations.

## ✨ Key Features

- **Live Silver Price Engine**: 15-minute cached live silver rates with automatic INR conversion
- **Dynamic Product Pricing**: Server-side price calculation based on weight, making charges, and GST
- **Secure Checkout**: Razorpay payment gateway with signature verification
- **Premium Animations**: GSAP scroll triggers, Framer Motion micro-interactions
- **Cart Management**: Physics-based sliding drawer with backdrop blur
- **NextAuth Integration**: Secure user authentication and session management
- **MongoDB Database**: Scalable document storage with Mongoose ODM

## 🏗️ Project Structure

```
silver-jewelry-ecommerce/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/route.ts    # NextAuth configuration
│   │   │   │   └── register/route.ts          # User registration
│   │   │   ├── checkout/
│   │   │   │   ├── route.ts                   # Razorpay order creation
│   │   │   │   └── verify/route.ts            # Payment verification
│   │   │   ├── products/
│   │   │   │   ├── route.ts                   # Get all products
│   │   │   │   └── [id]/route.ts              # Get single product
│   │   │   └── silver-price/route.ts          # Live silver price API
│   │   ├── auth/
│   │   │   ├── signin/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── checkout/page.tsx                  # Checkout flow
│   │   ├── order-success/page.tsx
│   │   ├── page.tsx                           # Homepage
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx                         # Sticky nav with live ticker
│   │   ├── Hero.tsx                           # GSAP animated hero
│   │   ├── ProductCard.tsx                    # Image crossfade on hover
│   │   ├── ProductGrid.tsx
│   │   ├── CartDrawer.tsx                     # Sliding cart panel
│   │   └── Providers.tsx
│   ├── lib/
│   │   ├── mongodb.ts                         # MongoDB connection
│   │   └── silverPriceCache.ts                # 15-min price caching
│   ├── models/
│   │   ├── User.ts                            # User schema
│   │   ├── Product.ts                         # Product schema
│   │   └── Order.ts                           # Order schema
│   ├── store/
│   │   └── cartStore.ts                       # Zustand cart state
│   └── types/
│       └── next-auth.d.ts                     # NextAuth types
├── .env.local.example                         # Environment template
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create `.env.local` in the project root:

```env
# MongoDB Connection
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/silver-jewelry?retryWrites=true&w=majority"

# NextAuth Configuration
NEXTAUTH_SECRET="generate-a-secure-random-string-here"
NEXTAUTH_URL="http://localhost:3000"

# Razorpay Credentials
RAZORPAY_KEY_ID="rzp_test_your_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_secret"

# Live Silver Price API
LIVE_SILVER_API_ENDPOINT="https://api.metals.live/v1/spot/silver"
```

### 3. Get Credentials

**MongoDB:**
- Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get connection string

**Razorpay:**
- Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
- Get test/live API keys from Settings → API Keys

**NextAuth Secret:**
```bash
openssl rand -base64 32
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 💎 Core Architecture

### Live Silver Price Engine

The `silverPriceCache.ts` module implements:
- 15-minute server-side caching (prevents API rate limits)
- Automatic USD to INR conversion
- Fallback mechanisms for API failures
- Troy ounce to gram conversion

```typescript
// Server-side price calculation
const pricing = calculateProductPrice(
  weightInGrams,
  makingCharges,
  liveSilverPrice
);
// Returns: silverCost, makingCharges, subtotal, gst (3%), finalPrice
```

### Database Schemas

**Product Schema:**
- No fixed prices stored in database
- Only stores: weight, making charges, purity
- Prices calculated dynamically on every request

**Order Schema:**
- Freezes historical silver price at purchase time
- Stores complete price breakdown
- Links to Razorpay order/payment IDs

### Security Features

1. **Server-Side Price Verification**
   - Client prices are never trusted
   - All prices recalculated on checkout API

2. **Razorpay Signature Verification**
   - HMAC SHA256 signature validation
   - Prevents payment tampering

3. **NextAuth Session Management**
   - JWT-based sessions
   - Protected API routes

## 🎨 UI/UX Animations

**GSAP (Hero Section):**
- Scroll-triggered fade-in animations
- Floating background gradients

**Framer Motion:**
- Product card staggered entry
- Cart drawer physics-based slide
- Price count-up effect on updates
- Hover scale interactions

## 📦 API Routes

### `GET /api/silver-price`
Returns cached live silver price in INR/gram

### `GET /api/products`
Returns all products with dynamically calculated prices

### `POST /api/checkout`
Creates Razorpay order with server-verified pricing

### `POST /api/checkout/verify`
Verifies payment signature and updates order status

## 🔧 Production Deployment

### Vercel (Recommended)

```bash
vercel --prod
```

Add environment variables in Vercel dashboard.

### Build

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP, Framer Motion
- **Database**: MongoDB + Mongoose
- **Authentication**: NextAuth.js
- **Payments**: Razorpay
- **State**: Zustand
- **Language**: TypeScript

## 📝 License

MIT License - Free for commercial and personal use

---

**Built with 💎 by Elite Full-Stack Engineer**
