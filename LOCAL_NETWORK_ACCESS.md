# 🌐 Access Your Website from Any Device on Your Network

## 🎯 Goal
Share your website with other devices (phone, tablet, other computers) on the same WiFi network.

---

## 🚀 Method 1: Next.js Network Access (Easiest)

### **Step 1: Find Your Computer's IP Address**

Run this in PowerShell:
```powershell
ipconfig
```

Look for "IPv4 Address" under your WiFi adapter:
```
Wireless LAN adapter Wi-Fi:
   IPv4 Address. . . . . . . . : 192.168.1.100  ← This is your IP!
```

Your IP will be something like:
- `192.168.1.X` or
- `192.168.0.X` or
- `10.0.0.X`

**Copy this IP address!**

---

### **Step 2: Start Development Server with Network Access**

Run this command:
```powershell
npm run dev -- -H 0.0.0.0
```

Or add the hostname flag:
```powershell
npm run dev -- --hostname 0.0.0.0
```

You'll see:
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Network:      http://192.168.1.100:3000  ← This is your network URL!

 ✓ Ready in 2.5s
```

---

### **Step 3: Access from Other Devices**

On any device connected to the **same WiFi network**:

**On your phone/tablet browser:**
```
http://192.168.1.100:3000
```
(Replace with YOUR actual IP address)

**That's it!** 🎉

---

## 🔥 Method 2: Using ngrok (Access from Internet)

If you want to share with someone **NOT on your WiFi** (anywhere in the world):

### **Step 1: Install ngrok**

Download from: https://ngrok.com/download

Or install with npm:
```powershell
npm install -g ngrok
```

### **Step 2: Sign up for ngrok**

1. Go to: https://dashboard.ngrok.com/signup
2. Create free account
3. Copy your authtoken
4. Run:
   ```powershell
   ngrok authtoken YOUR_AUTH_TOKEN
   ```

### **Step 3: Start Your Dev Server**

In one PowerShell window:
```powershell
npm run dev
```

### **Step 4: Start ngrok**

In another PowerShell window:
```powershell
ngrok http 3000
```

You'll see:
```
Session Status                online
Account                       your-email@example.com
Version                       3.x.x
Region                        India (in)
Forwarding                    https://abc123.ngrok.io -> http://localhost:3000

Connections                   ttl     opn     rt1
                              0       0       0.00
```

**Copy the URL:** `https://abc123.ngrok.io`

### **Step 5: Share the URL**

Send `https://abc123.ngrok.io` to anyone!

**They can access your website from:**
- ✅ Their phone (anywhere)
- ✅ Their computer (anywhere)
- ✅ Any device with internet

**Pros:**
- Works from anywhere in the world
- Free HTTPS included
- No router configuration needed

**Cons:**
- URL changes every time you restart ngrok (free tier)
- Limited bandwidth on free tier

---

## 📱 Method 3: Quick Local Network Test

If you just want to test on your phone quickly:

### **Option A: Same WiFi, Use IP**

1. Start dev server:
   ```powershell
   npm run dev -- -H 0.0.0.0
   ```

2. Find your IP:
   ```powershell
   ipconfig
   ```

3. On phone browser:
   ```
   http://YOUR-IP:3000
   ```

### **Option B: QR Code**

1. Install qrcode-terminal:
   ```powershell
   npm install -g qrcode-terminal
   ```

2. Generate QR code with your IP:
   ```powershell
   qrcode-terminal "http://YOUR-IP:3000"
   ```

3. Scan with phone camera!

---

## 🔧 Troubleshooting

### **Can't Access from Other Device?**

**1. Check Firewall:**

Windows Firewall might be blocking. Allow Node.js:

```powershell
# Run as Administrator
New-NetFirewallRule -DisplayName "Node.js Dev Server" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow
```

Or manually:
1. Open Windows Defender Firewall
2. Advanced settings
3. Inbound Rules → New Rule
4. Port → TCP → 3000
5. Allow the connection

**2. Check if Server is Running:**

Make sure you see:
```
- Network:      http://192.168.1.100:3000
```

If you only see `localhost`, restart with:
```powershell
npm run dev -- -H 0.0.0.0
```

**3. Verify Same Network:**

Both devices must be on the same WiFi network!

Check on phone:
- Settings → WiFi → Connected network name

Check on computer:
- WiFi icon → Network name

Must match!

**4. Test Connection:**

From your phone, try pinging your computer:

Install a network tool app (e.g., "Ping Tools")
Ping: `192.168.1.100` (your IP)

If it works, your network is fine!

---

## 🎯 Quick Command Reference

### **Start with Network Access:**
```powershell
npm run dev -- -H 0.0.0.0
```

### **Find Your IP:**
```powershell
ipconfig | findstr IPv4
```

### **Allow Through Firewall (Admin):**
```powershell
New-NetFirewallRule -DisplayName "Node.js" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow
```

### **Start ngrok:**
```powershell
ngrok http 3000
```

---

## 📊 Comparison

| Method | Access From | Internet Required | Setup Time | Free |
|--------|-------------|-------------------|------------|------|
| **Network IP** | Same WiFi | No | 1 min | ✅ Yes |
| **ngrok** | Anywhere | Yes | 5 min | ✅ Yes |
| **Vercel Deploy** | Anywhere | Yes | 15 min | ✅ Yes |

---

## 💡 Recommendations

### **For Quick Testing (Same Room):**
→ Use Method 1 (Network IP)

### **For Showing Clients (Different Location):**
→ Use Method 2 (ngrok)

### **For Production/Real Deployment:**
→ Deploy to Vercel (see DEPLOY_TO_VERCEL_NOW.md)

---

## 🔒 Security Note

**For Local/ngrok Testing:**
- Don't share sensitive data
- Don't use real payment credentials
- ngrok URLs are temporary

**For Production:**
- Always deploy to Vercel with proper security
- Use environment variables
- Enable authentication for admin panel

---

## 📱 Test Checklist

Once accessible from other device:

- [ ] Home page loads
- [ ] Products page works
- [ ] Images display correctly
- [ ] Cart functionality works
- [ ] Navigation works
- [ ] Admin panel accessible
- [ ] Mobile responsive
- [ ] Smooth animations

---

## 🎉 Example Usage

### **Scenario 1: Test on Your Phone**

```powershell
# On computer:
npm run dev -- -H 0.0.0.0

# On phone browser:
http://192.168.1.100:3000
```

### **Scenario 2: Show Client**

```powershell
# Terminal 1:
npm run dev

# Terminal 2:
ngrok http 3000

# Send client the ngrok URL:
https://abc123.ngrok.io
```

### **Scenario 3: Production**

```
Deploy to Vercel (one time)
Share permanent URL:
https://jewellery.vercel.app
```

---

## ⚡ Quick Start Now

**Run this command:**

```powershell
npm run dev -- -H 0.0.0.0
```

**Then find your IP:**

```powershell
ipconfig | findstr IPv4
```

**Access from phone:**

```
http://YOUR-IP:3000
```

**Done!** 🎊

---

## 🆘 Still Not Working?

1. Restart your dev server with network flag
2. Check both devices on same WiFi
3. Disable VPN if using one
4. Try ngrok instead
5. Check firewall settings
6. Or just deploy to Vercel for permanent solution!

---

**Need permanent online access? Deploy to Vercel!**
See: DEPLOY_TO_VERCEL_NOW.md
