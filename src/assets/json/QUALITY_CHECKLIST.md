# 📚 Checklist Kualitas Entry Buku

Gunakan checklist ini untuk memastikan setiap entry buku memenuhi standar kualitas sebelum dipublikasikan.

## Tabel Checklist Kualitas

| No | Kriteria | Status | Catatan |
|:--:|:---------|:------:|:--------|
| **A** | **INFORMASI DASAR** | | |
| A1 | Judul buku ditulis dengan benar (Title Case, tanpa typo) | ⬜ | |
| A2 | Nama penulis lengkap dan akurat (gelar akademik benar) | ⬜ | |
| A3 | Pretty URL sesuai format (lowercase, hyphen-separated) | ⬜ | |
| A4 | ID buku unik dan tidak duplikat | ⬜ | |
| **B** | **HARGA & DISKON** | | |
| B1 | Harga baru (price_new) dalam format RpXX.XXX | ⬜ | |
| B2 | Harga lama (price_old) dalam format RpXX.XXX atau "-" | ⬜ | |
| B3 | Diskon (%) dihitung dengan benar | ⬜ | |
| B4 | Konsistensi harga dengan sumber data | ⬜ | |
| **C** | **DESKRIPSI/SINOPSIS** | | |
| C1 | Deskripsi minimal 100 kata | ⬜ | |
| C2 | Deskripsi maksimal 200 kata | ⬜ | |
| C3 | Bahasa Indonesia yang baik dan benar | ⬜ | |
| C4 | Tidak ada typo atau kesalahan ejaan | ⬜ | |
| C5 | Menyoroti value proposition buku | ⬜ | |
| C6 | Target pembaca jelas | ⬜ | |
| C7 | Gaya bahasa menarik dan profesional | ⬜ | |
| C8 | Tidak mengandung placeholder ("-.", "Buku ...", dll) | ⬜ | |
| **D** | **SPESIFIKASI BUKU** | | |
| D1 | Penerbit tercantum dengan benar | ⬜ | |
| D2 | ISBN tercantum (atau "-" jika tidak ada) | ⬜ | |
| D3 | Bahasa buku tercantum | ⬜ | |
| D4 | Tanggal publikasi dalam format "Bulan Tahun" | ⬜ | |
| D5 | Jumlah halaman akurat | ⬜ | |
| D6 | Dimensi buku (panjang x lebar cm) | ⬜ | |
| D7 | Berat buku dalam kg | ⬜ | |
| D8 | Jenis cover (Soft Cover/Hard Cover) | ⬜ | |
| **E** | **ASSET GAMBAR** | | |
| E1 | File gambar cover tersedia (.jpg) | ⬜ | |
| E2 | Nama file gambar sesuai dengan pretty_url + .jpg | ⬜ | |
| E3 | Kualitas gambar baik (tidak blur, tidak pixelated) | ⬜ | |
| E4 | Ukuran gambar optimal untuk web (< 500KB ideal) | ⬜ | |
| E5 | Gambar tidak ada watermark atau border aneh | ⬜ | |
| **F** | **KATEGORI & FITUR** | | |
| F1 | is_featured diatur dengan benar (true/false) | ⬜ | |
| F2 | featured_order diisi jika is_featured = true | ⬜ | |
| F3 | is_stacked diatur dengan benar (true/false) | ⬜ | |
| F4 | stacked_priority diisi jika is_stacked = true | ⬜ | |
| **G** | **INTEGRITAS DATA** | | |
| G1 | Format JSON valid (tidak ada syntax error) | ⬜ | |
| G2 | Semua required fields terisi | ⬜ | |
| G3 | Tidak ada field yang null (kecuali allowed) | ⬜ | |
| G4 | Konsistensi format dengan entry lainnya | ⬜ | |
| G5 | Entry terdaftar di books.json (index) | ⬜ | |
| G6 | Entry terdaftar di books-index.json | ⬜ | |

---

## Status Checklist

| Status | Simbol | Keterangan |
|--------|--------|------------|
| ✅ | `✅` | Sudah terpenuhi |
| ⬜ | `⬜` | Belum diperiksa |
| ❌ | `❌` | Tidak terpenuhi |
| ⚠️ | `⚠️` | Perlu perhatian khusus |

---

## Skor Kualitas

Hitung skor kualitas berdasarkan checklist di atas:

```
Total Kriteria: 43
Terpenuhi: [X]
Tidak Terpenuhi: [Y]
Tidak Berlaku: [Z]

Skor = ((Terpenuhi) / (Total - Tidak Berlaku)) × 100%
```

### Kategori Skor

| Skor | Kategori | Tindakan |
|------|----------|----------|
| 90-100% | 🟢 **Excellent** | Siap publikasi |
| 75-89% | 🟡 **Good** | Perbaiki minor issue |
| 50-74% | 🟠 **Fair** | Perlu perbaikan signifikan |
| < 50% | 🔴 **Poor** | Harus direvisi total |

---

## Contoh Penggunaan

### Entry: "Belajar Mengenal Allah SWT Seri 2"

| No | Kriteria | Status | Catatan |
|:--:|:---------|:------:|:--------|
| A1 | Judul buku ditulis dengan benar | ✅ | |
| A2 | Nama penulis lengkap | ✅ | Dr. Rachmat Maulana, S.Sos., M.Si |
| C1 | Deskripsi minimal 100 kata | ✅ | 120 kata |
| C2 | Deskripsi maksimal 200 kata | ✅ | |
| E1 | File gambar cover tersedia | ✅ | belajar-mengenal-allah-swt-seri-2.jpg |
| ... | ... | ... | |

**Skor Akhir: 95%** 🟢 **Excellent** - Siap Publikasi

---

## Catatan Tambahan

1. **Prioritas Tinggi**: Kriteria A (Informasi Dasar), B (Harga), dan G (Integritas Data) harus 100% terpenuhi
2. **Review Berkala**: Lakukan review checklist setiap ada penambahan buku baru
3. **Version Control**: Simpan hasil checklist untuk tracking kualitas

---

*Dokumen ini dibuat untuk memastikan kualitas data buku di platform Pustaka*
