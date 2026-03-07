# TinaCMS + Vercel Deployment Guide

## 📋 Overview

Dokumentasi ini menjelaskan cara setup TinaCMS agar bisa edit konten langsung dari Vercel tanpa perlu run dev server di local.

## ⚠️ IMPORTANT: Tina Cloud Requirement

**TinaCMS modern memerlukan Tina Cloud token untuk build.** Ada 2 opsi:

### Opsi A: Tina Cloud (Recommended - Free Tier Available)
- ✅ Build static admin UI
- ✅ Edit langsung dari Vercel
- ✅ Auto-commit ke GitHub
- 🆓 Free tier: 1 user, unlimited content

### Opsi B: Local Editing Only
- ❌ Tidak bisa edit dari Vercel
- ✅ Edit hanya di local via `npm run tina`
- ✅ Commit manual ke GitHub

---

## 🏗️ Arsitektur (Opsi A - Tina Cloud)

```
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL PRODUCTION                        │
│                                                             │
│  ┌─────────────────┐         ┌─────────────────────────┐   │
│  │   Vue 3 App     │         │    /admin (TinaCMS)     │   │
│  │   (Your Site)   │         │    (Static Admin UI)    │   │
│  │                 │         │                         │   │
│  │  /              │         │  Edit konten → Save     │   │
│  │  /books/:slug   │         │  → Commit ke GitHub     │   │
│  └─────────────────┘         └─────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Auto-trigger
                              ▼
                       ┌─────────────────┐
                       │   GitHub Repo   │
                       │   (main branch) │
                       └─────────────────┘
                              │
                              │ Webhook
                              ▼
                       ┌─────────────────┐
                       │   Vercel Build  │
                       │   (Auto-deploy) │
                       └─────────────────┘
```

## 🔧 Setup Awal

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Setup Tina Cloud Account (REQUIRED)

**Untuk bisa build admin dan edit dari Vercel, Anda perlu Tina Cloud token:**

1. **Buka https://app.tina.io/register**
   - Login dengan GitHub
   - Create account (free)

2. **Create New Project**
   - Click "Create New Project"
   - Pilih repository GitHub Anda
   - Branch: `main`

3. **Get Your Credentials**
   - Setelah project dibuat, Anda akan mendapatkan:
     - **Client ID** (sudah ada: `cfcd8404-b6cd-464d-99b7-892b8c8e56ac`)
     - **Token** (generate baru di Tina Cloud dashboard)

4. **Update Environment Variables**
   - Copy `.env.example` ke `.env`:
   ```bash
   cp .env.example .env
   ```
   - Paste token Anda di `.env`:
   ```
   TINA_CLIENT_ID=cfcd8404-b6cd-464d-99b7-892b8c8e56ac
   TINA_TOKEN=<paste-your-token-here>
   ```

### Step 3: Build TinaCMS Admin

Sebelum deploy ke Vercel, build admin UI terlebih dahulu:

```bash
npm run tina:build
```

Ini akan generate static files di folder `admin/`.

### 4. Commit Admin Folder

```bash
git add admin/
git commit -m "Add TinaCMS admin build"
git push origin main
```

## 🚀 Deploy ke Vercel

### Langkah 1: Connect ke Vercel

1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub
3. Click "Add New Project"
4. Import repository GitHub Anda

### Langkah 2: Setup Environment Variables di Vercel

Di Vercel Dashboard, pergi ke **Settings → Environment Variables**:

| Name | Value | Environment |
|------|-------|-------------|
| `TINA_CLIENT_ID` | `cfcd8404-b6cd-464d-99b7-892b8c8e56ac` | Production, Preview, Development |

### Langkah 3: Build Settings

Vercel akan otomatis detect `vercel.json` dan menggunakan:

```json
{
  "buildCommand": "npm run vercel:build",
  "outputDirectory": "dist"
}
```

### Langkah 4: Deploy

Click "Deploy" dan tunggu build selesai.

## ✏️ Cara Edit Konten dari Vercel

### Opsi 1: Edit via Admin UI (Recommended)

1. **Akses Admin Panel**
   - Buka `https://your-domain.vercel.app/admin/`
   - Anda akan melihat TinaCMS interface

2. **Login (jika diperlukan)**
   - Saat ini tidak ada authentication (Git-based mode)
   - Edit langsung tersedia

3. **Edit Konten**
   - Navigate ke "Books" collection
   - Pilih buku yang ingin diedit
   - Update konten di form
   - Click "Save"

