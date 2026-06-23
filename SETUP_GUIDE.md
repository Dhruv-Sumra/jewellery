# 🚀 Complete Setup Guide - Argentum Silver Jewelry E-commerce

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB account (free at MongoDB Atlas)
- Razorpay account (test mode available)
- Git installed

## 🔧 Step-by-Step Setup

### Step 1: Clone and Install

```bash
# Navigate to project directory
cd silver-jewelry-ecommerce

# Install dependencies
npm install
```

### Step 2: MongoDB Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account
3. Create a new cluster (M0 free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password

Example:
```
mongodb+srv://username:yourpassword@cluster0.xxxxx.mongodb.net/silver-jewelry?retryWrites=true&w=majority
```

### Step 3: Razorpay Setup

1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/signup)
2. Navigate to Settings → API Keys
3. Generate Test Keys (for development)
4. Copy both Key ID and Key Secret

### Step 4: Environment Configuration

Create `.env.local` file in project root:

```env
# MongoDB
MONGODB_URI="your_mongodb_connection_string_here"

# NextAuth
NEXTAUTH_SECRET="run: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Razorpay
RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxxx"
RAZORPAY_KEY_SECRET="your_razorpay_secret_here"

# Silver Price API
LIVE_SILVER_API_ENDPOINT="https://api.metals.live/v1/spot/silver"
```

### Step 5: Generate NextAuth Secret

On Windows:
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }) -as [byte[]])
```

On Mac/Linux:
```bash
openssl rand -base64 32
```

Copy the output to `NEXTAUTH_SECRET` in `.env.local`

### Step 6: Seed Sample Products (Optional)

Create `scripts/seed.js`:

```javascript
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  images: [String],
  weightInGrams: Number,
  makingCharges: Number,
  purity: Number,
  category: String,
  inStock: Boolean,
  featured: Boolean,
});

const Product = mongoose.model('Product', productSchema);

const sampleProducts = [
  {
    name: 'Celestial Moon Ring',
    description: 'Minimalist crescent moon ring in pure 925 silver',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800',
    ],
    weightInGrams: 3.5,
    makingCharges: 500,
    purity: 925,
    category: 'ring',
    inStock: true,
    featured: true,
  },
  {
    name: 'Infinity Pendant',
    description: 'Elegant infinity symbol pendant with chain',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
    ],
    weightInGrams: 5.2,
    makingCharges: 800,
    purity: 925,
    category: 'pendant',
    inStock: true,
    featured: true,
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Product.deleteMany({});
  await Product.insertMany(sampleProducts);
  console.log('✅ Database seeded!');
  process.exit(0);
}

seed();
```

Run seeding:
```bash
node scripts/seed.js
```

### Step 7: Run Development Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

## ✅ Verification Checklist

- [ ] MongoDB connection working
- [ ] Products displaying on homepage
- [ ] Live silver price showing in header
- [ ] Cart functionality working
- [ ] User registration successful
- [ ] User login successful
- [ ] Razorpay modal opening on checkout
- [ ] Test payment successful

## 🧪 Testing Razorpay

Use these test card details:

- **Card Number**: 4111 1111 1111 1111
- **CVV**: Any 3 digits
- **Expiry**: Any future date
- **Name**: Any name

## 🚀 Production Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables
4. Update `NEXTAUTH_URL` to your Vercel domain
5. Switch Razorpay to live keys

### Environment Variables for Production

```env
MONGODB_URI="production_mongodb_uri"
NEXTAUTH_SECRET="same_secret_as_dev"
NEXTAUTH_URL="https://your-domain.vercel.app"
RAZORPAY_KEY_ID="rzp_live_xxxxx"
RAZORPAY_KEY_SECRET="live_secret"
LIVE_SILVER_API_ENDPOINT="https://api.metals.live/v1/spot/silver"
```

## 🔒 Security Notes

1. Never commit `.env.local` to git
2. Use different secrets for production
3. Enable Razorpay webhook signature verification
4. Add rate limiting for production APIs
5. Use HTTPS in production

## 📞 Troubleshooting

### MongoDB Connection Failed
- Check if IP is whitelisted in MongoDB Atlas
- Verify password has no special characters
- Ensure connection string format is correct

### Razorpay Not Loading
- Check if Razorpay script loaded in browser console
- Verify API keys are correct
- Ensure test mode is enabled

### Silver Price Not Updating
- Check API endpoint in browser
- Verify metals.live API is accessible
- Check server logs for errors

## 🎉 Success!

Your silver jewelry e-commerce platform is now running with:
- ✨ Live market-based pricing
- 💳 Secure Razorpay payments
- 🔐 User authentication
- 🛒 Cart management
- 📱 Responsive design

For additional support, check the README.md file.
