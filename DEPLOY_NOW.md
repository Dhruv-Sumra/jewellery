# 🚀 Deploy Your Website - Step by Step

## ✅ What's Done Already

- ✅ Git initialized
- ✅ All files committed
- ✅ Ready to push to GitHub

---

## 📋 Next Steps (Follow in Order)

### **Step 1: Create GitHub Repository**

1. Open your browser and go to:
   ```
   https://github.com/new
   ```

2. Fill in the details:
   - **Owner:** Dhruv-Sumra
   - **Repository name:** `silver-jewelry-store` (or any name you like)
   - **Description:** "Premium Silver Jewelry E-commerce Platform with Live Pricing"
   - **Visibility:** ✅ Public (required for free Vercel hosting)
   - **DO NOT check:** ❌ "Add a README file"
   - **DO NOT check:** ❌ "Add .gitignore"
   - **DO NOT check:** ❌ "Choose a license"

3. Click **"Create repository"**

4. You'll see a page with commands - **KEEP IT OPEN!**

---

### **Step 2: Push Code to GitHub**

Copy and paste these commands in your PowerShell (one at a time):

```powershell
# Set the default branch to main
git branch -M main

# Add your GitHub repository as remote
git remote add origin https://github.com/Dhruv-Sumra/silver-jewelry-store.git

# Push your code to GitHub
git push -u origin main
```

**Note:** Replace `silver-jewelry-store` with your actual repository name if different.

**If prompted for credentials:**
- Username: `Dhruv-Sumra`
- Password: Use a **Personal Access Token** (not your GitHub password)

