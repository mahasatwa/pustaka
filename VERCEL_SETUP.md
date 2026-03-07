# Vercel Environment Variables Setup

## Required Environment Variables

Go to **Vercel Dashboard** → Select your project → **Settings** → **Environment Variables**

Add the following variables:

| Variable | Value | Environments |
|----------|-------|--------------|
| `TINA_CLIENT_ID` | `cfcd8404-b6cd-464d-99b7-892b8c8e56ac` | ✅ Production, ✅ Preview, ✅ Development |
| `TINA_TOKEN` | *(Get from Tina Cloud)* | ✅ Production, ✅ Preview, ✅ Development |

## How to Get TINA_TOKEN

1. Go to https://app.tina.io/projects/cfcd8404-b6cd-464d-99b7-892b8c8e56ac/configuration
2. Generate new tokens (if you haven't already)
3. Copy the **Content (Readonly)** token
4. Paste it as `TINA_TOKEN` in Vercel

## After Adding Variables

1. Click **Save**
2. Go to **Deployments**
3. Click **Redeploy** on the latest deployment

## Optional: Search Token

If you want search functionality:

| Variable | Value | Environments |
|----------|-------|--------------|
| `TINA_SEARCH_TOKEN` | *(Get from Tina Cloud)* | ✅ Production, ✅ Preview, ✅ Development |

---

**Note:** Never commit `.env` files with tokens to GitHub!
