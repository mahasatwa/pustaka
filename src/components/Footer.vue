<template>
    <footer class="bg-white py-10 text-gray-700">
        <div class="container mx-auto px-4">
            <!-- Top Section -->
            <div class="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 pb-8 mb-8">
                <!-- Logo -->
                <div class="flex items-center mb-6 md:mb-0">
                    <img :src="logo" alt="Logo Dwimulya Pustaka" class="h-8 mr-2" />
                    <span class="text-xl font-bold text-sky-950">Dwimulya Pustaka</span>
                </div>

                <!-- Description -->
                <div class="max-w-md text-center md:text-right">
                    <p class="text-sm md:text-base text-gray-500">
                        Dukung belajar Anda dengan koleksi lengkap kami.
                    </p>
                </div>
            </div>

            <!-- Middle Section -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-10">
                <!-- Layanan Kami -->
                <div>
                    <h3 class="font-semibold text-gray-800 mb-3">Layanan Kami</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="hover:underline transition duration-200">Peminjaman Buku</a></li>
                        <li><a href="#" class="hover:underline transition duration-200">Digital Library</a></li>
                    </ul>
                </div>

                <!-- Panduan Pengguna -->
                <div>
                    <h3 class="font-semibold text-gray-800 mb-3">Panduan Pengguna</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="hover:underline transition duration-200">Cara Peminjaman</a></li>
                        <li><a href="#" class="hover:underline transition duration-200">Pemesanan</a></li>
                        <li><a href="#" class="hover:underline transition duration-200">Pengiriman</a></li>
                    </ul>
                </div>

                <!-- Tentang Kami -->
                <div>
                    <h3 class="font-semibold text-gray-800 mb-3">Tentang Kami</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="hover:underline transition duration-200">Profil Perpustakaan</a></li>
                        <li><a href="#" class="hover:underline transition duration-200">Tim Kami</a></li>
                    </ul>
                </div>

                <!-- Lainnya -->
                <div>
                    <h3 class="font-semibold text-gray-800 mb-3">Lainnya</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="hover:underline transition duration-200">Blog</a></li>
                        <li><a href="#" class="hover:underline transition duration-200">Kebijakan Privasi</a></li>
                        <li><a href="#" class="hover:underline transition duration-200">Hubungi Kami</a></li>
                    </ul>
                </div>

                <!-- Alamat -->
                <div>
                    <h3 class="font-semibold text-gray-800 mb-3">Alamat Kami</h3>
                    <p class="text-sm text-gray-600 leading-relaxed">
                        Jl. Kav. Sindangsari B1, Ds. Sindangsari, Kec. Pabuaran, Serang, Banten 42163
                    </p>
                </div>
            </div>

            <!-- Bottom Section -->
            <div class="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-200">
                <!-- Copyright -->
                <p class="text-sm text-gray-500 mb-4 md:mb-0">&copy; 2025 Dwimulya Pustaka. Hak Cipta Dilindungi.</p>

                <!-- Social Media Icons -->
                <div class="flex space-x-5 text-gray-500">
                    <a href="#" aria-label="Facebook" class="hover:text-blue-600 transition duration-200">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" aria-label="Twitter" class="hover:text-blue-400 transition duration-200">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" aria-label="Instagram" class="hover:text-pink-600 transition duration-200">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#" aria-label="YouTube" class="hover:text-red-600 transition duration-200">
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
/* Pastikan font awesome atau ikon lainnya sudah di-load */
.fab {
    font-family: "Font Awesome 5 Brands";
}
</style>