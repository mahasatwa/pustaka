<template>
    <section class="py-8 bg-gray-50 min-h-screen">
        <div class="container mx-auto px-4">
            <!-- Header -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Semua Buku</h1>
                    <p class="text-gray-600 text-sm">{{ filteredBooks.length }} buku ditemukan</p>
                </div>
                <router-link to="/"
                    class="text-blue-600 hover:text-blue-700 text-sm flex items-center transition duration-200"
                    aria-label="Kembali ke beranda">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke Beranda
                </router-link>
            </div>

            <!-- Search & Filter Bar -->
            <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <!-- Search -->
                    <div class="relative">
                        <input 
                            v-model="searchQuery" 
                            type="text" 
                            placeholder="Cari judul atau penulis..." 
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            aria-label="Cari buku"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            class="h-5 w-5 absolute right-3 top-3 text-gray-400" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <!-- Sort -->
                    <div>
                        <select 
                            v-model="sortBy" 
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            aria-label="Urutkan buku">
                            <option value="default">Urutkan: Default</option>
                            <option value="title-asc">Judul: A-Z</option>
                            <option value="title-desc">Judul: Z-A</option>
                            <option value="author-asc">Penulis: A-Z</option>
                            <option value="price-asc">Harga: Terendah</option>
                            <option value="price-desc">Harga: Tertinggi</option>
                        </select>
                    </div>

                    <!-- Items per page -->
                    <div>
                        <select 
                            v-model.number="itemsPerPage" 
                            @change="currentPage = 1"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            aria-label="Jumlah buku per halaman">
                            <option :value="12">12 per halaman</option>
                            <option :value="24">24 per halaman</option>
                            <option :value="48">48 per halaman</option>
                            <option :value="books.length">Semua</option>
                        </select>
                    </div>
                </div>

                <!-- Clear Filter Button -->
                <button 
                    v-if="searchQuery || sortBy !== 'default'"
                    @click="resetFilters"
                    class="mt-3 text-sm text-red-600 hover:text-red-700 flex items-center transition"
                    aria-label="Reset filter">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reset Filter
                </button>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="text-center py-16">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p class="text-gray-600 mt-4">Memuat buku...</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="filteredBooks.length === 0" class="text-center py-16 bg-white rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">Buku tidak ditemukan</h3>
                <p class="text-gray-500 mb-4">Coba gunakan kata kunci lain atau reset filter</p>
                <button 
                    @click="resetFilters"
                    class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Reset Filter
                </button>
            </div>

            <!-- Grid Buku -->
            <div v-else class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                <article 
                    v-for="book in paginatedBooks" 
                    :key="book.id"
                    class="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                    <router-link :to="`/book/${book.pretty_url}`" class="flex-1 flex flex-col">
                        <!-- Gambar Buku -->
                        <div class="relative overflow-hidden bg-gray-100">
                            <img 
                                :src="resolveImage(book.image)" 
                                :alt="`Cover buku ${book.title} karya ${book.author}`"
                                class="w-full h-48 md:h-64 object-cover transition-transform duration-300 hover:scale-105"
                                loading="lazy"
                                @error="handleImageError"
                            />
                            <!-- Badge Diskon -->
                            <div v-if="book.discount" class="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                                {{ book.discount }}
                            </div>
                        </div>

                        <!-- Konten Buku -->
                        <div class="p-3 md:p-4 flex-1 flex flex-col">
                            <h3 class="font-bold text-sm md:text-base line-clamp-2 h-10 md:h-12 mb-2">
                                {{ book.title }}
                            </h3>
                            <p class="text-gray-600 text-xs md:text-sm mb-2 truncate">
                                {{ book.author }}
                            </p>

                            <!-- Spacer -->
                            <div class="flex-1"></div>

                            <!-- Harga -->
                            <div class="mt-auto">
                                <div class="flex items-center justify-between mb-1">
                                    <span class="text-red-600 font-bold text-base md:text-lg">
                                        {{ book.price_new }}
                                    </span>
                                    <span v-if="book.price_old" class="text-gray-400 line-through text-xs md:text-sm">
                                        {{ book.price_old }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </article>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="mt-8 flex justify-center items-center gap-2">
                <button 
                    @click="prevPage"
                    :disabled="currentPage === 1"
                    class="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    aria-label="Halaman sebelumnya">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div class="flex gap-1">
                    <button 
                        v-for="page in displayedPages"
                        :key="page"
                        @click="currentPage = page"
                        :class="[
                            'px-4 py-2 rounded-lg transition',
                            currentPage === page 
                                ? 'bg-blue-600 text-white font-bold' 
                                : 'border hover:bg-gray-100'
                        ]"
                        :aria-label="`Halaman ${page}`"
                        :aria-current="currentPage === page ? 'page' : null">
                        {{ page }}
                    </button>
                </div>

                <button 
                    @click="nextPage"
                    :disabled="currentPage === totalPages"
                    class="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    aria-label="Halaman selanjutnya">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            <!-- Info Pagination -->
            <p v-if="filteredBooks.length > 0" class="text-center text-sm text-gray-600 mt-4">
                Menampilkan {{ startItem }} - {{ endItem }} dari {{ filteredBooks.length }} buku
            </p>
        </div>
    </section>
