<template>
    <header class="fixed w-full bg-white border-b shadow-sm top-0 z-50 transition-all duration-300">
        <div class="container mx-auto flex items-center justify-between py-4 px-6">
            <!-- Logo -->
            <router-link to="/" class="flex items-center space-x-3">
                <img :src="logo" alt="Logo" class="h-8" />
                <span class="text-xl font-bold text-sky-950">Dwimulya Pustaka</span>
            </router-link>

            <!-- Search Bar -->
            <div class="hidden md:flex flex-grow max-w-xl mx-4">
                <select class="bg-gray-100 border border-gray-300 text-gray-600 text-sm rounded-l-md px-4 py-2">
                    <option>Kategori</option>
                    <option>Akuntansi</option>
                    <option>Manajemen</option>
                    <option>Ekonomi</option>
                </select>
                <input type="text"
                    class="flex-grow border border-gray-300 rounded-r-md px-4 py-2 text-sm focus:ring-blue-600 focus:border-blue-600 outline-none"
                    placeholder="Cari Buku, Judul, atau Penulis" />
            </div>

            <!-- Navigasi Utama -->
            <nav class="hidden lg:flex items-center space-x-6">
                <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Promo</a>
                <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Toko Kami</a>
                <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Hubungi Kami</a>
            </nav>

            <!-- Tombol Masuk/Daftar -->
            <div class="flex items-center space-x-3">
                <button
                    class="border border-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-100 transition duration-200">
                    Masuk
                </button>
                <button class="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition duration-200">
                    Daftar
                </button>
            </div>

            <!-- Mobile Menu Button -->
            <div class="lg:hidden flex items-center">
                <button @click="toggleMobileMenu" class="text-gray-700 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Mobile Menu dengan Transisi -->
        <transition name="slide">
            <div v-show="isMobileMenuOpen" class="lg:hidden bg-white shadow-md border-t overflow-hidden">
                <nav class="flex flex-col items-center space-y-4 py-4">
                    <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Promo</a>
                    <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Toko Kami</a>
                    <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Hubungi
                        Kami</a>
                </nav>
            </div>
        </transition>

        <!-- Mobile Search Bar -->
        <transition name="fade">
            <div v-show="isMobileMenuOpen" class="lg:hidden px-6 pb-4">
                <div class="flex flex-col space-y-2">
                    <select class="bg-gray-100 border border-gray-300 text-gray-600 text-sm rounded-md px-4 py-2">
                        <option>Kategori</option>
                        <option>Akuntansi</option>
                        <option>Manajemen</option>
                        <option>Ekonomi</option>
                    </select>
                    <input type="text"
                        class="border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-blue-600 focus:border-blue-600 outline-none"
                        placeholder="Cari Buku, Judul, atau Penulis" />
                </div>
            </div>
        </transition>
    </header>
</template>

<script>
export default {
    name: "HeaderComponent",
    data() {
        return {
            isMobileMenuOpen: false,
            logo: require("@/assets/img/dmpustaka.png")
        };
    },
    methods: {
        toggleMobileMenu() {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
        }
    }
};
</script>

<style scoped>
/* Transisi untuk menu mobile */
.slide-enter-active,
.slide-leave-active {
    transition: max-height 0.3s ease-out;
    max-height: 200px;
}

.slide-enter,
.slide-leave-to {
    max-height: 0;
    opacity: 0;
}

/* Transisi untuk search bar mobile */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>