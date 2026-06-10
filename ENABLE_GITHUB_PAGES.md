# 🚀 GitHub Pages Setup - Enable Your Live Player

## ✅ Everything is Committed!

Your AJN Archive Player is ready for GitHub Pages with **4x daily updates**.

---

## 🎯 Enable GitHub Pages (3 Simple Steps)

### **Step 1: Go to Repository Settings**
1. Open your repository: https://github.com/banamine/ajnvideoloader
2. Click **Settings** (gear icon at top)
3. Scroll left sidebar, find **Pages**

### **Step 2: Configure GitHub Pages**
1. Under "Build and deployment"
2. **Source** dropdown → Select **GitHub Actions** (NOT "Deploy from branch")
3. That's it! GitHub Pages will recognize the workflow automatically

### **Step 3: Wait for Deployment**
1. Go to **Actions** tab
2. You should see "Deploy to GitHub Pages (4x Daily)" running
3. Wait 1-2 minutes for it to complete
4. When green ✅ → Your site is LIVE!

---

## 🌐 Your Live Site URL

Once deployed, visit:

```
https://banamine.github.io/ajnvideoloader/
```

That's your live player! 🎬

---

## 📊 Update Schedule

| When | What |
|------|------|
| **Every 6 hours** | Automatic rebuild & deployment (4x/day) |
| **Every push** | Automatic rebuild & deployment to main |
| **Manual** | Go to Actions → Run workflow anytime |

**Times (UTC):**
- 00:00 (Midnight)
- 06:00 (6 AM)
- 12:00 (Noon)
- 18:00 (6 PM)

---

## ✨ Features on GitHub Pages

All 9 features work perfectly:

✅ **No CORS errors** — Uses public proxy (allorigins.win)
✅ **Episodes load** — From RSS feed
✅ **Click to play** — Videos work
✅ **Prev/Next buttons** — Navigation works
✅ **Date picker** — Filters by day
✅ **Sirius music** — Plays automatically
✅ **Stop & play** — Video auto-starts after music
✅ **Service Worker** — Offline caching works
✅ **Offline mode** — Playlist persists when disconnected

---

## 🔄 Monitoring Deployments

### Check Deployment Status:
1. Go to **Actions** tab
2. Click "Deploy to GitHub Pages (4x Daily)"
3. See all past runs
4. Click any run to see:
   - Build logs
   - Deployment time
   - Any errors

### Trigger Manual Deployment:
1. Go to **Actions**
2. Click "Deploy to GitHub Pages (4x Daily)"
3. Click **Run workflow**
4. Select **main** branch
5. Click **Run workflow**
6. Site rebuilds in ~1-2 minutes!

---

## 📝 Workflow Details

**File Location:** `.github/workflows/deploy-pages.yml`

**What it does:**
- Installs dependencies (`npm ci`)
- Builds static site (`npm run build`)
- Uploads to GitHub Pages
- Deploys automatically

**When it runs:**
- On schedule: Every 6 hours ⏰
- On push to main: Immediately 🚀
- Manually: Anytime you want 🎮

---

## 🛠️ Customization

### Change Update Frequency

Edit `.github/workflows/deploy-pages.yml`:

**Every 3 hours (8x/day):**
```yaml
- cron: '0 */3 * * *'
```

**Every 4 hours (6x/day):**
```yaml
- cron: '0 */4 * * *'
```

**Every 12 hours (2x/day):**
```yaml
- cron: '0 0,12 * * *'
```

Then push and it automatically takes effect!

---

## 🎯 Quick Checklist

- [ ] Go to Settings → Pages
- [ ] Select "GitHub Actions" as source
- [ ] Wait for Actions to finish
- [ ] Visit https://banamine.github.io/ajnvideoloader/
- [ ] Test features (play video, offline mode, date picker)
- [ ] Check DevTools → Application → Service Workers (should show registered)

---

## 🚨 Troubleshooting

### "GitHub Pages not building"
→ Check **Settings → Pages** and make sure "GitHub Actions" is selected

### "Videos not loading"
→ Check browser console for errors (should be none with public proxy)

### "Want to change update schedule"
→ Edit `.github/workflows/deploy-pages.yml` and push (changes take effect immediately)

### "Want to force an update now"
→ Go to Actions → Run workflow → Select main → Run workflow

---

## 📡 How It Works

```
Every 6 hours / On push to main:
    ↓
GitHub Actions triggered
    ↓
Install dependencies (npm ci)
    ↓
Build static site (npm run build)
    ↓
Upload to GitHub Pages
    ↓
Deploy automatically
    ↓
Your site is LIVE at: https://banamine.github.io/ajnvideoloader/
    ↓
Service Worker caches content
    ↓
Offline access works!
```

---

**You're all set! 🎉 Your AJN Archive Player is now a live, auto-updating GitHub Pages site!**

Need help? Check the Actions tab to see deployment logs.
