<template>
    <section class="py-8">
        <div class="m-container mx-auto">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold">Rilis Terbaru</h2>
                <a href="#" class="text-blue-600 hover:underline text-sm">Lihat Semua</a>
            </div>
            <div class="flex gap-4">
                <!-- Banner di sisi kiri -->
                <div class="w-1/4 bg-blue-50 p-4 rounded-lg">
                    <h3 class="text-lg font-bold mb-2">Rilis Terbaru</h3>
                    <img :src="imageAssetsResolver('rilis.jpg')" alt="Illustration" class="rounded-lg">
                </div>
                <!-- Daftar Buku -->
                <div class="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div v-for="book in books" :key="book.id" class="border rounded-lg overflow-hidden shadow-sm">
                        <router-link :to="`/book/${book.pretty_url}`">
                            <img :src="resolveImage(book.image)" :alt="book.title" class="w-full h-48 object-cover" />
                            <div class="p-4">
                                <h4 class="font-bold text-lg truncate">{{ book.title }}</h4>
                                <p class="text-gray-600 text-sm mb-2">{{ book.author }}</p>
                                <div class="flex items-center justify-between">
                                    <span class="text-red-600 font-bold">{{ book.price_new }}</span>
                                    <span class="text-gray-500 line-through text-sm">{{ book.price_old }}</span>
                                </div>
                                <p class="text-sm text-red-600 font-bold">{{ book.discount }}</p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import books from "@/assets/json/newrelease.json";

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
/* Tambahkan styling jika diperlukan */
</style>