<template>
    <footer class="py-8">
        <div class="border-t border-b border-gray-300">
            <!-- Bagian Atas -->
            <div class="m-container mx-auto bg-white flex flex-wrap justify-between items-center py-8 pb-6 mb-6">
                <!-- Logo dan Deskripsi -->
                <div class="w-full lg:w-1/3 mb-6 lg:mb-0 flex items-center">
                    <img :src="logo" alt="Logo Dwimulya Pustaka" class="h-8 mb-3 mr-2">
                    <span class="text-xl font-bold text-sky-950">Dwimulya Pustaka</span>
                </div>


                <!-- Aplikasi Seluler -->
                <div class="w-full lg:w-2/3 text-center lg:text-right">
                    <p class="ml-auto text-l-extrabold text-neutral-500">
                        Dukung belajar Anda dengan koleksi lengkap kami.
                    </p>
                </div>
            </div>
        </div>
        <div class="m-container mx-auto pt-12">
            <!-- Bagian Tengah -->
            <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
                <!-- Layanan Kami -->
                <div>
                    <h3 class="font-bold text-gray-800 mb-3">Layanan Kami</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-600 hover:underline">Peminjaman Buku</a></li>
                        <li><a href="#" class="text-gray-600 hover:underline">Digital Library</a></li>
                    </ul>
                </div>

                <!-- Panduan Pengguna -->
                <div>
                    <h3 class="font-bold text-gray-800 mb-3">Panduan Pengguna</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-600 hover:underline">Cara Peminjaman</a></li>
                        <li><a href="#" class="text-gray-600 hover:underline">Pemesanan</a></li>
                        <li><a href="#" class="text-gray-600 hover:underline">Pengiriman</a></li>
                    </ul>
                </div>

                <!-- Tentang Kami -->
                <div>
                    <h3 class="font-bold text-gray-800 mb-3">Tentang Kami</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-600 hover:underline">Profil Perpustakaan</a></li>
                        <li><a href="#" class="text-gray-600 hover:underline">Tim Kami</a></li>
                    </ul>
                </div>

                <!-- Lainnya -->
                <div>
                    <h3 class="font-bold text-gray-800 mb-3">Lainnya</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-600 hover:underline">Blog</a></li>
                        <li><a href="#" class="text-gray-600 hover:underline">Kebijakan Privasi</a></li>
                        <li><a href="#" class="text-gray-600 hover:underline">Hubungi Kami</a></li>
                    </ul>
                </div>
                <div class="shrink-0 space-y-3">
                    <div class="font-bold text-right text-m-extrabold text-neutral-700">Kunjungi Kami</div>
                    <div class="text-right text-xs-medium text-neutral-600">
                        Jl. Kav. Sindangsari B1, Ds. Sindangsari, Kec. Pabuaran, Serang, Baten 42163
                    </div>
                </div>
            </div>

            <!-- Bagian Bawah -->
            <div
                class="flex flex-wrap justify-between items-center mt-8 pt-6 border-t border-gray-300 text-gray-600 text-sm">
                <!-- Hak Cipta -->
                <p>© 2025 Dwimulya Pustaka</p>

                <!-- Ikon Sosial Media -->
                <div class="flex space-x-4">
                    <a href="#" aria-label="Facebook" class="text-gray-600 hover:text-gray-800">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" aria-label="Twitter" class="text-gray-600 hover:text-gray-800">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" aria-label="Instagram" class="text-gray-600 hover:text-gray-800">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#" aria-label="YouTube" class="text-gray-600 hover:text-gray-800">
                        <i class="fab fa-youtube"></i>
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "FooterComponent",
    data() {
        return {
            logo: require("@/assets/img/dmpustaka.png")
        };
    }
};
</script>

<style scoped>
/* Tambahkan jika ada kebutuhan styling tambahan */
</style>