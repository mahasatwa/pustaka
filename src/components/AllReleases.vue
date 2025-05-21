<template>
    <section class="py-8 bg-gray-50">
        <div class="container mx-auto px-4">
            <!-- Header -->
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">Semua Buku</h2>
                <router-link to="/"
                    class="text-blue-600 hover:underline text-sm flex items-center transition duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali
                </router-link>
            </div>

            <!-- Grid Buku -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                <div v-for="book in books" :key="book.id"
                    class="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                    <router-link :to="`/book/${book.pretty_url}`" class="block">
                        <!-- Gambar Buku -->
                        <img :src="resolveImage(book.image)" :alt="book.title"
                            class="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                            loading="lazy" />

                        <!-- Konten Buku -->
                        <div class="p-4">
                            <h3 class="font-bold text-base md:text-lg line-clamp-2 h-12">{{ book.title }}</h3>
                            <p class="text-gray-600 text-sm mb-2 truncate">{{ book.author }}</p>

                            <!-- Harga -->
                            <div class="flex items-center justify-between">
                                <span class="text-red-600 font-bold text-lg">{{ book.price_new }}</span>
                                <span class="text-gray-400 line-through text-sm">{{ book.price_old }}</span>
                            </div>

                            <!-- Diskon -->
                            <p class="text-xs text-red-600 font-bold mt-1">
                                {{ book.discount }} Off
                            </p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import books from '@/assets/json/books.json';

export default {
    name: 'AllReleases',
    data() {
        return {
            books: books
        };
    },
    methods: {
        resolveImage(image) {
            return require(`@/assets/img/books/${image}`);
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
</style>