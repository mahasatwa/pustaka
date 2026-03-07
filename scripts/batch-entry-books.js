#!/usr/bin/env node

/**
 * Batch Entry Script: Generate JSON entries from PDF filenames
 * Metadata akan di-extract dari filename, detail lengkap bisa di-update via TinaCMS
 */

const fs = require('fs');
const path = require('path');

// Paths
const BUKU_FOLDER = path.join(__dirname, '..', 'buku');
const BOOKS_FOLDER = path.join(__dirname, '..', 'src', 'assets', 'json', 'books');
const COVERS_FOLDER = path.join(__dirname, '..', 'src', 'assets', 'img', 'books');

// Get all PDF files
const pdfFiles = fs.readdirSync(BUKU_FOLDER)
  .filter(f => f.endsWith('.pdf'))
  .sort();

console.log(`📚 Found ${pdfFiles.length} PDF files\n`);

// Author default (bisa di-update via TinaCMS nanti)
const DEFAULT_AUTHOR = "Dr. Rachmat Maulana, M.Si.";
const DEFAULT_PUBLISHER = "Penerbit Dwimulya Pustaka";
const DEFAULT_PRICE = "Rp99.000";
const DEFAULT_PRICE_OLD = "Rp118.800";
const DEFAULT_DISCOUNT = "20%";

let created = 0;
let skipped = 0;

pdfFiles.forEach((pdfFile, index) => {
    try {
        // Parse filename
        // Example: "124. BUKU TOPENG - TOPENG KEHIDUPAN.pdf"
        const cleanName = pdfFile.replace('.pdf', '')
            .replace(/^[0-9]+\.?\s*/g, '') // Remove leading numbers
            .replace(/BUKU/gi, '') // Remove "BUKU"
            .replace(/_/g, ' ') // Replace underscores
            .replace(/\s+/g, ' ') // Normalize spaces
            .trim();

        // Generate pretty_url (slug)
        const prettyUrl = cleanName
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Normalize hyphens
            .substring(0, 100); // Limit length

        // Generate filename
        const jsonFilename = `${prettyUrl}.json`;
        const jsonPath = path.join(BOOKS_FOLDER, jsonFilename);

        // Check if already exists
        if (fs.existsSync(jsonPath)) {
            console.log(`⏭️  Skipped: ${cleanName.substring(0, 50)}... (already exists)`);
            skipped++;
            return;
        }

        // Generate cover filename
        const coverFilename = `${prettyUrl}.jpg`;
        const coverPath = path.join(COVERS_FOLDER, coverFilename);

        // Create book object
        const book = {
            id: index + 100, // Start from 100 to avoid conflict with existing
            title: cleanName,
            author: DEFAULT_AUTHOR,
            pretty_url: prettyUrl,
            price_new: DEFAULT_PRICE,
            price_old: DEFAULT_PRICE_OLD,
            discount: DEFAULT_DISCOUNT,
            image: coverFilename,
            description: `Buku "${cleanName}" - Publikasi terbaru dari Dwimulya Pustaka.`,
            publisher: DEFAULT_PUBLISHER,
            isbn: "-",
            language: "Indonesia",
            publication_date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
            pages: 200,
            dimensions: "15,5 x 24 cm",
            weight: "0.40 kg",
            cover: "Soft Cover",
            is_featured: false,
            featured_order: null,
            is_stacked: false,
            stacked_priority: null
        };

        // Write JSON file
        fs.writeFileSync(jsonPath, JSON.stringify(book, null, 4));

        // Create placeholder cover (user can replace later)
        // For now, just create a note file
        const notePath = coverPath.replace('.jpg', '_PLACEHOLDER.txt');
        fs.writeFileSync(notePath, 
`Cover placeholder untuk: ${cleanName}

Cara replace cover:
1. Extract halaman pertama PDF sebagai JPG
2. Compress ke <300KB (gunakan TinyPNG atau similar)
3. Rename ke: ${coverFilename}
4. Save ke folder: ${COVERS_FOLDER}
5. Update via TinaCMS admin jika perlu
`);

        console.log(`✅ Created: ${cleanName.substring(0, 50)}...`);
        created++;

    } catch (error) {
        console.error(`❌ Error processing ${pdfFile}:`, error.message);
    }
});

console.log(`\n✨ Batch entry complete!`);
console.log(`   - Created: ${created} books`);
console.log(`   - Skipped: ${skipped} books (already exist)`);
console.log(`   - Total: ${pdfFiles.length} PDFs`);

console.log('\n📋 Next steps:');
console.log('   1. Replace placeholder covers with actual PDF page extracts');
console.log('   2. Open TinaCMS admin to update book details');
console.log('   3. Set is_featured for books to show in New Releases');
console.log('   4. Commit and push to GitHub');