</template>

<script>
// Load all books from individual JSON files using webpack require.context
const booksContext = require.context('@/assets/json/books', false, /\.json$/);
const allBooks = booksContext.keys().map(key => booksContext(key));

export default {
    name: 'AllReleases',
    data() {
        return {
            books: [],
            searchQuery: '',
            sortBy: 'default',
            isLoading: true,
            currentPage: 1,
            itemsPerPage: 12
        };
    },
    computed: {
        filteredBooks() {
            let filtered = [...this.books];

            // Search filter
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(book => 
                    book.title.toLowerCase().includes(query) ||
                    book.author.toLowerCase().includes(query)
                );
            }

            // Sorting
            switch(this.sortBy) {
                case 'title-asc':
                    filtered.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case 'title-desc':
                    filtered.sort((a, b) => b.title.localeCompare(a.title));
                    break;
                case 'author-asc':
                    filtered.sort((a, b) => a.author.localeCompare(b.author));
                    break;
                case 'price-asc':
                    filtered.sort((a, b) => this.extractPrice(a.price_new) - this.extractPrice(b.price_new));
                    break;
                case 'price-desc':
                    filtered.sort((a, b) => this.extractPrice(b.price_new) - this.extractPrice(a.price_new));
                    break;
            }

            return filtered;
        },
        totalPages() {
            return Math.ceil(this.filteredBooks.length / this.itemsPerPage);
        },
        paginatedBooks() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredBooks.slice(start, end);
        },
        displayedPages() {
            const pages = [];
            const maxPages = 5;
            let startPage = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
            let endPage = Math.min(this.totalPages, startPage + maxPages - 1);

            if (endPage - startPage < maxPages - 1) {
                startPage = Math.max(1, endPage - maxPages + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            return pages;
        },
        startItem() {
            return (this.currentPage - 1) * this.itemsPerPage + 1;
        },
        endItem() {
            return Math.min(this.currentPage * this.itemsPerPage, this.filteredBooks.length);
        }
    },
    methods: {
        resolveImage(image) {
            try {
                return require(`@/assets/img/books/${image}`);
            } catch (error) {
                console.error(`Image not found: ${image}`, error);
                return require(`@/assets/img/books/placeholder.jpg`); // Fallback image
            }
        },
        handleImageError(event) {
            event.target.src = require('@/assets/img/books/placeholder.jpg');
        },
        extractPrice(priceString) {
            // Extract numeric value from price string (e.g., "Rp 50.000" -> 50000)
            return parseInt(priceString.replace(/[^\d]/g, '')) || 0;
        },
        resetFilters() {
            this.searchQuery = '';
            this.sortBy = 'default';
            this.currentPage = 1;
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.scrollToTop();
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.scrollToTop();
            }
        },
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },
    mounted() {
        // Simulate loading
        setTimeout(() => {
            this.books = allBooks;
            this.isLoading = false;
        }, 300);
    },
    metaInfo() {
        return {
            title: 'Semua Terbitan',
            meta: [
                {
                    name: 'description',
                    content: `Jelajahi ${this.books.length} koleksi buku terbitan Dwimulya Pustaka. Temukan buku untuk pengembangan diri, manajemen, dan literatur populer.`
                },
                {
                    name: 'keywords',
                    content: 'katalog buku, daftar buku, dwimulya pustaka, buku manajemen, buku akademik'
                },
                {
                    property: 'og:title',
                    content: 'Semua Terbitan | Dwimulya Pustaka'
                },
                {
                    property: 'og:description',
                    content: `Jelajahi ${this.books.length} koleksi buku berkualitas dari Dwimulya Pustaka`
                }
            ]
        };
    },
    watch: {
        searchQuery() {
            this.currentPage = 1; // Reset ke halaman 1 saat search
        },
        sortBy() {
            this.currentPage = 1; // Reset ke halaman 1 saat sort
        }
    }
};
</script>

<style scoped>
/* Line clamp untuk judul panjang */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Smooth transitions */
* {
    transition: all 0.2s ease;
}

/* Loading spinner animation */
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}
</style>