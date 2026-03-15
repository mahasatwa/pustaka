import fitz  # PyMuPDF
import os

# Mapping PDF ke output filename (pretty_url + .jpg)
pdf_mapping = {
    "124. BUKU TOPENG - TOPENG KEHIDUPAN.pdf": "topeng-topeng-kehidupan.jpg",
    "126. DIBAWAH PUSARAN ENERGY kABAH aKU BERSUJUD.pdf": "dibawah-pusaran-energy-kabah.jpg",
    "127. BUKU Menggapai Kedamaian Perjalanan Spiritual umroh di Tanah Suci.pdf": "menggapai-kedamaian.jpg",
    "14. BUKU MENUA BERSAMA, SEHAT BERKAH HUSTNUL HOTIMAH.pdf": "menua-bersama.jpg",
    "141. Satpol PP Bertransformasi Strategi dan Tantangan Menuju Pelayanan Publik yang Profesional.pdf": "satpol-pp-bertransformasi.jpg",
    "15. BUKU Berani Memilih dengan Bijak Perjalanan Mengolah Rasa dan Fikir.pdf": "berani-memilih-dengan-bijak.jpg",
    "154. Buku Transformasi Manajemen Rumah Sakit Daerah Inovasi, Efisiensi, dan Pelayanan Berkelanjutan.pdf": "transformasi-manajemen-rumah-sakit-daerah.jpg",
    "17. BUYKU Slow Living di Tengah Hiruk Pikuk Modern SELESAI.pdf": "slow-living-di-tengah-hiruk-pikuk-modern.jpg",
    "179.BUKU_MIKRO_EKONOMI.pdf": "mikro-ekonomi.jpg",
    "180. BUKU JAGALAH KEYAKINANMU.pdf": "jagalah-keyakinanmu.jpg",
    "181. BUKU PILIHAN KARIER BAGI GENERASI GEN Z, INSPIRASI UNTUK WISUDAWAN.pdf": "pilihan-karier-bagi-generasi-gen-z.jpg",
    "183. BUKU BELAJAR MENYADARI SUARA BATIN.pdf": "dalam-hening-suara-batin-berbicara.jpg",
    "184. BUKU Menemukan Diri di Antara Kata.pdf": "filosofi-diri-dalam-kata.jpg",
    "185 BUKU FILOSOFI TANGAN.pdf": "filosofi-tangan.jpg",
    "186. BUKU MANAJEMEN RESKIKO DALAM PENGELOLAAN ORGANISASI.pdf": "manajemen-resiko.jpg",
    '187. BUKU 187. BUKU "Berlayar di Tengah Birokrasi".pdf': "berlayar-di-tengah-birokrasi.jpg",
    '189. BUKU "Warisan Intelektual Seorang ASN" (AutoRecovered).pdf': "warisan-intelektual-seorang-asn.jpg",
    "190 BUKU Membangun Kepercayaan Jamaah.pdf": "membangun-kepercayaan-jamaah.jpg",
    "197. BUKU MEMIMPIN TAMU ALLAH, TOUR LEADER BERKELAS.pdf": "memimpin-tamu-allah.jpg",
    "198. BUKU  UPSKILLING PESYIAR UMRAH & HAJI.pdf": "penguatan-kompetensi-pesyiar-umrah-dan-haji.jpg",
    "199. BUKU MENJADI MANUSIA DI TENGAH KEHIDUPAN.pdf": "menjadi-manusia-di-tengah-kehidupan.jpg",
    "20. BUKU PILIHAN KARIER UNTUK SLOW LIVING.pdf": "pilihan-karier-untuk-slow-living.jpg",
    "200. BUKU ADAB SEORANG TAMU ALLAH.pdf": "adab-seorang-tamu-allah.jpg",
    "205. BUKU. Manajemen Keberlanjutan.pdf": "manajemen-keberlanjutan.jpg",
    "21. BUKU Mengenal Ilmu Manajemen Panduan untuk Pemula.pdf": "mengenal-ilmu-manajemen.jpg",
    "215. BUKU PENGANTAR EKONOMI MAKRO.pdf": "pengantar-ekonomi-makro.jpg",
    "24-09-210-EBOOK Tiga Kuasa dalam Kehidupan.pdf": "tiga-kuasa-dalam-kehidupan.jpg",
    "24-09-211-EBOOK Saatnya untuk Berubah.pdf": "saatnya-untuk-berubah.jpg",
    "253 UL - PENGANTAR MANAJEMEN MEMBANGUN KETERAMPILAN - LB COVER.pdf": "membangun-keterampilan-untuk-masa-depan.jpg",
    "26. BUKU KEPEMIMPINAN BERKELANJUTAN.pdf": "kepemimpinan-berkelanjutan.jpg",
    "28. BUKU KEPEMIMPINAN PAMONG PRAJA.pdf": "kepemimpinan-pamong-praja.jpg",
    "36. BUKU MEMAHAMI NILAI NILAI KEHIDUPAN.pdf": "nilai-nilai-kehidupan.jpg",
    "44. BUKU PENGANTAR AKUNTANSI 1.pdf": "pengantar-akuntansi-1.jpg",
    "7. BUKU MENJAGA DAN MEWARISI NILAI - NILAI KEPAMONGPRAJAAN.pdf": "menjaga-dan-mewarisi-nilai-nilai-kepamongprajaan.jpg",
    "8. BUKU AKUNTANSI SEKTOR PUBLIK SELESAI.pdf": "akuntansi-sektor-publik.jpg",
    "BUKU 216. Pengembangan karier dan kesiapan kerja.pdf": "pengembangan-karier-dan-kesiapan-kerja.jpg",
    "BUKU AJAR BISNIS GLOBAL DAN GEOEKONOMI.pdf": "bisnis-global-dan-geoekonomi.jpg",
    "BUKU BERSIAP UNTUK DUNIA NYATA\"  INSPIRASI UNTUK WISUDAWAN selesai.pdf": "bersiap-untuk-dunia-nyata.jpg",
    "BUKU KEPEMIMPINAN DAN DAYA PENGARUH.pdf": "kepemimpinan-dan-daya-pengaruh.jpg",
    "BUKU MEMBANGUNKEPERCAYAAN DIRI SELESAI.pdf": "membangun-kepercayaan-diri.jpg",
    "BUKU MITIGASI KEBENCANAAN DI TINGKAT DAERAH.pdf": "membangun-daerah-tangguh-bencana.jpg",
    "BUKU ORGANISASI DAN MANAJEMEN.pdf": "organisasi-dan-manajemen.jpg",
    "BUKU PENSIUN. BAHAGIA ATAU MASALAH.pdf": "pensiun-bahagia-atau-masalah.jpg",
    "BUKU POLISI PAMONG PRAJA WIBAWA PEMDA.pdf": "pamong-praja.jpg",
    "BUKU. MEMIMPIN TANPA KEHILANGAN RASA KEMANUSIAAN.pdf": "memimpin-tanpa-kehilangan-rasa-kemanusiaan.jpg",
    "Bunga Rampai Manajemen Kehidupan Strategi Bijak Mengatur Hidup Sehari-hari.pdf": "bunga-rampai-manajemen-kehidupan-strategi-bijak-mengatur-hidup-sehari-hari.jpg",
    "ISU-ISU AKTUAL DALAM PEMBANGUNAN DAERAH DI INDONESIA MENUJU TATA KELOLA PEMBANGUNAN YANG BERKELANJUTAN.pdf": "isu-isu-aktual-dalam-pembangunan-daerah-di-indonesia.jpg",
    "MENJADI MANUSIA PEMBELAJAR ON PROGRESS.pdf": "menjadi-manusia-pembelajar.jpg",
    "PENGANTAR METODE PENELITIAN.pdf": "pengantar-metode-penelitian.jpg",
    "TETAP PRODUKTIF SETELAH PENSIUN.pdf": "tetap-produktif-setelah-pensiun.jpg",
    "Transformasi di Balik Api Kisah Perjuangan dan Pengabdian Brigade Pemadam Kebakaran.pdf": "transformasi-di-balik-api.jpg",
    "[NISA] 18. BUKU HANYA SATU KATA JANGAN MENYERAH.pdf": "hanya-satu-kata-jangan-menyerah.jpg",
    "[NISA] Membuat Hidup Menjadi Lebih Baik.pdf": "transformasi-diri-menjadi.jpg",
    "buku bersyukur engkau akan tenang.pdf": "bersyukurlah-maka-engkau-akan-tenang.jpg",
    "buku etika komunikasi bisnis SELESAI(1).pdf": "etika-komunikasi-bisnis-selesai1.jpg",
}

