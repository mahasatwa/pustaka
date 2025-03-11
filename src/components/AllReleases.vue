<template>
    <section class="py-8">
        <div class="m-container mx-auto">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Semua Buku</h2>
                <router-link 
                    to="/" 
                    class="text-blue-600 hover:underline text-sm flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali
                </router-link>
            </div>
            
            <!-- Grid Buku -->
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div 
                    v-for="book in books" 
                    :key="book.id" 
                    class="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                    <router-link :to="`/book/${book.pretty_url}`" class="block">
                        <img 
                            :src="resolveImage(book.image)" 
                            :alt="book.title" 
                            class="w-full h-48 object-cover"
                            loading="lazy"
                        />
                        <div class="p-4">
                            <h3 class="font-bold text-lg truncate">{{ book.title }}</h3>
                            <p class="text-gray-600 text-sm mb-2 truncate">{{ book.author }}</p>
                            <div class="flex items-center justify-between">
                                <span class="text-red-600 font-bold">{{ book.price_new }}</span>
                                <span class="text-gray-500 line-through text-sm">{{ book.price_old }}</span>
                            </div>
                            <p class="text-sm text-red-600 font-bold mt-1">{{ book.discount }}</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import books from '@/assets/json/books.json'; // Perbaikan path dengan @

export default {
    name: 'AllReleases',
    data() {
        return {
            books: books
        };
    },
    methods: {
        resolveImage(image) {
            return require(`@/assets/img/books/${image}`); // Tambahkan @
        }
    }
}
</script>

<style scoped>
.hover\:shadow-md {
    transition: box-shadow 0.3s ease;
}
.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>