# 📦 How to Add Products to Your Store

Your website is now fully functional with all pages! To see products, you need to seed the database.

## 🚀 Quick Start (2 Steps)

### Step 1: Get MongoDB Connection

You have two options:

#### Option A: MongoDB Atlas (Recommended - Free)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/silver-jewelry?retryWrites=true&w=majority
```

#### Option B: Local MongoDB

If you have MongoDB installed locally:
```
mongodb://localhost:27017/silver-jewelry
```

### Step 2: Update Environment & Seed

1. Open `.env.local` file
2. Update the MONGODB_URI line:
   ```env
   MONGODB_URI="your_connection_string_here"
   ```

3. Run the seed script:
   ```bash
   node scripts/seed-products.js
   ```

## ✅ What You'll Get

After seeding, your database will have **30 products**:

- 🔱 **6 Rings** - From delicate moon rings to bold statement pieces
- 📿 **5 Necklaces** - Including bridal sets and classic chains  
- 🔗 **6 Bracelets** - Tennis bracelets, bangles, and charm bracelets
- 💎 **5 Earrings** - Hoops, studs, teardrops, and chandeliers
- ⭐ **5 Pendants** - Infinity, floral, geometric designs
- 🌸 **3 Anklets** - Delicate chains and charm anklets

All with:
- ✨ Live dynamic pricing
- 📸 Beautiful placeholder images
- 📝 Detailed descriptions
- ⚖️ Actual weights and making charges
- 🎯 Featured products highlighted

## 🎯 After Seeding

1. **Refresh your browser** at http://localhost:3000
2. Products will appear on the homepage
3. Visit `/products` to see the full catalog
4. Filter by category
5. Add items to cart
6. Try the checkout flow!

## 🔄 Re-seed Database

To clear and re-add products:

```bash
node scripts/seed-products.js
```

This will:
- ✅ Delete old products
- ✅ Add fresh 30 products
- ✅ Show success confirmation

## 🎨 What's Now Available

### Pages Created:
- ✅ **Homepage** (`/`) - Hero + Featured products
- ✅ **Products Page** (`/products`) - All products with filters
- ✅ **About Page** (`/about`) - Company story
- ✅ **Contact Page** (`/contact`) - Contact form
- ✅ **Auth Pages** (`/auth/signin`, `/auth/register`)
- ✅ **Checkout** (`/checkout`) - Full payment flow
- ✅ **Order Success** (`/order-success`) - Confirmation

### Features:
- ✅ Navigation menu (Home, Products, About, Contact)
- ✅ Category filtering
- ✅ Live silver price ticker
- ✅ Shopping cart with animations
- ✅ Footer with links
- ✅ Responsive design
- ✅ GSAP & Framer Motion animations

## 🎉 You're All Set!

Once you seed the database, you'll have a **complete, production-ready e-commerce website** with 30 beautiful products!

## 🆘 Troubleshooting

### Can't connect to MongoDB?
- Check if your IP is whitelisted in MongoDB Atlas
- Verify password has no special characters in connection string
- Make sure connection string format is correct

### Products not showing after seeding?
- Refresh the page (F5)
- Check browser console for errors
- Verify server is still running (`npm run dev`)

### Seed script errors?
```bash
# Make sure dependencies are installed
npm install mongoose dotenv
```

---

**Ready to see your store come alive? Run the seed script now!** 🚀
