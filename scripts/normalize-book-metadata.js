const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, '..', 'src', 'assets', 'json');

const targets = [
  'newrelease.json',
  '.DS_Store',
  'books-index.json',
  'banner.json',
  'books/-manajemen-keberlanjutan.json',
  'books/transformasi-manajemen-rumah-sakit-daerah-inovasi-efisiensi-dan-pelayanan-berkelanjutan.json',
  'books/ekonomi-moneter.json',
  'books/buyku-slow-living-di-tengah-hiruk-pikuk-modern-selesai.json',
  'books/manajemen-pemasaran-1-konsep-strategi-inovasi.json',
  'books/menjadi-manusia-di-tengah-kehidupan.json',
  'books/pilihan-karier-untuk-slow-living.json',
  'books/bisnis-internasional-strategi-inovasi-keunngulan-kompetitif.json',
  'books/membangunkepercayaan-diri-selesai.json',
  'books/berani-memilih-dengan-bijak-perjalanan-mengolah-rasa-dan-fikir.json',
  'books/upskilling-pesyiar-umrah-haji.json',
  'books/hidup-bahagia-itu-sederhana-langkah-praktis-menemukannya.json',
  'books/akuntansi-sektor-publik-selesai.json',
  'books/pamong-praja-zaman-now-mengubah-cara-berpikir-mengubah-cara-memimpin.json',
  'books/menemukan-diri-di-antara-kata.json',
  'books/-09-210-ebook-tiga-kuasa-dalam-kehidupan.json',
  'books/manajemen-ritel.json',
  'books/nisa-18-hanya-satu-kata-jangan-menyerah.json',
  'books/kuliah-sambil-kerja-panduan-cerdas-untuk-mahasiswa.json',
  'books/memimpin-tamu-allah-tour-leader-berkelas.json',
  'books/filosofi-tangan.json',
  'books/kepemimpinan-berkelanjutan.json',
  'books/perjalanan-waktu-membawamu-kepada-nya.json',
  'books/jagalah-keyakinanmu.json',
  'books/magnetisme-kekuasaan-dominasi-dalam-dunia-modern.json',
  'books/isu-isu-aktual-dalam-pembangunan-daerah-di-indonesia-menuju-tata-kelola-pembangunan-yang-berkelanjut.json',
  'books/pengantar-metode-penelitian.json',
  'books/warisan-intelektual-seorang-asn-autorecovered.json',
  'books/ekonomi-syariah.json',
  'books/saat-tintaku-menemukan-cahaya.json',
  'books/mikro-ekonomi.json',
  'books/tetap-produktif-setelah-pensiun.json',
  'books/adab-seorang-tamu-allah.json',
  'books/mitigasi-kebencanaan-di-tingkat-daerah.json',
  'books/membangun-kepercayaan-jamaah.json',
  'books/jangan-lupa-tersenyum-bahagia-dimulai-dari-diri-sendiri.json',
  'books/kepemimpinan-pamong-praja.json',
  'books/topeng-topeng-kehidupan.json',
  'books/dasar-dasar-manajemen.json',
  'books/bunga-rampai-manajemen-kehidupan.json',
  'books/etika-komunikasi-bisnis-selesai1.json',
  'books/perencanaan-daerah-organisasi-pemerintah.json',
  'books/187-berlayar-di-tengah-birokrasi.json',
  'books/ajar-bisnis-global-dan-geoekonomi.json',
  'books/satpol-pp-bertransformasi-strategi-dan-tantangan-menuju-pelayanan-publik-yang-profesional.json',
  'books/-memimpin-tanpa-kehilangan-rasa-kemanusiaan.json',
  'books/manajemen-strategik.json',
  'books/bunga-rampai-manajemen-kehidupan-strategi-bijak-mengatur-hidup-sehari-hari.json',
  'books/memahami-nilai-nilai-kehidupan.json',
  'books/menggapai-kedamaian-perjalanan-spiritual-umroh-di-tanah-suci.json',
  'books/strategi-pemasaran-kontemporer.json',
  'books/menjadi-manusia-pembelajar-on-progress.json',
  'books/belajar-menyadari-suara-batin.json',
  'books/bersyukur-engkau-akan-tenang.json',
  'books/menjaga-dan-mewarisi-nilai-nilai-kepamongprajaan.json',
  'books/chemistry-customer-purchase-trust-loyalty.json',
  'books/-09-211-ebook-saatnya-untuk-berubah.json',
  'books/kepemimpinan-dan-daya-pengaruh.json',
  'books/pengantar-ekonomi-makro.json',
  'books/ekonomi-pembangunan-teori-implementasi.json',
  'books/dari-desa-untuk-indonesia.json',
  'books/bersiap-untuk-dunia-nyata-inspirasi-untuk-wisudawan-selesai.json',
  'books/manajemen-reskiko-dalam-pengelolaan-organisasi.json',
  'books/spritualisme-kepemimpinan.json',
  'books/pengantar-akuntansi-1.json',
  'books/-11-85-ebook-berdamai-dengan-keadaan.json',
  'books/seandainya-waktu-bisa-kembali.json',
  'books/sociopreneur-membangun-dampak-sosial-melalui-kewirausahaan-berbasis-nilai.json',
  'books/nisa-membuat-hidup-menjadi-lebih-baik.json',
  'books/merangkai-makna.json',
  'books/pokok-penyusunan-perencanaan-kinerja-daerah.json',
  'books/ul-pengantar-manajemen-membangun-keterampilan-lb-cover.json',
  'books/mengubah-mind-set-berfikir-menjadi-sosok-yang-tangguh.json',
  'books/mengenal-ilmu-manajemen-panduan-untuk-pemula.json',
  'books/organisasi-dan-manajemen.json',
  'books/menua-bersama-sehat-berkah-hustnul-hotimah.json',
  'books/216-pengembangan-karier-dan-kesiapan-kerja.json',
  'books/pensiun-bahagia-atau-masalah.json',
  'books/kecakapan-antar-personal.json',
  'books/pilihan-karier-bagi-generasi-gen-z-inspirasi-untuk-wisudawan.json',
  'books/kecakapan-antar-personal-pengembangan-soft-skill-intra-interpersonal.json',
  'books/dibawah-pusaran-energy-kabah-aku-bersujud.json',
  'books/organisasi-dan-manajemen-bisnis-konsep-praktik-tantangan-masa-depan.json',
  'books/polisi-pamong-praja-wibawa-pemda.json',
  'books/pesyiar-berkelas.json',
  'books/transformasi-di-balik-api-kisah-perjuangan-dan-pengabdian-brigade-pemadam-kebakaran.json',
  'books/mengalirkan-rezeki-membangun-jalan-kebebasan-finansial.json',
  'books/langkah-kecil-di-jalan-panjang.json'
];