4. **Commit Perubahan**
   - Setelah save, perubahan akan di-commit ke GitHub
   - Vercel akan auto-trigger rebuild
   - Tunggu 1-2 menit untuk deploy

### Opsi 2: Edit via GitHub (Manual)

1. Buka repository GitHub
2. Edit file `src/assets/json/books.json`
3. Commit changes
4. Vercel akan auto-rebuild

## 🔐 Authentication (Optional)

Jika ingin menambahkan authentication ke `/admin`:

### Menggunakan Basic Auth di Vercel

1. Install middleware di project:
```bash
npm install @vercel/edge-middleware
```

2. Buat file `vercel/middleware.ts`:
```typescript
import { verify } from '@vercel/edge-middleware'

export default verify((req) => {
  const auth = req.headers.get('authorization')
  if (!auth || auth !== `Basic ${btoa('username:password')}`) {
    return new Response('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic' }
    })
  }
})
```

## 🛠️ Troubleshooting

### Problem: Admin 404 di Vercel

**Solusi:**
```bash
# Rebuild admin
npm run tina:build

# Commit dan push
git add admin/
git commit -m "Rebuild admin"
git push
```

### Problem: Perubahan tidak tersimpan

**Penyebab:** TinaCMS Git-based butuh commit access.

**Solusi:**
- Pastikan menggunakan GitHub authentication
- Atau gunakan Tina Cloud dengan token

### Problem: Build Failed di Vercel

**Solusi:**
1. Check build logs di Vercel Dashboard
2. Pastikan `TINA_CLIENT_ID` ada di Environment Variables
3. Run local build test: `npm run vercel:build`

## 📦 Scripts Reference

| Script | Deskripsi |
|--------|-----------|
| `npm run serve` | Run dev server (local) |
| `npm run tina` | Run TinaCMS dev server |
| `npm run tina:build` | Build TinaCMS admin UI |
| `npm run build` | Build Vue app untuk production |
| `npm run build:all` | Build admin + Vue app |
| `npm run vercel:build` | Build command untuk Vercel |

## 🎯 Best Practices

1. **Selalu build admin sebelum deploy:**
   ```bash
   npm run tina:build && git add admin/ && git commit -m "Update admin"
   ```

2. **Test local sebelum push:**
   ```bash
   npm run build:all
   ```

3. **Backup konten sebelum edit besar:**
   - Download `books.json` dari GitHub
   - Atau gunakan Git history untuk rollback

4. **Monitor Vercel deployments:**
   - Check status di Vercel Dashboard
   - Rollback jika ada masalah

---

## 🔄 ALTERNATIF: Workflow Tanpa Tina Cloud (Manual)

Jika tidak ingin menggunakan Tina Cloud, gunakan workflow manual:

### Edit Konten Manual via GitHub

1. **Edit File di GitHub**
   - Buka repository GitHub
   - Navigate ke `src/assets/json/books.json`
   - Click edit icon (pencil)

2. **Update Konten**
   - Edit JSON langsung di GitHub
   - Atau upload file JSON baru

3. **Commit Changes**
   - Write commit message
   - Click "Commit changes"

4. **Vercel Auto-Deploy**
   - Vercel akan detect push ke GitHub
   - Auto-build dan deploy
   - Tunggu 1-2 menit

### Keuntungan Workflow Manual:
- ✅ Tidak perlu Tina Cloud token
- ✅ Tidak perlu setup account
- ✅ 100% free

### Kekurangan:
- ❌ Tidak ada visual editor (harus edit JSON manual)
- ❌ Lebih rawan error (harus format JSON benar)
- ❌ Tidak ada preview sebelum commit

---

## 🎯 Comparison: Tina Cloud vs Manual

| Feature | Tina Cloud | Manual (GitHub) |
|---------|-----------|-----------------|
| Visual Editor | ✅ Yes | ❌ No (JSON only) |
| Edit dari Vercel | ✅ Yes | ❌ No |
| Free | ✅ Yes (1 user) | ✅ Yes |
| Setup Complexity | Medium | Easy |
| Risk of JSON Error | Low | High |
| Preview Before Commit | ✅ Yes | ❌ No |
| Auto-deploy | ✅ Yes | ✅ Yes |

**Recommendation:** 
- Gunakan **Tina Cloud** jika ingin visual editor yang mudah
- Gunakan **Manual** jika okay edit JSON dan ingin setup simple

---

## 📞 Support

- TinaCMS Docs: https://tina.io/docs/
- Vercel Docs: https://vercel.com/docs/
- Vue CLI: https://cli.vuejs.org/

---

**Last Updated:** March 2026
