#!/usr/bin/env node

/**
 * Split books.json array into individual JSON files
 * Each book becomes: src/assets/json/books/{pretty_url}.json
 */

const fs = require('fs');
const path = require('path');

// Paths
const BOOKS_JSON_PATH = path.join(__dirname, '..', 'src', 'assets', 'json', 'books.json');
const BOOKS_FOLDER_PATH = path.join(__dirname, '..', 'src', 'assets', 'json', 'books');
const INDEX_PATH = path.join(__dirname, '..', 'src', 'assets', 'json', 'books-index.json');

// Read books.json
console.log('📖 Reading books.json...');
const booksData = JSON.parse(fs.readFileSync(BOOKS_JSON_PATH, 'utf8'));

// Ensure books folder exists
if (!fs.existsSync(BOOKS_FOLDER_PATH)) {
    fs.mkdirSync(BOOKS_FOLDER_PATH, { recursive: true });
    console.log('📁 Created books folder');
}

// Clear existing files in books folder
const existingFiles = fs.readdirSync(BOOKS_FOLDER_PATH);
existingFiles.forEach(file => {
    if (file.endsWith('.json')) {
        fs.unlinkSync(path.join(BOOKS_FOLDER_PATH, file));
    }
});
console.log('🧹 Cleared existing book files');

// Split into individual files
const bookIndex = [];

booksData.forEach((book, index) => {
    // Create filename from pretty_url
    const filename = `${book.pretty_url}.json`;
    const filePath = path.join(BOOKS_FOLDER_PATH, filename);
    
    // Write individual book file
    fs.writeFileSync(filePath, JSON.stringify(book, null, 4));
    
    // Add to index
    bookIndex.push({
        slug: book.pretty_url,
        file: filename,
        title: book.title,
        author: book.author
    });
    
    console.log(`✅ ${index + 1}. ${book.title}`);
});

// Write index file
fs.writeFileSync(INDEX_PATH, JSON.stringify(bookIndex, null, 2));
console.log(`\n📑 Created books-index.json with ${bookIndex.length} entries`);

// Summary
console.log('\n✨ Migration complete!');
console.log(`   - ${bookIndex.length} books converted to individual files`);
console.log(`   - Location: src/assets/json/books/`);
console.log(`   - Index file: src/assets/json/books-index.json`);
console.log('\n📝 Next steps:');
console.log('   1. Update tina/config.ts');
console.log('   2. Update Vue components to load from folder');
console.log('   3. Test TinaCMS admin');
