# Local Editing dengan TinaCMS

## 🚀 Cara Edit Konten di Local

### Option 1: Run TinaCMS + Vue Concurrently (Recommended)

```bash
npm run dev
```

Ini akan menjalankan:
- ✅ TinaCMS dev server di `http://localhost:4001`
- ✅ Vue dev server di `http://localhost:8080`

**Buka browser:**
- Website: http://localhost:8080
- CMS Editor: http://localhost:4001/admin

### Option 2: Run TinaCMS Saja

```bash
npm run tina
```

Lalu buka: http://localhost:4001/admin

---

## 📝 Workflow Edit Konten

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Buka admin panel:**
   - Go to: http://localhost:4001/admin

3. **Edit konten:**
   - Navigate ke "Books" collection
   - Pilih buku yang mau diedit
   - Update konten di form
   - Click "Save"

4. **Commit perubahan:**
   ```bash
   git add src/assets/json/books.json
   git commit -m "Update buku X"
   git push origin main
   ```

5. **Vercel akan auto-deploy** dengan perubahan baru

---

## 🔧 Environment Variables

File `.env` sudah ada dan **tidak akan di-commit ke GitHub**:

```
TINA_CLIENT_ID=cfcd8404-b6cd-464d-99b7-892b8c8e56ac
TINA_TOKEN=3852b2180002f4ef455d5e901671063537a8be36
TINA_SEARCH_TOKEN=36a949379671644c1312a0d07d512e5878f6cd2d
```

### Jika Token Expired:

1. Go to: https://app.tina.io/projects/cfcd8404-b6cd-464d-99b7-892b8c8e56ac/configuration
2. Generate new token
3. Update di `.env`

---

## 🛠️ Troubleshooting

### Problem: "Branch 'main' is not on TinaCloud"

**Solusi:**
- Pastikan token valid di `.env`
- Pastikan branch `main` ada di GitHub
- Run: `git push origin main`

### Problem: "Cannot find module '@tinacms/cli'"

**Solusi:**
```bash
npm install
```

### Problem: Admin 404 di localhost

**Solusi:**
- Pastikan `npm run tina` running
- Tunggu sampai muncul "Tina Dev Server ready"
- Akses via http://localhost:4001/admin (bukan port 8080)

---

## 📦 Scripts

| Command | Deskripsi |
|---------|-----------|
| `npm run dev` | Run TinaCMS + Vue concurrently (RECOMMENDED) |
| `npm run tina` | Run TinaCMS dev server only |
| `npm run serve` | Run Vue dev server only |
| `npm run tina:build` | Build TinaCMS admin untuk production |
| `npm run build` | Build Vue app untuk production |

---

**Happy Editing! 🎉**
