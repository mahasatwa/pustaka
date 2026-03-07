<template>
    <section class="bg-gray-50 mt-[76px] min-h-screen">
        <div v-if="book" class="container mx-auto px-4 py-8 md:py-12">
            <!-- Breadcrumb -->
            <nav class="mb-6 text-sm">
                <ol class="flex items-center gap-2 text-gray-600">
                    <li><router-link to="/" class="hover:text-gray-900 transition-colors">Beranda</router-link></li>
                    <li><span class="text-gray-400">/</span></li>
                    <li><router-link to="/catalog" class="hover:text-gray-900 transition-colors">Katalog</router-link></li>
                    <li><span class="text-gray-400">/</span></li>
                    <li class="text-gray-900 font-medium truncate max-w-[200px]">{{ book.title }}</li>
                </ol>
            </nav>

            <!-- Main Content -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <!-- Left: Image -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-lg p-6 sticky top-24">
                        <div class="relative aspect-[3/4] mb-4">
                            <img 
                                :src="resolveImage(book.image)" 
                                :alt="book.title"
                                class="w-full h-full object-cover rounded-lg shadow-sm"
                                @error="handleImageError"
                            />
                            <!-- Badge -->
                            <div v-if="book.discount" class="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded">
                                -{{ book.discount }}%
                            </div>
                        </div>

                        <!-- Price & CTA -->
                        <div class="space-y-4">
                            <div>
                                <div class="flex items-baseline gap-2 mb-1">
                                    <span class="text-2xl font-semibold text-gray-900">{{ book.price_new }}</span>
                                    <span v-if="book.price_old" class="text-sm text-gray-500 line-through">{{ book.price_old }}</span>
                                </div>
                                <p class="text-xs text-gray-600">Termasuk pajak</p>
                            </div>

                            <!-- Format Selection -->
                            <div v-if="book.cover">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Format</label>
                                <button class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 hover:bg-gray-100 transition-colors">
                                    {{ book.cover }}
                                </button>
                            </div>

                            <!-- Action Buttons -->
                            <div class="space-y-2">
                                <button 
                                    @click="addToCart"
                                    class="w-full px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors"
                                >
                                    Tambah ke Keranjang
                                </button>
                                <button 
                                    @click="toggleWishlist"
                                    class="w-full px-4 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Book Info -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Title & Author -->
                    <div class="bg-white rounded-lg p-6 md:p-8">
                        <h1 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">{{ book.title }}</h1>
                        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                            <span>Oleh <span class="text-gray-900 font-medium">{{ book.author }}</span></span>
                            <span class="text-gray-300">•</span>
                            <span>{{ book.publisher }}</span>
                        </div>
                        
                        <!-- Rating (Optional) -->
                        <div v-if="book.rating" class="flex items-center gap-2">
                            <div class="flex items-center">
                                <svg v-for="i in 5" :key="i" class="w-5 h-5" :class="i <= book.rating ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <span class="text-sm text-gray-600">({{ book.reviews || 0 }} ulasan)</span>
                        </div>
                    </div>

                    <!-- Description -->
                    <div class="bg-white rounded-lg p-6 md:p-8">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">Deskripsi Buku</h2>
                        <div class="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                            <p class="whitespace-pre-line">{{ book.description }}</p>
                        </div>
                    </div>

                    <!-- Book Details -->
                    <div class="bg-white rounded-lg p-6 md:p-8">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">Detail Buku</h2>
                        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                            <div v-if="book.isbn" class="flex justify-between sm:block">
                                <dt class="text-gray-600 mb-1">ISBN</dt>
                                <dd class="text-gray-900 font-medium">{{ book.isbn }}</dd>
                            </div>
                            <div v-if="book.publisher" class="flex justify-between sm:block">
                                <dt class="text-gray-600 mb-1">Penerbit</dt>
                                <dd class="text-gray-900 font-medium">{{ book.publisher }}</dd>
                            </div>
                            <div v-if="book.language" class="flex justify-between sm:block">
                                <dt class="text-gray-600 mb-1">Bahasa</dt>
                                <dd class="text-gray-900 font-medium">{{ book.language }}</dd>
                            </div>
                            <div v-if="book.publication_date" class="flex justify-between sm:block">
                                <dt class="text-gray-600 mb-1">Tanggal Terbit</dt>
                                <dd class="text-gray-900 font-medium">{{ formatDate(book.publication_date) }}</dd>
                            </div>
                            <div v-if="book.pages" class="flex justify-between sm:block">
                                <dt class="text-gray-600 mb-1">Jumlah Halaman</dt>
                                <dd class="text-gray-900 font-medium">{{ book.pages }} halaman</dd>
                            </div>
                            <div v-if="book.dimensions" class="flex justify-between sm:block">
                                <dt class="text-gray-600 mb-1">Dimensi</dt>
                                <dd class="text-gray-900 font-medium">{{ book.dimensions }}</dd>
                            </div>
                            <div v-if="book.weight" class="flex justify-between sm:block">
                                <dt class="text-gray-600 mb-1">Berat</dt>
                                <dd class="text-gray-900 font-medium">{{ book.weight }}</dd>
                            </div>
                            <div v-if="book.cover" class="flex justify-between sm:block">
                                <dt class="text-gray-600 mb-1">Jenis Cover</dt>
                                <dd class="text-gray-900 font-medium">{{ book.cover }}</dd>
                            </div>
                        </dl>
                    </div>

                    <!-- Additional Info (Optional) -->
                    <div v-if="book.features || book.target_audience" class="bg-white rounded-lg p-6 md:p-8">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">Informasi Tambahan</h2>
                        
                        <div v-if="book.features" class="mb-6">
                            <h3 class="text-sm font-medium text-gray-700 mb-2">Fitur Buku</h3>
                            <ul class="space-y-2 text-sm text-gray-600">
                                <li v-for="(feature, index) in book.features" :key="index" class="flex items-start gap-2">
                                    <svg class="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                    </svg>
                                    {{ feature }}
                                </li>
                            </ul>
                        </div>

                        <div v-if="book.target_audience">
                            <h3 class="text-sm font-medium text-gray-700 mb-2">Cocok Untuk</h3>
                            <p class="text-sm text-gray-600">{{ book.target_audience }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Related Books (Optional) -->
            <div v-if="relatedBooks.length > 0" class="mt-12">
                <h2 class="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Buku Terkait</h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <router-link 
                        v-for="related in relatedBooks" 
                        :key="related.id"
                        :to="`/book/${related.pretty_url}`"
                        class="group bg-white rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <div class="aspect-[3/4] mb-3 overflow-hidden rounded-lg">
                            <img 
                                :src="resolveImage(related.image)" 
                                :alt="related.title"
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">{{ related.title }}</h3>
                        <p class="text-xs text-gray-600 mb-2">{{ related.author }}</p>
                        <p class="text-sm font-semibold text-gray-900">{{ related.price_new }}</p>
                    </router-link>
                </div>
            </div>
        </div>

        <!-- Book Not Found -->
        <div v-else class="container mx-auto px-4 py-20 text-center">
            <div class="max-w-md mx-auto">
                <svg class="w-24 h-24 mx-auto mb-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h1 class="text-2xl font-semibold text-gray-900 mb-2">Buku Tidak Ditemukan</h1>
                <p class="text-gray-600 mb-6">Maaf, buku yang Anda cari tidak tersedia.</p>
                <router-link 
                    to="/catalog" 
                    class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors"
                >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke Katalog
                </router-link>
            </div>
        </div>
    </section>
</template>

<script>
import { defineComponent } from "vue";
import { useMeta } from "vue-meta";

export default defineComponent({
    props: ["pretty_url"],
    data() {
        return {
            book: null,
            allBooks: [] // Cache for all books (for related books)
        };
    },
    computed: {
        relatedBooks() {
            if (!this.book) return [];
            // Get 5 related books from same author
            return this.allBooks
                .filter(b =>
                    b.id !== this.book.id &&
                    b.author === this.book.author
                )
                .slice(0, 5);
        }
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                this.loadBook();
                // Scroll to top on route change
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },
        },
    },
    methods: {
        resolveImage(imagePath) {
            try {
                return require(`@/assets/img/books/${imagePath}`);
            } catch (e) {
                console.warn(`Image not found: ${imagePath}`);
                return this.getPlaceholder();
            }
        },
        
        handleImageError(event) {
            event.target.src = this.getPlaceholder();
        },
        
        getPlaceholder() {
            return 'https://via.placeholder.com/400x600?text=Book+Cover&bg=e5e7eb&textColor=6b7280';
        },
        
        formatDate(dateString) {
            if (!dateString) return '-';
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('id-ID', options);
        },
        
        addToCart() {
            // Implement add to cart logic
            console.log('Added to cart:', this.book.id);
            // Show notification or redirect
        },
        
        toggleWishlist() {
            // Implement wishlist toggle
            console.log('Wishlist toggled:', this.book.id);
        },
        
        async loadBook() {
            const slug = this.$route.params.pretty_url;
            try {
                // Load all books and find by slug (more reliable than dynamic import)
                const booksContext = require.context('@/assets/json/books', false, /\.json$/);
                const allBooks = booksContext.keys().map(key => booksContext(key));
                
                this.book = allBooks.find(b => b.pretty_url === slug);

                if (this.book) {
                    useMeta({
                        title: `${this.book.title} - Dwimulya Pustaka`,
                        meta: [
                            { name: "description", content: this.book.description },
                            { property: "og:title", content: this.book.title },
                            { property: "og:description", content: this.book.description },
                            { property: "og:image", content: this.resolveImage(this.book.image) },
                            { property: "og:url", content: window.location.href },
                            { property: "og:type", content: "book" },
                            { name: "twitter:card", content: "summary_large_image" },
                        ],
                    });
                } else {
                    console.error('Book not found:', slug);
                }
            } catch (e) {
                console.error('Error loading book:', slug, e);
                this.book = null;
            }
        },
    },
});
</script>

<style scoped>
/* Line clamp utility */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Smooth transitions */
* {
    transition-property: color, background-color, border-color, transform, box-shadow;
    transition-timing-function: ease-in-out;
}

/* Prose styling */
.prose p {
    margin-bottom: 1rem;
}

.prose p:last-child {
    margin-bottom: 0;
}
</style>