pdf_folder = "/Users/azimi.arsyad/Project/pustaka/src/assets/json/gambar"
output_folder = "/Users/azimi.arsyad/Project/pustaka/src/assets/img/books"

results = []
success_count = 0
error_count = 0

for pdf_file, output_file in pdf_mapping.items():
    try:
        pdf_path = os.path.join(pdf_folder, pdf_file)
        output_path = os.path.join(output_folder, output_file)
        
        if not os.path.exists(pdf_path):
            results.append(f"⚠️  {output_file} - PDF not found")
            error_count += 1
            continue
        
        # Buka PDF
        doc = fitz.open(pdf_path)
        
        # Ambil halaman pertama
        page = doc[0]
        
        # Render halaman pertama sebagai gambar (zoom 2x untuk kualitas baik)
        mat = fitz.Matrix(2, 2)
        pix = page.get_pixmap(matrix=mat)
        
        # Simpan sebagai JPG
        pix.save(output_path, output="jpeg")
        
        # Tutup PDF
        doc.close()
        
        # Dapatkan ukuran file
        file_size = os.path.getsize(output_path)
        
        results.append(f"✅ {output_file} - {file_size:,} bytes")
        success_count += 1
        
    except Exception as e:
        results.append(f"❌ {output_file} - Error: {str(e)}")
        error_count += 1

print("=" * 70)
print("=== HASIL EKSTRAKSI COVER DARI PDF ===")
print("=" * 70)
print()

for result in results:
    print(result)

print()
print("=" * 70)
print(f"✅ SUKSES: {success_count} file")
print(f"❌ ERROR: {error_count} file")
print("=" * 70)