**Don't have a token? Create one:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name it: "Silver Jewelry Deploy"
4. Check: `repo` (all permissions)
5. Click "Generate token"
6. Copy the token (you won't see it again!)
7. Use it as password when pushing

---

### **Step 3: Verify on GitHub**

1. Go to: `https://github.com/Dhruv-Sumra/YOUR-REPO-NAME`

2. You should see all your files:
   - README.md
   - src/
   - package.json
   - All other files

3. ✅ Code is now on GitHub!

---

### **Step 4: Deploy to Vercel (FREE Hosting)**

1. **Sign up/Sign in to Vercel:**
   - Go to: https://vercel.com/signup
   - Click **"Continue with GitHub"**
   - Authorize Vercel to access your GitHub

2. **Import Your Project:**
   - After signing in, you'll see: "Import Git Repository"
   - Or go directly to: https://vercel.com/new
   - You'll see your repository: `Dhruv-Sumra/silver-jewelry-store`
   - Click **"Import"**

3. **Configure Project:**
   - **Project Name:** `silver-jewelry-store` (auto-filled)
   - **Framework Preset:** Next.js ✅ (auto-detected)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `.next` (auto-filled)

4. **Add Environment Variables:**
   
   Click **"Environment Variables"** and add these **one by one**:

   **Required Variables:**
   
   | Name | Value |
   |------|-------|
   | `NEXTAUTH_SECRET` | (Generate below) |
   | `NEXTAUTH_URL` | `https://silver-jewelry-store.vercel.app` |
   | `MONGODB_URI` | `mongodb://localhost:27017/silver-jewelry` |
   | `RAZORPAY_KEY_ID` | `rzp_test_placeholder` |
   | `RAZORPAY_KEY_SECRET` | `placeholder_secret` |
   | `GOLDAPI_KEY` | `EAB5H7JDJRPNAACXQNIF794CXQNIF` |
   | `LIVE_SILVER_API_ENDPOINT` | `https://www.goldapi.io/api/XAG/INR` |

   **Generate NEXTAUTH_SECRET:**
   Run this in PowerShell:
   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```
   Copy the output and use it as `NEXTAUTH_SECRET`

   **Note:** The `NEXTAUTH_URL` will be updated after deployment with your actual Vercel URL.

5. **Deploy:**
   - Click **"Deploy"** button
   - Wait 2-3 minutes for build to complete
   - You'll see: "🎉 Congratulations!"

6. **Visit Your Live Website:**
   - Click **"Visit"** or **"Go to Dashboard"**
   - Copy your URL (e.g., `https://silver-jewelry-store.vercel.app`)
   - Open it in browser
   - **Your website is LIVE!** 🎉

---

### **Step 5: Update NEXTAUTH_URL**

After your first deployment:

1. Copy your actual Vercel URL (from the deployment)

2. Go to Vercel Dashboard:
   - Click your project name
   - Go to **Settings** tab
   - Click **"Environment Variables"** in left sidebar

3. Find `NEXTAUTH_URL` and click **Edit**

4. Change the value to your actual URL:
   ```
   https://silver-jewelry-store-YOUR-ACTUAL-URL.vercel.app
   ```

5. Click **"Save"**

6. Go to **"Deployments"** tab

7. Click the **"..."** menu on the latest deployment

8. Click **"Redeploy"**

9. Wait for redeployment to complete

---

## 🎉 You're Live!

Your website is now accessible at:
```
https://YOUR-PROJECT-NAME.vercel.app
```

**Test these pages:**
- Home: `https://YOUR-URL.vercel.app/`
- Products: `https://YOUR-URL.vercel.app/products`
- Admin Panel: `https://YOUR-URL.vercel.app/admin/silver-price`
- About: `https://YOUR-URL.vercel.app/about`
- Contact: `https://YOUR-URL.vercel.app/contact`

---

## 📱 Update Silver Price from Anywhere

Your admin panel is live at:
```
https://YOUR-URL.vercel.app/admin/silver-price
```

You can:
- Update price from any device (phone, tablet, computer)
- Quick-set buttons for common prices
- View current rate
- Check last update time

---

## 🔄 Future Updates

When you make changes to your code:

```powershell
# Make your changes, then:
git add .
git commit -m "Description of changes"
git push
```

**Vercel automatically deploys!** 🚀

---

## 📊 Monitor Your Website

**Vercel Dashboard shows:**
- 📈 Visitor analytics
- ⚡ Performance metrics
- 🔍 Deployment history
- 📝 Build logs
- 🌐 Domains management

Access at: https://vercel.com/dashboard

---

## 🎯 Quick Reference

### GitHub Repository:
```
https://github.com/Dhruv-Sumra/silver-jewelry-store
```

### Vercel Dashboard:
```
https://vercel.com/dashboard
```

### Admin Panel (After Deployment):
```
https://YOUR-URL.vercel.app/admin/silver-price
```

### Price Update API:
```powershell
# Update price via API
Invoke-WebRequest -Uri "https://YOUR-URL.vercel.app/api/silver-price/manual" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"price": 245}'
```

---

## ⚠️ Common Issues

### "Repository already exists"
**Solution:** Either:
- Use a different name
- Or delete the existing repo and try again

### "Permission denied"
**Solution:** Use Personal Access Token instead of password
- Create at: https://github.com/settings/tokens

### "Build failed on Vercel"
**Solution:** 
- Check build logs in Vercel dashboard
- Make sure all environment variables are set
- Try redeploying

### "MongoDB connection error"
**Solution:** This is normal!
- System uses demo products automatically
- Website works perfectly without MongoDB
- Add MongoDB Atlas later if needed

---

## 💡 Optional: MongoDB Atlas (Free Database)

If you want real products database:

1. Go to: https://www.mongodb.com/cloud/atlas/register

2. Create free M0 cluster

3. Get connection string

4. Update `MONGODB_URI` in Vercel:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/jewelry
   ```

5. Redeploy

**Free tier:**
- 512 MB storage
- Enough for 1000s of products!

---

## 🎨 Custom Domain (Optional)

Want your own domain like `www.yourjewelry.com`?

1. Buy domain from:
   - Namecheap: https://www.namecheap.com
   - GoDaddy: https://www.godaddy.com
   - Google Domains: https://domains.google

2. In Vercel Dashboard:
   - Go to your project
   - Settings → Domains
   - Add your domain
   - Follow DNS instructions

3. Free SSL included!

**Cost:** ~₹500-800/year for domain

---

## 📞 Need Help?

**If deployment fails:**
1. Check this guide step-by-step
2. Read error messages carefully
3. Check Vercel build logs
4. Verify environment variables

**Resources:**
- Vercel Docs: https://vercel.com/docs
- GitHub Docs: https://docs.github.com
- Next.js Docs: https://nextjs.org/docs

---

## ✅ Deployment Checklist

Before sharing your website:

- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Website loads successfully
- [ ] All pages accessible
- [ ] Admin panel works
- [ ] Can update silver price
- [ ] Products display correctly
- [ ] Cart functionality works
- [ ] Environment variables set

---

## 🎊 Congratulations!

Your silver jewelry e-commerce website is now:
- ✅ Live on the internet
- ✅ Accessible worldwide
- ✅ Free hosting forever
- ✅ Automatic deployments
- ✅ Fast (global CDN)
- ✅ Secure (HTTPS)

**Share your website with the world!** 🌍

---

**Total Time:** 10-15 minutes
**Total Cost:** ₹0 (FREE!)

---

**Ready? Start with Step 1!** 🚀
