#!/usr/bin/env node

/**
 * Generate Placeholder Cover Images
 * Creates simple SVG placeholders for books without covers
 */

const fs = require('fs');
const path = require('path');

const BOOKS_FOLDER = path.join(__dirname, '..', 'src', 'assets', 'json', 'books');
const COVERS_FOLDER = path.join(__dirname, '..', 'src', 'assets', 'img', 'books');

// Read all book JSON files
const bookFiles = fs.readdirSync(BOOKS_FOLDER).filter(f => f.endsWith('.json'));

console.log(`🎨 Generating ${bookFiles.length} placeholder covers...\n`);

let created = 0;
let skipped = 0;

bookFiles.forEach(filename => {
    const bookPath = path.join(BOOKS_FOLDER, filename);
    const book = JSON.parse(fs.readFileSync(bookPath, 'utf8'));
    
    const coverFilename = book.image;
    const coverPath = path.join(COVERS_FOLDER, coverFilename);
    
    // Check if cover already exists
    if (fs.existsSync(coverPath)) {
        skipped++;
        return;
    }
    
    // Generate simple SVG placeholder
    const titleWords = book.title.split(' ').slice(0, 3).join('\n');
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="400" height="600" fill="#e5e7eb"/>
  
  <!-- Title text -->
  <text x="200" y="280" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#374151" text-anchor="middle" dominant-baseline="middle">
    ${titleWords}
  </text>
  
  <!-- Author -->
  <text x="200" y="340" font-family="Arial, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle">
    ${book.author}
  </text>
  
  <!-- Publisher -->
  <text x="200" y="550" font-family="Arial, sans-serif" font-size="12" fill="#9ca3af" text-anchor="middle">
    ${book.publisher}
  </text>
  
  <!-- Placeholder label -->
  <rect x="10" y="10" width="100" height="30" fill="#fbbf24" rx="5"/>
  <text x="60" y="30" font-family="Arial, sans-serif" font-size="10" fill="#78350f" text-anchor="middle" dominant-baseline="middle">
    PLACEHOLDER
  </text>
</svg>`;
    
    // Write SVG (will be converted to JPG later if needed)
    const svgPath = coverPath.replace('.jpg', '.svg');
    fs.writeFileSync(svgPath, svg);
    
    created++;
    console.log(`  ✅ ${book.title.substring(0, 40)}...`);
});

console.log(`\n✨ Done!`);
console.log(`   - Created: ${created} placeholders`);
console.log(`   - Skipped: ${skipped} (already exist)`);
console.log(`\n📝 Note: SVG placeholders created. Convert to JPG if needed.`);
