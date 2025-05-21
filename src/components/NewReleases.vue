<template>
    <section class="py-8 bg-gray-50">
        <div class="container mx-auto px-4">
            <!-- Header -->
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">Rilis Terbaru</h2>
                <router-link to="/all-releases"
                    class="text-blue-600 hover:text-blue-800 hover:underline text-sm transition duration-200">
                    Lihat Semua
                </router-link>
            </div>

            <!-- Konten Utama -->
            <div class="flex flex-col lg:flex-row gap-6">
                <!-- Banner Sisi Kiri -->
                <div class="lg:w-1/4 w-full bg-blue-50 p-4 rounded-lg shadow-sm">
                    <h3 class="text-lg font-bold mb-3">Rilis Terbaru</h3>
                    <img :src="imageAssetsResolver('rilis.jpg')" alt="Ilustrasi Rilis Terbaru"
                        class="w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105" />
                </div>

                <!-- Daftar Buku -->
                <div class="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <div v-for="book in books" :key="book.id"
                        class="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                        <router-link :to="`/book/${book.pretty_url}`" class="block">
                            <img :src="resolveImage(book.image)" :alt="book.title"
                                class="w-full h-40 sm:h-48 object-cover transition-transform duration-300 hover:scale-105" />
                            <div class="p-3 sm:p-4">
                                <!-- Judul Buku -->
                                <h4 class="font-bold text-base line-clamp-2 h-12">{{ book.title }}</h4>
                                <!-- Penulis -->
                                <p class="text-gray-600 text-xs sm:text-sm truncate my-1">{{ book.author }}</p>
                                <!-- Harga -->
                                <div class="flex items-center justify-between mt-2">
                                    <span class="text-red-600 font-bold text-sm sm:text-base">{{ book.price_new
                                        }}</span>
                                    <span class="text-gray-400 line-through text-xs sm:text-sm">{{ book.price_old
                                        }}</span>
                                </div>
                                <!-- Diskon -->
                                <p class="text-xs text-red-600 font-bold mt-1">{{ book.discount }}</p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import books from '@/assets/json/newrelease.json';

export default {
    name: "NewReleases",
    data() {
        return {
            books,
        };
    },
    methods: {
        resolveImage(image) {
            return require(`@/assets/img/books/${image}`);
        },
        imageAssetsResolver(image) {
            return require(`@/assets/img/${image}`);
        },
    },
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