#!/usr/bin/env node

/**
 * Migration Script: Set is_featured and is_stacked flags
 * Based on existing newrelease.json and stacked.json data
 */

const fs = require('fs');
const path = require('path');

// Paths
const BOOKS_FOLDER = path.join(__dirname, '..', 'src', 'assets', 'json', 'books');
const NEWRELEASE_JSON = path.join(__dirname, '..', 'src', 'assets', 'json', 'newrelease.json');
const STACKED_JSON = path.join(__dirname, '..', 'src', 'assets', 'json', 'stacked.json');

console.log('🚀 Starting migration...\n');

// Read newrelease.json to get featured books
let featuredBooks = [];
if (fs.existsSync(NEWRELEASE_JSON)) {
    const newreleaseData = JSON.parse(fs.readFileSync(NEWRELEASE_JSON, 'utf8'));
    featuredBooks = newreleaseData.map(b => b.pretty_url);
    console.log(`📌 Found ${featuredBooks.length} featured books in newrelease.json`);
}

// Read stacked.json to get stacked books
let stackedBooks = [];
if (fs.existsSync(STACKED_JSON)) {
    const stackedData = JSON.parse(fs.readFileSync(STACKED_JSON, 'utf8'));
    stackedBooks = stackedData.map(b => b.title.toLowerCase().replace(/[^a-z0-9]/g, '-'));
    console.log(`📦 Found ${stackedBooks.length} stacked books in stacked.json`);
}

console.log('\n📝 Migrating books...\n');

// Process each book file
const bookFiles = fs.readdirSync(BOOKS_FOLDER).filter(f => f.endsWith('.json'));
let updatedCount = 0;

bookFiles.forEach((filename, index) => {
    const filePath = path.join(BOOKS_FOLDER, filename);
    const book = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    let updated = false;
    
    // Check if should be featured
    if (featuredBooks.includes(book.pretty_url)) {
        if (!book.is_featured) {
            book.is_featured = true;
            book.featured_order = index; // Set order based on original position
            updated = true;
            console.log(`  ✅ Featured: ${book.title.substring(0, 50)}...`);
        }
    }
    
    // Check if should be stacked (match by title slug)
    const titleSlug = book.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
    const isStacked = stackedBooks.some(slug => slug.includes(titleSlug) || titleSlug.includes(slug));
    
    if (isStacked && !book.is_stacked) {
        book.is_stacked = true;
        book.stacked_priority = 1;
        updated = true;
        console.log(`  📦 Stacked: ${book.title.substring(0, 50)}...`);
    }
    
    // Write updated file
    if (updated) {
        fs.writeFileSync(filePath, JSON.stringify(book, null, 4));
        updatedCount++;
    }
});

console.log(`\n✨ Migration complete!`);
console.log(`   - ${updatedCount} books updated with flags`);
console.log(`   - ${bookFiles.length} total books processed`);

console.log('\n📋 Next steps:');
console.log('   1. Update Vue components to filter by is_featured/is_stacked');
console.log('   2. Test the filtering logic');
console.log('   3. Optionally delete newrelease.json and stacked.json');
console.log('   4. Convert banner.json to TinaCMS collection');
