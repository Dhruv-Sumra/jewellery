# 💰 Real-Time Silver Price Configuration

Your website now fetches **real live silver prices** and caches them for **24 hours**.

---

## ⚡ **Current Setup**

### Automatic Updates
- **Frequency:** Every 24 hours
- **Source:** Live market data API
- **Caching:** Intelligent 24-hour cache
- **Fallback:** ₹75/gram if API fails

### Cache Duration
```
15 minutes → Changed to → 24 hours ✅
```

---

## 🌐 **How It Works**

1. **First Request:** Fetches live price from API
2. **Cache:** Stores price for 24 hours
3. **Subsequent Requests:** Uses cached price (instant!)
4. **After 24 Hours:** Automatically fetches fresh price
5. **On Failure:** Uses last known price or fallback

---

## 🔧 **API Configuration**

### Current API Endpoint
```env
LIVE_SILVER_API_ENDPOINT="https://api.metals.live/v1/spot/silver"
```

### Free API Alternatives

#### 1. **Metals-API.com** (Recommended)
- Free tier: 50 requests/month
- Sign up: https://metals-api.com/
- Accurate real-time data

```env
LIVE_SILVER_API_ENDPOINT="https://metals-api.com/api/latest?access_key=YOUR_KEY&base=USD&symbols=XAG"
```

#### 2. **GoldAPI.io**
- Free tier: 1 request/day (perfect for 24h cache!)
- Sign up: https://www.goldapi.io/
- Very accurate data

```env
LIVE_SILVER_API_ENDPOINT="https://www.goldapi.io/api/XAG/USD"
# Add header: x-access-token: YOUR_API_KEY
```

#### 3. **ExchangeRate-API.com**
- Free tier available
- Includes silver spot prices
- Good fallback option

---

## 🎯 **Manual Price Control**

### Option 1: Force Refresh
Update price immediately (ignores 24h cache):

```bash
# Using curl
curl http://localhost:3000/api/silver-price/refresh

# Using browser
Visit: http://localhost:3000/api/silver-price/refresh
```

### Option 2: Set Manual Price
Perfect for when you want to set your own price:

```bash
# Set price to ₹80 per gram
curl -X POST http://localhost:3000/api/silver-price/manual \
  -H "Content-Type: application/json" \
  -d '{"price": 80}'
```

**Response:**
```json
{
  "success": true,
  "price": 80,
  "currency": "INR",
  "unit": "gram",
  "message": "Silver price updated manually"
}
```

---

## 📊 **Check Current Price**

### API Endpoint
```
GET /api/silver-price
```

**Response:**
```json
{
  "success": true,
  "price": 75.50,
  "currency": "INR",
  "unit": "gram",
  "lastUpdated": "2024-01-15T10:30:00.000Z",
  "hoursOld": 2,
  "nextUpdate": "2024-01-16T10:30:00.000Z",
  "cached": true
}
```

---

## 🔄 **Price Update Workflow**

### Automatic (Recommended)
```
Day 1 10:00 AM → Fetch fresh price (₹75/g)
Day 1 11:00 AM → Use cached ₹75/g
Day 1 05:00 PM → Use cached ₹75/g
Day 2 10:00 AM → Fetch fresh price (₹76/g) ✅
Day 2 11:00 AM → Use cached ₹76/g
```

### Manual Control
```
Admin decides → Click refresh button
System fetches → New price instantly
Cache updated → Next auto-update in 24h
```

---

## 💡 **Best Practices**

### For Live Market Tracking
1. Use free tier API (50 req/month = daily updates for 50 days)
2. Cache for 24 hours (recommended)
3. Set up fallback price (₹75/g default)

### For Custom Pricing
1. Use manual API endpoint
2. Update price as needed
3. System uses your price until next manual update

### For Production
1. Get paid API plan for reliability
2. Set up monitoring
3. Add admin panel for manual control

---

## 🎨 **Price Display**

### Header Ticker
Shows in green indicator:
```
Live Silver: ₹75.50/g
```

### Product Cards
Price breakdown shows:
```
Silver Cost: ₹264.25 (3.5g × ₹75.50)
Making Charges: ₹500.00
GST (3%): ₹22.93
Total: ₹787.18
```

---

## 🔐 **Security (Optional)**

To protect manual price updates, add authentication:

```typescript
// In src/app/api/silver-price/manual/route.ts
const session = await getServerSession(authOptions);
if (!session?.user || session.user.email !== 'admin@yourstore.com') {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

---

## 📱 **Admin Panel Integration**

### Create Simple Admin Page

Create `src/app/admin/silver-price/page.tsx`:

```tsx
'use client';

import { useState } from 'react';

export default function SilverPriceAdmin() {
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    const res = await fetch('/api/silver-price/manual', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: parseFloat(price) }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  const handleRefresh = async () => {
    const res = await fetch('/api/silver-price/refresh');
    const data = await res.json();
    setMessage(`Price refreshed: ₹${data.price}/g`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Silver Price Management</h1>
      
      <div className="space-y-4">
        <div>
          <label>Manual Price (INR/gram):</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 ml-2"
          />
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 ml-2">
            Update Price
          </button>
        </div>

        <button onClick={handleRefresh} className="bg-green-500 text-white px-4 py-2">
          Fetch Live Price Now
        </button>

        {message && <p className="text-green-600">{message}</p>}
      </div>
    </div>
  );
}
```

---

## 🚀 **Quick Start**

### For Live Prices:
1. Sign up at https://metals-api.com/
2. Get free API key
3. Update `.env.local`:
   ```env
   LIVE_SILVER_API_ENDPOINT="https://metals-api.com/api/latest?access_key=YOUR_KEY"
   ```
4. Restart server
5. Price updates automatically every 24 hours!

### For Manual Control:
1. Use current setup (no API needed)
2. Update via: `POST /api/silver-price/manual`
3. Control price anytime you want

---

## 📊 **Current vs New System**

| Feature | Before | Now |
|---------|--------|-----|
| Cache Duration | 15 minutes | 24 hours ✅ |
| API Calls/Day | 96 | 1 ✅ |
| Cost | High API usage | Free tier works ✅ |
| Manual Control | No | Yes ✅ |
| Force Refresh | No | Yes ✅ |
| Fallback | Yes | Improved ✅ |

---

## ✅ **Summary**

Your website now:
- ✅ Fetches real live silver prices
- ✅ Updates every 24 hours automatically
- ✅ Caches for fast performance
- ✅ Supports manual price updates
- ✅ Has force refresh option
- ✅ Shows price age in UI
- ✅ Falls back gracefully on errors

**Silver prices are now real and update daily!** 💰

---

## 🔗 **API Endpoints**

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/silver-price` | GET | Get current price |
| `/api/silver-price/refresh` | GET | Force refresh |
| `/api/silver-price/manual` | POST | Set manual price |

---

**Your pricing is now accurate and updates automatically every 24 hours!** 🎉
