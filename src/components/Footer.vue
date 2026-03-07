<template>
    <footer class="bg-gray-50 border-t border-gray-200">
        <!-- Main Content -->
        <div class="container mx-auto px-4 py-12 md:py-16">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                <!-- Brand Section -->
                <div class="md:col-span-4">
                    <div class="flex items-center mb-4">
                        <img :src="logo" alt="Dwimulya Pustaka" class="h-7 mr-2.5" />
                        <span class="text-lg font-semibold text-gray-900">Dwimulya Pustaka</span>
                    </div>
                    <p class="text-sm text-gray-600 leading-relaxed mb-6">
                        Penerbit buku berkualitas untuk pengembangan diri, manajemen, dan akademik.
                    </p>
                    
                    <!-- Contact Info -->
                    <div class="space-y-2 text-sm text-gray-600">
                        <a href="tel:+628179113900" class="flex items-center gap-2 hover:text-gray-900 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +62 817 911 3900
                        </a>
                        <a href="mailto:infodwimulyapustaka@gmail.com" class="flex items-center gap-2 hover:text-gray-900 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            infodwimulyapustaka@gmail.com
                        </a>
                    </div>
                </div>

                <!-- Links Grid -->
                <div class="md:col-span-5 grid grid-cols-2 gap-8">
                    <!-- Layanan -->
                    <div>
                        <h3 class="text-sm font-semibold text-gray-900 mb-3">Layanan</h3>
                        <ul class="space-y-2.5 text-sm">
                            <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Peminjaman Buku</a></li>
                            <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Digital Library</a></li>
                            <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Pemesanan</a></li>
                        </ul>
                    </div>

                    <!-- Informasi -->
                    <div>
                        <h3 class="text-sm font-semibold text-gray-900 mb-3">Informasi</h3>
                        <ul class="space-y-2.5 text-sm">
                            <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Tentang Kami</a></li>
                            <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Panduan</a></li>
                            <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Hubungi</a></li>
                        </ul>
                    </div>
                </div>

                <!-- Address -->
                <div class="md:col-span-3">
                    <h3 class="text-sm font-semibold text-gray-900 mb-3">Lokasi</h3>
                    <p class="text-sm text-gray-600 leading-relaxed">
                        Jl. Kav. Sindangsari B1<br/>
                        Ds. Sindangsari, Kec. Pabuaran<br/>
                        Serang, Banten 42163
                    </p>
                </div>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-gray-200">
            <div class="container mx-auto px-4 py-6">
                <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-xs text-gray-500">
                        © {{ currentYear }} Dwimulya Pustaka. All rights reserved.
                    </p>
                    
                    <!-- Social Media -->
                    <div class="flex items-center gap-4">
                        <a 
                            v-for="social in socials" 
                            :key="social.name"
                            :href="social.url" 
                            :aria-label="social.name"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <i :class="social.icon" class="text-base"></i>
                        </a>
                    </div>
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
            logo: require("@/assets/img/dmpustaka.png"),
            currentYear: new Date().getFullYear(),
            socials: [
                { name: 'Facebook', icon: 'fab fa-facebook-f', url: '#' },
                { name: 'Instagram', icon: 'fab fa-instagram', url: '#' },
                { name: 'Twitter', icon: 'fab fa-twitter', url: '#' },
                { name: 'YouTube', icon: 'fab fa-youtube', url: '#' }
            ]
        };
    }
};
</script>

<style scoped>
/* Smooth hover transitions */
a {
    transition: color 0.2s ease;
}

/* Icon sizing */
.fab {
    display: inline-block;
    width: 1em;
    text-align: center;
}
</style>