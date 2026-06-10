#!/bin/bash
# AJN Archive Player - Quick Start Script
# Installs dependencies, builds, and opens the player in your browser

set -e

echo "🚀 AJN Archive Player - Quick Start"
echo "===================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✓ Dependencies already installed"
fi

echo ""
echo "🔨 Building project..."
npm run build

echo ""
echo "🌐 Starting dev server..."
npm run dev &
DEV_PID=$!

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 3

# Detect OS and open browser accordingly
if command -v xdg-open > /dev/null; then
    # Linux
    xdg-open "http://localhost:5173/" &
elif command -v open > /dev/null; then
    # macOS
    open "http://localhost:5173/" &
else
    # Windows (PowerShell)
    start "http://localhost:5173/"
fi

echo ""
echo "✅ Player is loading at http://localhost:5173/"
echo ""
echo "📋 Features ready:"
echo "   ✓ No CORS errors"
echo "   ✓ Episodes list (right panel)"
echo "   ✓ Click to play videos"
echo "   ✓ Prev/Next navigation"
echo "   ✓ Date picker filter"
echo "   ✓ Sirius music stream"
echo "   ✓ Auto-play after music stops"
echo "   ✓ Service Worker (offline support)"
echo "   ✓ Offline caching"
echo ""
echo "🎮 Testing checklist in DevTools:"
echo "   1. Console → Check for CORS errors (should be none)"
echo "   2. Application → Service Workers → Should show registered"
echo "   3. Network → Filter '?url=' → Verify CORS headers"
echo "   4. Try going Offline → Reload → Playlist persists"
echo ""
echo "⌨️  Press Ctrl+C to stop the server"
echo ""

wait $DEV_PID
