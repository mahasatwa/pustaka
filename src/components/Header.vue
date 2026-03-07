<template>
    <header class="fixed top-0 w-full bg-white border-b border-gray-200 z-50 transition-all duration-300">
        <div class="container mx-auto px-4">
            <!-- Main Header -->
            <div class="flex items-center justify-between h-16 md:h-[76px]">
                <!-- Logo -->
                <router-link to="/" class="flex items-center gap-2.5 flex-shrink-0">
                    <img :src="logo" alt="Dwimulya Pustaka" class="h-7" />
                    <span class="text-lg font-semibold text-gray-900 hidden sm:inline">Dwimulya Pustaka</span>
                </router-link>

                <!-- Search Bar - Desktop -->
                <div class="hidden md:flex flex-1 max-w-2xl mx-6">
                    <div class="relative w-full">
                        <div class="flex items-center bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors overflow-hidden">
                            <!-- Category Selector -->
                            <div class="relative">
                                <select 
                                    v-model="selectedCategory"
                                    class="appearance-none bg-transparent border-r border-gray-200 text-gray-700 text-sm pl-4 pr-8 py-2.5 cursor-pointer hover:bg-gray-100 transition-colors focus:outline-none"
                                >
                                    <option value="">Semua</option>
                                    <option value="akuntansi">Akuntansi</option>
                                    <option value="manajemen">Manajemen</option>
                                    <option value="ekonomi">Ekonomi</option>
                                </select>
                                <svg class="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            
                            <!-- Search Input -->
                            <input 
                                v-model="searchQuery"
                                type="text"
                                class="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-500 px-4 py-2.5 focus:outline-none"
                                placeholder="Cari judul, penulis, atau ISBN..."
                                @keyup.enter="performSearch"
                            />
                            
                            <!-- Search Button -->
                            <button 
                                @click="performSearch"
                                class="px-4 text-gray-600 hover:text-gray-900 transition-colors"
                                aria-label="Search"
                            >
                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Desktop Navigation -->
                <nav class="hidden lg:flex items-center gap-6 flex-shrink-0">
                    <router-link 
                        v-for="link in navLinks" 
                        :key="link.name"
                        :to="link.path"
                        class="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        {{ link.name }}
                    </router-link>
                </nav>

                <!-- Auth Buttons - Desktop -->
                <div class="hidden md:flex items-center gap-3 ml-6 flex-shrink-0">
                    <button 
                        @click="handleLogin"
                        class="text-sm text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Masuk
                    </button>
                    <button 
                        @click="handleRegister"
                        class="text-sm text-white bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors"
                    >
                        Daftar
                    </button>
                </div>

                <!-- Mobile Actions -->
                <div class="flex md:hidden items-center gap-2">
                    <!-- Search Icon - Mobile -->
                    <button 
                        @click="toggleMobileSearch"
                        class="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                        aria-label="Search"
                    >
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    <!-- Menu Icon - Mobile -->
                    <button 
                        @click="toggleMobileMenu"
                        class="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                        aria-label="Menu"
                    >
                        <svg v-if="!isMobileMenuOpen" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Mobile Search Bar -->
            <transition name="slide-down">
                <div v-show="isMobileSearchOpen" class="md:hidden pb-4">
                    <div class="flex flex-col gap-2">
                        <select 
                            v-model="selectedCategory"
                            class="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-gray-300"
                        >
                            <option value="">Semua Kategori</option>
                            <option value="akuntansi">Akuntansi</option>
                            <option value="manajemen">Manajemen</option>
                            <option value="ekonomi">Ekonomi</option>
                        </select>
                        
                        <div class="relative">
                            <input 
                                v-model="searchQuery"
                                type="text"
                                class="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:border-gray-300"
                                placeholder="Cari judul, penulis, atau ISBN..."
                                @keyup.enter="performSearch"
                            />
                            <button 
                                @click="performSearch"
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                            >
                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </transition>

            <!-- Mobile Menu -->
            <transition name="slide-down">
                <div v-show="isMobileMenuOpen" class="md:hidden border-t border-gray-200 py-4">
                    <nav class="flex flex-col">
                        <router-link 
                            v-for="link in navLinks" 
                            :key="link.name"
                            :to="link.path"
                            class="text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 transition-colors rounded-lg"
                            @click="isMobileMenuOpen = false"
                        >
                            {{ link.name }}
                        </router-link>
                    </nav>

                    <!-- Mobile Auth Buttons -->
                    <div class="flex gap-2 mt-4 px-4">
                        <button 
                            @click="handleLogin"
                            class="flex-1 text-sm text-gray-700 border border-gray-200 hover:bg-gray-50 px-4 py-2.5 rounded-lg transition-colors"
                        >
                            Masuk
                        </button>
                        <button 
                            @click="handleRegister"
                            class="flex-1 text-sm text-white bg-gray-900 hover:bg-gray-800 px-4 py-2.5 rounded-lg transition-colors"
                        >
                            Daftar
                        </button>
                    </div>
                </div>
            </transition>
        </div>
    </header>
</template>

<script>
export default {
    name: "HeaderComponent",
    data() {
        return {
            logo: require("@/assets/img/dmpustaka.png"),
            isMobileMenuOpen: false,
            isMobileSearchOpen: false,
            searchQuery: "",
            selectedCategory: "",
            navLinks: [
                { name: "Katalog", path: "/catalog" },
                { name: "Promo", path: "/promo" },
                { name: "Tentang", path: "/about" },
                { name: "Kontak", path: "/contact" },
            ],
        };
    },
    methods: {
        toggleMobileMenu() {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
            if (this.isMobileMenuOpen) {
                this.isMobileSearchOpen = false;
            }
        },
        
        toggleMobileSearch() {
            this.isMobileSearchOpen = !this.isMobileSearchOpen;
            if (this.isMobileSearchOpen) {
                this.isMobileMenuOpen = false;
            }
        },
        
        performSearch() {
            if (this.searchQuery.trim()) {
                this.$router.push({
                    path: '/search',
                    query: {
                        q: this.searchQuery,
                        category: this.selectedCategory
                    }
                });
                this.isMobileSearchOpen = false;
            }
        },
        
        handleLogin() {
            // Implement login logic
            this.$router.push('/login');
            this.isMobileMenuOpen = false;
        },
        
        handleRegister() {
            // Implement register logic
            this.$router.push('/register');
            this.isMobileMenuOpen = false;
        },
    },
    watch: {
        $route() {
            // Close mobile menu on route change
            this.isMobileMenuOpen = false;
            this.isMobileSearchOpen = false;
        }
    }
};
</script>

<style scoped>
/* Slide down animation */
.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.3s ease;
    max-height: 500px;
    opacity: 1;
}

.slide-down-enter-from,
.slide-down-leave-to {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
}

/* Remove default select arrow in WebKit */
select::-ms-expand {
    display: none;
}

/* Smooth transitions */
button, a, input, select {
    transition: all 0.2s ease;
}

/* Focus states */
input:focus,
select:focus {
    outline: none;
}

/* Active link styling */
.router-link-active {
    color: #111827;
    font-weight: 500;
}
</style>