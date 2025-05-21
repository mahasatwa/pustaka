<template>
    <section class="py-12 bg-gray-50">
        <div class="container mx-auto px-4">
            <!-- Judul -->
            <h3 class="text-xl sm:text-2xl font-semibold mb-8 text-gray-800 text-center">
                Sumber Daya Untuk...
            </h3>

            <!-- Grid Resources -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div v-for="resource in resources" :key="resource.id"
                    class="bg-white shadow rounded-lg p-5 text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                    <div class="mb-3 text-blue-600">
                        <!-- Ikon (contoh menggunakan Font Awesome) -->
                        <i :class="`fas fa-${resource.icon} text-2xl`"></i>
                    </div>
                    <p class="font-semibold text-gray-700">{{ resource.title }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "ResourcesBlock",
    data() {
        return {
            resources: [
                { id: 1, title: "Mahasiswa", icon: "graduation-cap" },
                { id: 2, title: "Dosen", icon: "chalkboard-teacher" },
                { id: 3, title: "Peneliti", icon: "microscope" },
                { id: 4, title: "Perpustakaan", icon: "book-reader" },
            ],
        };
    },
};
</script>

<style scoped>
/* Pastikan Font Awesome atau ikon lain sudah dimuat */
.fas {
    font-family: "Font Awesome 5 Free";
}
</style>