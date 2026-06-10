# GitHub Pages Deployment Guide

## ✅ Setup Complete

Your AJN Archive Player is configured to deploy to GitHub Pages with **4 daily updates**.

---

## 📅 Update Schedule

| Time (UTC) | Time (US Eastern) | Time (US Pacific) |
|-----------|-------------------|-------------------|
| 00:00 UTC | 8:00 PM (prev day) | 5:00 PM (prev day) |
| 06:00 UTC | 2:00 AM | 11:00 PM (prev day) |
| 12:00 UTC | 8:00 AM | 5:00 AM |
| 18:00 UTC | 2:00 PM | 11:00 AM |

Plus automatic deployment whenever you push to `main` branch.

---

## 🚀 Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: Select **GitHub Actions** (not Deploy from branch)
4. Save

That's it! The workflow will automatically run.

---

## 📊 Monitor Deployments

1. Go to your repository
2. Click **Actions** tab
3. See "Deploy to GitHub Pages (4x Daily)" workflow runs
4. Each run shows:
   - ✅ Build status
   - ✅ Deployment time
   - 📍 Live URL

---

## 🔗 Your Live Site

Once enabled, your player will be live at:

```
https://banamine.github.io/ajnvideoloader/
```

(Or your custom domain if configured)

---

## 📝 What Gets Updated 4x Daily

- ✅ Latest episode list from RSS feed
- ✅ New videos added to playlist
- ✅ Offline cache refreshed
- ✅ All static assets optimized

---

## 🔄 How It Works

1. **GitHub Actions** runs on schedule (every 6 hours)
2. **Fetches latest code** from main branch
3. **Builds static site** with `npm run build`
4. **Uses public CORS proxy** (allorigins.win) for RSS feed
5. **Deploys to GitHub Pages** automatically
6. **Site goes live** in ~1-2 minutes

---

## 🛠️ Manual Trigger

To force a deployment right now:

1. Go to **Actions** → **Deploy to GitHub Pages (4x Daily)**
2. Click **Run workflow**
3. Select branch: **main**
4. Click **Run workflow**

Your site will rebuild and deploy immediately.

---

## 📱 Features Available

All 9 features work on GitHub Pages:

✅ No CORS errors (using allorigins.win as proxy)
✅ Episode list loads from RSS
✅ Click to play videos
✅ Prev/Next navigation
✅ Date picker filter
✅ Sirius music plays
✅ Auto-play video after music
✅ Service Worker (offline support)
✅ Offline caching works

---

## ⚙️ Customization

### Change Update Frequency

Edit `.github/workflows/deploy-pages.yml`:

```yaml
schedule:
  # Every 3 hours (8 times/day)
  - cron: '0 */3 * * *'
  
  # Every 4 hours (6 times/day)
  - cron: '0 */4 * * *'
  
  # Every 12 hours (2 times/day)
  - cron: '0 0,12 * * *'
```

### Use Different CORS Proxy

Edit the build step in workflow:
```yaml
env:
  VITE_CORS_PROXY: 'https://cors-anywhere.herokuapp.com/'
```

---

## 📊 Workflow File Location

`.github/workflows/deploy-pages.yml`

This workflow:
- ✅ Runs automatically 4x daily
- ✅ Runs on every push to main
- ✅ Can be manually triggered
- ✅ Deploys to GitHub Pages

---

## 🎯 Next Steps

1. ✅ Commit `.github/workflows/deploy-pages.yml`
2. ✅ Push to main branch
3. ✅ Go to Settings → Pages
4. ✅ Select "GitHub Actions" as source
5. ✅ Watch it deploy! 🚀

---

**Your site will be live and updating 4x daily!** 📡
