@echo off
REM AJN Archive Player - Quick Start Script (Windows)
REM Installs dependencies, builds, and opens the player in your browser

setlocal enabledelayedexpansion

echo.
echo 🚀 AJN Archive Player - Quick Start
echo ====================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
) else (
    echo ✓ Dependencies already installed
)

echo.
echo 🔨 Building project...
call npm run build

echo.
echo 🌐 Starting dev server...
start cmd /k "npm run dev"

REM Wait for server to start
echo ⏳ Waiting for server to start...
timeout /t 3 /nobreak

REM Open browser
start "http://localhost:5173/"

echo.
echo ✅ Player is loading at http://localhost:5173/
echo.
echo 📋 Features ready:
echo    ✓ No CORS errors
echo    ✓ Episodes list (right panel)
echo    ✓ Click to play videos
echo    ✓ Prev/Next navigation
echo    ✓ Date picker filter
echo    ✓ Sirius music stream
echo    ✓ Auto-play after music stops
echo    ✓ Service Worker (offline support)
echo    ✓ Offline caching
echo.
echo 🎮 Testing checklist in DevTools:
echo    1. Console → Check for CORS errors (should be none)
echo    2. Application → Service Workers → Should show registered
echo    3. Network → Filter '?url=' → Verify CORS headers
echo    4. Try going Offline → Reload → Playlist persists
echo.
echo ⌨️  Close the server window to stop
echo.
pause
