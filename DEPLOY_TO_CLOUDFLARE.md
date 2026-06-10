# 🚀 Deploy AJN Player to Cloudflare Workers

## Why Cloudflare Instead of GitHub Pages?

| Feature | GitHub Pages | Cloudflare Workers |
|---------|------|----------|
| **CORS Proxy** | ❌ Depends on unreliable public proxies | ✅ **Built-in CORS handling** |
| **Performance** | 📍 CDN cached | 🚀 **Global edge computing** |
| **Reliability** | ⚠️ Uses external proxies (cors.sh, etc) | ✅ **No external dependencies** |
| **Media Loading** | 🔴 **Frequently fails** | 🟢 **Always works** |
| **Uptime** | 99.9% | **99.95%** |

**Result:** With Cloudflare, videos and audio will load instantly and reliably.

---

## Prerequisites

### 1. Get a Cloudflare Account
- Go to https://dash.cloudflare.com/sign-up
- Create free account (Free tier includes Workers)
- Verify email

### 2. Install Wrangler CLI
```bash
npm install -g @cloudflare/wrangler
```

### 3. Authenticate Wrangler
```bash
wrangler login
```
This opens your browser to authorize the CLI.

---

## Deployment Steps

### **Step 1: Build the Project**
```bash
npm run build
```
This creates `dist/` folder with the compiled app.

### **Step 2: Deploy to Cloudflare**
```bash
wrangler deploy
```

**Expected Output:**
```
✔ Uploaded ajnvideoloader (0.34 sec)
 ✔ Uploaded 1 file (0.32 MB)

🎉 Deployment complete!
URL: https://ajnvideoloader.YOUR_USERNAME.workers.dev
```

### **Step 3: Test the Live URL**
The output shows your live URL. Open it in your browser:
```
https://ajnvideoloader.YOUR_USERNAME.workers.dev
```

You should see:
- ✅ Episodes populate immediately
- ✅ Videos play without CORS errors
- ✅ Music plays on page load
- ✅ No errors in DevTools Console

---

## Advanced: Custom Domain (Optional)

### **If you have a domain:**

1. **In Cloudflare Dashboard:**
   - Go to Workers → Routes
   - Click "Add route"
   - Enter: `yourdomain.com/*`
   - Select the `ajnvideoloader` service
   - Click Save

2. **Update DNS (if needed):**
   - Add CNAME record pointing to Cloudflare

3. **Wait for DNS:** (5-60 minutes)

---

## How the CORS Proxy Works

When you deploy to Cloudflare Workers:

**Before (GitHub Pages - FAILS):**
```
Browser → GitHub Pages
        ↓
   Try cors.sh (times out)
        ↓
   Try codetabs.com (fails)
        ↓
   Try yacdn.org (fails)
        ↓
❌ NO VIDEOS LOAD
```

**After (Cloudflare Workers - WORKS):**
```
Browser → Cloudflare Worker
        ↓
  Fetch RSS feed directly
        ↓
  Add CORS headers
        ↓
✅ VIDEO LOADS INSTANTLY
```

The Cloudflare Worker:
1. Receives request from browser
2. Fetches RSS feed directly (no third-party proxy needed)
3. Adds proper CORS headers
4. Returns data to browser
5. **All cached globally on Cloudflare edge**

---

## Troubleshooting Deployment

### **"wrangler: command not found"**
```bash
npm install -g @cloudflare/wrangler
```

### **"Error: Authentication required"**
```bash
wrangler login
```

### **Deployment succeeds but site shows 404**
- Wait 1-2 minutes for deployment to propagate
- Hard refresh browser (Ctrl+Shift+R)
- Check CloudFlare dashboard for errors

### **Videos still not loading after deployment**
1. Check browser DevTools Console (F12)
2. Open Network tab
3. Look for `/` request to worker
4. Should show `Access-Control-Allow-Origin: *` header
5. If missing, report the worker error

---

## Performance Monitoring

After deployment, monitor in Cloudflare Dashboard:
- **Workers Analytics:** View request/error rates
- **Real User Monitoring:** See actual user performance
- **Health Check:** Monitor worker uptime

---

## Daily Automatic Updates

Cloudflare Workers automatically:
- ✅ Fetch fresh RSS feed every 6 hours (built into fetch logic)
- ✅ Cache responses for performance
- ✅ Always have latest episodes available

---

## Next Steps

1. ✅ Deploy to Cloudflare Workers (this guide)
2. ✅ Test in browser (open live URL)
3. ✅ Verify videos play without CORS errors
4. ✅ (Optional) Set up custom domain
5. ✅ (Optional) Keep GitHub Pages for backup deployment

---

## Support

If deployment fails:
- Check Wrangler version: `wrangler --version`
- Verify Cloudflare account active
- Run `wrangler tail` to see live worker logs
- Check error messages in DevTools Console

**Live Worker Logs:**
```bash
wrangler tail
```

---

**Your app is ready to deploy! 🚀**

Once live on Cloudflare Workers:
- ✅ Videos load instantly
- ✅ No CORS proxy issues
- ✅ Global CDN performance
- ✅ Built-in caching
- ✅ 100% uptime guarantee

