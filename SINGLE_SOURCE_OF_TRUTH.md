# 📚 Single Source of Truth Implementation

## ✅ SELESAI - Reference-Based Architecture

Implementasi **Single Source of Truth** untuk data buku telah selesai. Sekarang semua section menggunakan data dari satu sumber: `src/assets/json/books/`

---

## 🎯 Apa yang Berubah

### **Sebelum:**
```
books.json (27 buku)
newrelease.json (4 buku - DUPLIKAT)
stacked.json (2 buku - DUPLIKAT)
banner.json (5 banners)
```

**Problem:**
- ❌ Data duplikat
- ❌ Update di 1 tempat, lupa tempat lain
- ❌ Risk inconsistency

---

### **Sesudah:**
```
books/ (27 files)
  ├── buku-a.json (is_featured: true, is_stacked: false)
  ├── buku-b.json (is_featured: true, is_stacked: true)
  └── buku-c.json (is_featured: false, is_stacked: false)

banner.json (TinaCMS editable)
```

**Keuntungan:**
- ✅ **Single Source of Truth** - Data hanya di 1 tempat
- ✅ **Auto-update** - Update sekali, semua section update
- ✅ **No duplication** - Tidak ada data duplikat
- ✅ **Visual editing** - Semua bisa edit di TinaCMS

---

## 📋 Fields Baru di Setiap Buku

### TinaCMS Schema ditambahkan 4 fields:

| Field | Type | Purpose | Example |
|-------|------|---------|---------|
| `is_featured` | Boolean | Tampilkan di New Releases section | `true` |
| `featured_order` | Number | Urutan di New Releases (lower = first) | `1` |
| `is_stacked` | Boolean | Tampilkan di Stacked promo section | `true` |
| `stacked_priority` | Number | Priority di Stacked (lower = higher) | `1` |

---

## 🎨 Cara Pakai di TinaCMS Admin

### 1. **Set Buku sebagai Featured (New Releases)**

1. Buka http://localhost:4001/admin
2. Click "Books"
3. Pilih buku yang mau di-featured
4. Scroll ke bawah
5. ✅ **Centang** "Featured in New Releases"
6. Isi "Featured Order" (misal: 1, 2, 3)
7. Click "Save"

**Otomatis muncul di Homepage → New Releases section!**

---

### 2. **Set Buku sebagai Stacked (Promo)**

1. Buka "Books" di admin
2. Pilih buku
3. ✅ **Centang** "Featured in Stacked Section"
4. Isi "Stacked Priority" (misal: 1 untuk prioritas tinggi)
5. Click "Save"

**Otomatis muncul di Banner → Stacked promo section!**

---

### 3. **Edit Banner Campaign**

1. Buka "Banners" di admin (collection baru!)
2. Pilih banner yang mau diedit
3. Update title, subtitle, image, dll
4. Click "Save"

**Otomatis update di homepage banner slider!**

---

## 🔄 Migration yang Dilakukan

### Script migration sudah dijalankan:
```bash
node scripts/migrate-featured-stacked.js
```

**Hasil:**
- ✅ 4 buku di-set `is_featured: true` (dari newrelease.json)
- ✅ 2 buku di-set `is_stacked: true` (dari stacked.json)
- ✅ Order/priority otomatis ter-set

### Buku yang sudah di-migrate:

**Featured (New Releases):**
1. Mengubah Mindset
2. Kuliah Sambil Kerja
3. Kecakapan Antar Personal
4. Bunga Rampai Manajemen Kehidupan

**Stacked (Promo):**
1. Kecakapan Antar Personal
2. Mengubah Mindset

---

## 🗑️ File yang Bisa Dihapus

Karena sekarang menggunakan reference-based approach, file-file ini **tidak diperlukan lagi**:

```bash
# Hapus file-file ini (backup dulu kalau perlu)
rm src/assets/json/newrelease.json
rm src/assets/json/stacked.json
```

