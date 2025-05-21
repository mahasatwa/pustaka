<template>
    <section class="relative bg-slate-50 mt-[76px]">
        <div v-if="book" class="container mx-auto py-8 px-4 lg:px-12">
            <!-- Bagian Atas: Gambar dan Informasi Buku -->
            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Gambar Buku -->
                <div class="lg:w-1/3 flex-shrink-0">
                    <img :src="resolveImage(book.image)" :alt="book.title"
                        class="w-full h-auto rounded-lg shadow-md transition-transform duration-300 hover:scale-105" />
                </div>

                <!-- Informasi Buku -->
                <div class="lg:w-2/3 space-y-6">
                    <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">{{ book.title }}</h1>
                    <p class="text-lg text-gray-600">Penulis: {{ book.author }}</p>
                    <p class="text-2xl font-bold text-red-600">{{ book.price_new }}</p>

                    <!-- Format Buku -->
                    <div class="mt-4">
                        <h2 class="text-xl font-bold mb-2">Format Buku</h2>
                        <button class="px-4 py-2 border rounded-lg text-sm font-medium bg-violet-100 text-slate-700">
                            {{ book.cover }}
                        </button>
                    </div>

                    <!-- Deskripsi Buku -->
                    <div class="mt-6">
                        <h2 class="text-xl font-bold mb-2">Deskripsi</h2>
                        <p class="text-gray-800 leading-relaxed whitespace-pre-line">
                            {{ book.description }}
                        </p>
                    </div>

                    <!-- Detail Buku -->
                    <div class="mt-6">
                        <h2 class="text-xl font-bold mb-4">Detail Buku</h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                            <div><span class="text-gray-600">Penerbit</span>: <strong>{{ book.publisher }}</strong>
                            </div>
                            <div><span class="text-gray-600">ISBN</span>: <strong>{{ book.isbn }}</strong></div>
                            <div><span class="text-gray-600">Bahasa</span>: <strong>{{ book.language }}</strong></div>
                            <div><span class="text-gray-600">Tanggal Terbit</span>: <strong>{{ book.publication_date
                                    }}</strong></div>
                            <div><span class="text-gray-600">Halaman</span>: <strong>{{ book.pages }}</strong></div>
                            <div><span class="text-gray-600">Dimensi</span>: <strong>{{ book.dimensions }}</strong>
                            </div>
                            <div><span class="text-gray-600">Berat</span>: <strong>{{ book.weight }}</strong></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tampilkan pesan jika buku tidak ditemukan -->
        <div v-else class="text-center py-20">
            <h1 class="text-2xl font-bold text-gray-700">Buku tidak ditemukan</h1>
            <router-link to="/books" class="text-blue-600 underline mt-4 inline-block">
                Kembali ke Semua Buku
            </router-link>
        </div>
    </section>
</template>

<script>
import books from "@/assets/json/books.json";
import { defineComponent } from "vue";
import { useMeta } from "vue-meta";

export default defineComponent({
    props: ["pretty_url"],
    data() {
        return {
            book: null,
        };
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                this.loadBook();
            },
        },
    },
    methods: {
        resolveImage(imagePath) {
            try {
                return require(`@/assets/img/books/${imagePath}`);
            } catch (e) {
                return imagePath;
            }
        },
        loadBook() {
            this.book = books.find((b) => b.pretty_url === this.$route.params.pretty_url);
            if (this.book) {
                useMeta({
                    title: this.book.title,
                    meta: [
                        { name: "description", content: this.book.description },
                        { property: "og:title", content: this.book.title },
                        { property: "og:description", content: this.book.description },
                        { property: "og:image", content: this.resolveImage(this.book.image) },
                        { property: "og:url", content: window.location.href },
                    ],
                });
            }
        },
    },
});
</script>

<style scoped>
.container {
    max-width: 1200px;
}
</style>