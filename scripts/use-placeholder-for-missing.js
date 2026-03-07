#!/usr/bin/env node

/**
 * Update books to use placeholder.jpg for missing covers
 */

const fs = require('fs');
const path = require('path');

const BOOKS_FOLDER = path.join(__dirname, '..', 'src', 'assets', 'json', 'books');
const COVERS_FOLDER = path.join(__dirname, '..', 'src', 'assets', 'img', 'books');

const bookFiles = fs.readdirSync(BOOKS_FOLDER).filter(f => f.endsWith('.json'));

console.log(`🔄 Updating books to use placeholder for missing covers...\n`);

let updated = 0;
let hasCover = 0;

bookFiles.forEach(filename => {
    const bookPath = path.join(BOOKS_FOLDER, filename);
    const book = JSON.parse(fs.readFileSync(bookPath, 'utf8'));
    
    const coverPath = path.join(COVERS_FOLDER, book.image);
    
    // Check if cover exists
    if (!fs.existsSync(coverPath)) {
        // Use placeholder
        book.image = 'placeholder.jpg';
        fs.writeFileSync(bookPath, JSON.stringify(book, null, 4));
        updated++;
        console.log(`  📝 ${book.title.substring(0, 50)}... → placeholder.jpg`);
    } else {
        hasCover++;
    }
});

console.log(`\n✨ Done!`);
console.log(`   - Updated to placeholder: ${updated} books`);
console.log(`   - Already have covers: ${hasCover} books`);
console.log(`\n📝 Note: You can replace placeholder.jpg with actual covers via TinaCMS admin`);
