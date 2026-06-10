# AJN Archive Player – Complete Deployment Guide

A modern, self‑hosted video archive player for the AJN Hourly Feed.  
Uses **GitHub Pages** for static hosting, a **Cloudflare Worker** as a CORS proxy for the RSS feed, and a **Service Worker** for offline caching and instant updates.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Step 1: GitHub Pages – Static Frontend](#step-1-github-pages--static-frontend)
- [Step 2: Cloudflare Worker – CORS Proxy](#step-2-cloudflare-worker--cors-proxy)
- [Step 3: Service Worker – Caching & Updates](#step-3-service-worker--caching--updates)
- [Local Development](#local-development)
- [Troubleshooting](#troubleshooting)
- [Security Notes](#security-notes)

---

## Overview

The AJN Archive Player consists of three independent layers:

1. **Static frontend** (HTML/JS/CSS) – served by GitHub Pages.  
2. **CORS proxy** – a Cloudflare Worker that fetches the RSS feed and adds the required CORS headers.  
3. **Service Worker** – caches the frontend assets and the RSS feed, enabling offline play and instant updates when the feed changes.

All three components work together to deliver a reliable, fast, and censorship‑resistant archive player.

---

## Architecture
