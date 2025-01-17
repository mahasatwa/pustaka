<template>
    <section class="relative bg-slate-50 mt-[76px]">
        <div v-if="book" class="container mx-auto py-8 px-4 lg:px-8">
            <!-- Bagian Atas: Gambar dan Informasi Buku -->
            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Gambar Buku -->
                <div class="flex-shrink-0">
                    <img :src="resolveImage(book.image)" :alt="book.title"
                        class="w-full lg:w-[300px] h-auto rounded-lg shadow-lg" />
                </div>

                <!-- Informasi Buku -->
                <div class="flex-1">
                    <h1 class="text-3xl font-bold mb-4">{{ book.title }}</h1>
                    <p class="text-lg text-gray-600 mb-2">Penulis: {{ book.author }}</p>
                    <p class="text-2xl font-bold text-red-600 mb-4">{{ book.price_new }}</p>
                    <div>
                        <h2 class="text-xl font-bold mb-4 mt-10">Format Buku</h2>
                        <button class="px-4 py-2 border rounded-lg text-sm font-medium bg-violet-100 text-slate-500">
                            {{ book.cover }}
                        </button>
                    </div>

                    <!-- Deskripsi Buku -->
                    <div>
                        <h2 class="text-xl font-bold mb-4 mt-10">Deskripsi</h2>
                        <p class="text-gray-800 leading-relaxed">{{ book.description }}</p>
                    </div>

                    <!-- Detail Buku -->
                    <div>
                        <h2 class="text-xl font-bold mb-4 mt-10">Detail Buku</h2>
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Penerbit</span>
                                <span class="font-medium">{{ book.publisher }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">ISBN</span>
                                <span class="font-medium">{{ book.isbn }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Bahasa</span>
                                <span class="font-medium">{{ book.language }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Tanggal Terbit</span>
                                <span class="font-medium">{{ book.publication_date }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Halaman</span>
                                <span class="font-medium">{{ book.pages }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Dimensi</span>
                                <span class="font-medium">{{ book.dimensions }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Berat</span>
                                <span class="font-medium">{{ book.weight }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tampilkan pesan jika buku tidak ditemukan -->
        <div v-else class="text-center py-20">
            <h1 class="text-2xl font-bold text-gray-700">Buku tidak ditemukan</h1>
        </div>
    </section>
</template>

<script>
import books from "@/assets/json/newrelease.json";

export default {
    props: ["pretty_url"],
    data() {
        return {
            book: null
        };
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                this.loadBook();
            }
        }
    },
    methods: {
        loadBook() {
            this.book = books.find(
                (b) => b.pretty_url === this.$route.params.pretty_url
            );
        },
        resolveImage(imagePath) {
            try {
                return require(`@/assets/img/books/${imagePath}`);
            } catch (e) {
                return imagePath;
            }
        }
    }
};
</script>

<style>
.container {
    max-width: 1024px;
}
</style>