**Components sudah di-update untuk tidak pakai file ini lagi!**

---

## 📊 Component Updates

### NewReleases.vue
```javascript
// BEFORE: Import dari newrelease.json
import books from '@/assets/json/newrelease.json';

// AFTER: Filter dari books folder
const allBooks = require.context('@/assets/json/books', false, /\.json$/);
const featuredBooks = allBooks
  .filter(book => book.is_featured === true)
  .sort((a, b) => (a.featured_order || 999) - (b.featured_order || 999));
```

### Banner.vue (Stacked Section)
```javascript
// BEFORE: Import dari stacked.json
import promos from '@/assets/json/stacked.json';

// AFTER: Filter dari books folder
const stackedBooks = allBooks
  .filter(book => book.is_stacked === true)
  .sort((a, b) => (a.stacked_priority || 999) - (b.stacked_priority || 999));
```

---

## 🚀 Workflow Baru

### Tambah Buku Baru ke Homepage:

**Cara lama:**
1. Edit books.json
2. Edit newrelease.json (duplikat data!)
3. Commit 2 file

**Cara baru:**
1. Add File di TinaCMS
2. Centang "Featured in New Releases"
3. Save
4. Commit 1 file

**Lebih simple, lebih aman!**

---

### Update Harga Buku:

**Cara lama:**
1. Edit books.json
2. Edit newrelease.json (kalau featured)
3. Edit stacked.json (kalau stacked)
4. Risk: Lupa update di 1 tempat

**Cara baru:**
1. Edit buku di TinaCMS
2. Save
3. DONE! Semua section otomatis update

**Tidak mungkin lupa!**

---

## 🎯 Scalability

Dengan architecture ini, mudah untuk menambah section baru:

### Contoh: Tambah "Best Sellers" Section

1. **Tambah field di tina/config.ts:**
```typescript
{
  type: 'boolean',
  name: 'is_best_seller',
  label: 'Best Seller',
},
{
  type: 'number',
  name: 'best_seller_rank',
  label: 'Rank',
},
```

2. **Buat component baru:**
```javascript
const bestSellers = allBooks
  .filter(book => book.is_best_seller === true)
  .sort((a, b) => (a.best_seller_rank || 999) - (b.best_seller_rank || 999));
```

3. **Set di TinaCMS admin** - centang checkbox "Best Seller"

**DONE!** Tidak perlu duplikasi data!

---

## 📁 File Structure Lengkap

```
src/assets/json/
├── books/                    # Single Source of Truth
│   ├── buku-a.json          # is_featured: true
│   ├── buku-b.json          # is_stacked: true
│   └── ... (27 files)
├── books-index.json         # Index untuk lookup
└── banner.json              # Campaign content (TinaCMS editable)

# Files yang bisa dihapus:
# - newrelease.json ❌
# - stacked.json ❌
```

---

## ✅ Testing Checklist

- [x] ✅ NewReleases.vue menampilkan 4 buku featured
- [x] ✅ Banner.vue menampilkan 2 buku stacked
- [x] ✅ TinaCMS admin bisa set is_featured checkbox
- [x] ✅ TinaCMS admin bisa set is_stacked checkbox
- [x] ✅ Banners collection tersedia untuk editing
- [x] ✅ Build sukses tanpa error
- [x] ✅ No data duplication
- [x] ✅ GitHub clean (no secrets)

---

## 🎉 Benefits Summary

| Aspect | Before | After |
|--------|--------|-------|
| Data duplication | ❌ 3 files | ✅ 1 file |
| Update consistency | ❌ Manual | ✅ Auto |
| Risk of inconsistency | ❌ High | ✅ None |
| Editing UX | ❌ JSON manual | ✅ Visual CMS |
| Scalability | ❌ Hard | ✅ Easy |
| New section addition | ❌ Complex | ✅ Simple |

---

**Last Updated:** March 7, 2026
**Status:** ✅ Production Ready - Single Source of Truth Implemented