function slugify(title){
    return title
      .toString()
      .toLowerCase()
      .normalize('NFKD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^[-0-9]+/, '')
      .replace(/^-+|-+$/g, '');
}

function cleanDescription(desc){
    if(!desc) return desc;
    let s = desc.toString().trim();
    s = s.replace(/^\s*["'\.-]+\s*/,'');
    s = s.replace(/-?\d{2,}[-A-Z0-9_\s]*EBOOK\b[:\s-]*/i,'');
    s = s.replace(/\s{2,}/g,' ');
    s = s.replace(/\s+\.$/,'');
    return s.charAt(0).toUpperCase()+s.slice(1);
}

const mappingById = {};

for(const rel of targets){
    const p = path.join(base, rel);
    if(!fs.existsSync(p)) continue;
    const stat = fs.statSync(p);
    if(stat.isDirectory()) continue;
    if(path.basename(p) === '.DS_Store') { fs.unlinkSync(p); console.log('Removed .DS_Store'); continue; }

    let content;
    try{ content = fs.readFileSync(p,'utf8'); }catch(e){ console.error('read error',p,e.message); continue; }
    let obj;
    try{ obj = JSON.parse(content); }catch(e){ console.log('Not JSON or top-level array, skipping',p); continue; }

    // If this is a book file (inside books/)
    if(rel.startsWith('books/')){
        const id = obj.id;
        const title = obj.title || path.basename(rel, '.json');
        const newSlug = slugify(title) || ('book-'+id);
        const newFilename = newSlug + '.json';
        const newRelPath = path.join('books', newFilename);
        const newPath = path.join(base, newRelPath);

        obj.pretty_url = newSlug;
        obj.description = cleanDescription(obj.description);
        if(!obj.publisher || ['cv','oleh','-'].includes((obj.publisher||'').toLowerCase())) obj.publisher = 'Penerbit Dwimulya Pustaka';

        // write file
        fs.writeFileSync(newPath, JSON.stringify(obj, null, 4), 'utf8');
        console.log('Wrote', newRelPath);
        // remove old if different
        if(path.resolve(newPath) !== path.resolve(p)){
            try{ fs.unlinkSync(p); console.log('Deleted', rel); }catch(e){console.warn('Could not delete',p,e.message);} 
        }

        mappingById[id] = { slug: newSlug, file: newRelPath };
    }
}

// Update books-index.json
try{
    const idxPath = path.join(base,'books-index.json');
    const idx = JSON.parse(fs.readFileSync(idxPath,'utf8'));
    let changed = false;
    for(const e of idx){
        if(e && e.file){
            // try to find by matching old filenames that started with '-'
            const orig = e.file;
            // find mapping by matching id in mappingById if available
            const match = Object.values(mappingById).find(m=> m.file.endsWith(path.basename(orig)));
            if(match){
                e.file = path.basename(match.file);
                e.slug = match.slug;
                changed = true;
            } else {
                // also try by slug mismatch (leading hyphen cases)
                if(e.slug && e.slug.startsWith('-')){
                    const newSlug = e.slug.replace(/^-+/, '');
                    e.slug = newSlug;
                    e.file = e.file.replace(/^-+/, '');
                    changed = true;
                }
            }
        }
    }
    if(changed) fs.writeFileSync(idxPath, JSON.stringify(idx, null, 2), 'utf8');
    console.log('Updated books-index.json');
}catch(e){ console.warn('Could not update books-index.json', e.message); }

// Update books.json top-level array by id
try{
    const booksPath = path.join(base,'books.json');
    const arr = JSON.parse(fs.readFileSync(booksPath,'utf8'));
    let changed = false;
    for(const item of arr){
        if(item && mappingById[item.id]){
            item.pretty_url = mappingById[item.id].slug;
            changed = true;
        }
        // clean publisher same rule
        if(!item.publisher || ['cv','oleh','-'].includes((item.publisher||'').toLowerCase())){
            item.publisher = 'Penerbit Dwimulya Pustaka';
            changed = true;
        }
        if(item.description) {
            const cleaned = cleanDescription(item.description);
            if(cleaned !== item.description){ item.description = cleaned; changed = true; }
        }
    }
    if(changed) fs.writeFileSync(booksPath, JSON.stringify(arr, null, 4), 'utf8');
    console.log('Updated books.json');
}catch(e){ console.warn('Could not update books.json', e.message); }

// Update newrelease.json (entries may have pretty_url)
try{
    const nrPath = path.join(base,'newrelease.json');
    const nr = JSON.parse(fs.readFileSync(nrPath,'utf8'));
    let changed = false;
    for(const item of nr){
        if(item && mappingById[item.id]){ item.pretty_url = mappingById[item.id].slug; changed = true; }
        if(!item.publisher || ['cv','oleh','-'].includes((item.publisher||'').toLowerCase())){ item.publisher='Penerbit Dwimulya Pustaka'; changed = true; }
        if(item.description){ const c = cleanDescription(item.description); if(c!==item.description){ item.description=c; changed=true; } }
    }
    if(changed) fs.writeFileSync(nrPath, JSON.stringify(nr, null, 4), 'utf8');
    console.log('Updated newrelease.json');
}catch(e){ console.warn('Could not update newrelease.json', e.message); }

console.log('Normalization completed. Mapping sample:', Object.entries(mappingById).slice(0,10));
