<template>
  <section class="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
    <div class="container mx-auto px-4">
      <!-- Header Section -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            📚 Rilis Terbaru
          </h2>
          <p class="text-gray-600 text-sm lg:text-base">
            Koleksi terbaru dari Dwimulya Pustaka
          </p>
        </div>
        <router-link
          to="/all-releases"
          class="inline-flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg group"
        >
          Lihat Semua
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </router-link>
      </div>

      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-[300px_1fr] gap-6 lg:gap-8">
        <!-- Sidebar Banner -->
        <aside
          class="relative bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl shadow-xl overflow-hidden group"
        >
          <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          
          <div class="relative z-10 p-6 lg:p-8 flex flex-col h-full">
            <div class="flex-1">
              
              <h3 class="text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
                Rilis Terbaru
              </h3>
              
              <p class="text-blue-100 text-sm lg:text-base mb-6">
                Temukan buku-buku terbaru yang telah kami terbitkan untuk Anda
              </p>

              <div class="space-y-3 mb-6">
                <div class="flex items-center gap-3 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-sm">Kualitas Terjamin</span>
                </div>
                <div class="flex items-center gap-3 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-sm">Diskon Spesial</span>
                </div>
                <div class="flex items-center gap-3 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-sm">Penulis Berpengalaman</span>
                </div>
              </div>
            </div>

            <!-- Image with overlay -->
            <div class="relative mt-auto">
              <div class="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent rounded-xl"></div>
              <img
                :src="imageAssetsResolver('rilis.jpg')"
                alt="Ilustrasi Rilis Terbaru"
                class="w-full h-48 lg:h-64 object-cover rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-500"
                @error="handleBannerError"
              />
            </div>
          </div>
        </aside>

        <!-- Books Grid -->
        <div class="min-h-[400px]">
          <!-- Loading State -->
          <div v-if="isLoading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            <div
              v-for="n in 8"
              :key="n"
              class="animate-pulse"
            >
              <div class="bg-gray-200 rounded-xl aspect-[3/4] mb-3"></div>
              <div class="bg-gray-200 h-4 rounded mb-2"></div>
              <div class="bg-gray-200 h-3 rounded w-3/4"></div>
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-else-if="!books || books.length === 0"
            class="flex flex-col items-center justify-center py-16 text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-24 w-24 text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h3 class="text-xl font-semibold text-gray-700 mb-2">Belum Ada Buku</h3>
            <p class="text-gray-500">Rilis terbaru akan segera hadir</p>
          </div>

          <!-- Books Grid Content -->
          <div
            v-else
            class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            <article
              v-for="(book, index) in books"
              :key="book.id"
              class="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2"
              :class="{ 'animate-fade-in-up': !isLoading }"
              :style="{ animationDelay: `${index * 80}ms` }"
            >
              <router-link
                :to="`/book/${book.pretty_url}`"
                class="block"
                :aria-label="`Lihat detail ${book.title}`"
              >
                <!-- Image Container -->
                <div class="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                  <!-- Discount Badge -->
                  <div
                    v-if="book.discount"
                    class="absolute top-2 left-2 z-10 bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse-slow"
                  >
                    {{ book.discount }}
                  </div>

                  <!-- New Badge -->
                  <div
                    class="absolute top-2 right-2 z-10 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                  >
                    NEW
                  </div>

                  <!-- Book Image -->
                  <img
                    :src="resolveImage(book.image)"
                    :alt="book.title"
                    class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    @error="handleImageError"
                  />

                  <!-- Overlay on Hover -->
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4"
                  >
                    <span
                      class="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg"
                    >
                      Lihat Detail
                    </span>
                  </div>
                </div>

                <!-- Book Info -->
                <div class="p-3 lg:p-4">
                  <!-- Title -->
                  <h4
                    class="font-bold text-sm lg:text-base text-gray-900 line-clamp-2 h-10 lg:h-12 mb-2 group-hover:text-blue-600 transition-colors"
                  >
                    {{ book.title }}
                  </h4>

                  <!-- Author -->
                  <p
                    class="text-gray-600 text-xs lg:text-sm line-clamp-1 mb-3 flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span class="truncate">{{ book.author }}</span>
                  </p>

                  <!-- Price Section -->
                  <div class="flex items-end justify-between gap-2">
                    <div class="flex flex-col">
                      <span
                        v-if="book.price_old"
                        class="text-gray-400 line-through text-xs"
                      >
                        {{ book.price_old }}
                      </span>
                      <span class="text-red-600 font-bold text-base lg:text-lg">
                        {{ book.price_new }}
                      </span>
                    </div>

                    <!-- Add to Cart Button (Optional) -->
                    <button
                      class="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors shadow-md hover:shadow-lg"
                      @click.prevent="addToCart(book)"
                      :aria-label="`Tambah ${book.title} ke keranjang`"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  <!-- Publication Date (Optional) -->
                  <div
                    v-if="book.publication_date"
                    class="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{{ formatDate(book.publication_date) }}</span>
                  </div>
                </div>
              </router-link>
            </article>
          </div>

          <!-- View All Button (Mobile) -->
          <div class="mt-8 text-center lg:hidden">
            <router-link
              to="/all-releases"
              class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Lihat Semua Buku
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
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
  name: 'NewReleases',
  
  data() {
    return {
      books,
      isLoading: false,
    };
  },

  mounted() {
    // Simulate loading (remove in production if data is already available)
    this.simulateLoading();
  },

  methods: {
    /**
     * Resolve book image path
     */
    resolveImage(image) {
      try {
        return require(`@/assets/img/books/${image}`);
      } catch (error) {
        console.warn(`Image not found: ${image}`);
        return this.getPlaceholderImage();
      }
    },

    /**
     * Resolve banner image path
     */
    imageAssetsResolver(image) {
      try {
        return require(`@/assets/img/${image}`);
      } catch (error) {
        console.warn(`Banner image not found: ${image}`);
        return this.getPlaceholderImage();
      }
    },

    /**
     * Handle image load error
     */
    handleImageError(event) {
      event.target.src = this.getPlaceholderImage();
      event.target.classList.add('opacity-50');
    },

    /**
     * Handle banner image error
     */
    handleBannerError(event) {
      event.target.src = this.getPlaceholderImage(400, 300);
      event.target.classList.add('opacity-50');
    },

    /**
     * Get placeholder image
     */
    getPlaceholderImage(width = 300, height = 400) {
      return `https://via.placeholder.com/${width}x${height}/e5e7eb/6b7280?text=No+Image`;
    },

    /**
     * Format publication date
     */
    formatDate(dateString) {
      if (!dateString) return '';
      
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) return dateString;
      
      return new Intl.DateTimeFormat('id-ID', options).format(date);
    },

    /**
     * Add book to cart (placeholder - implement your cart logic)
     */
    addToCart(book) {
      // Implement your add to cart logic here
      console.log('Adding to cart:', book.title);
      
      // Example: emit event to parent or use Vuex/Pinia
      this.$emit('add-to-cart', book);
      
      // Show notification (you can use a toast library)
      alert(`"${book.title}" ditambahkan ke keranjang!`);
    },

    /**
     * Simulate loading state (remove in production)
     */
    simulateLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 800);
    },
  },
};
</script>

<style scoped>
/* Line clamp utilities */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Fade in up animation */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
  opacity: 0;
}

/* Slow pulse for discount badge */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Focus styles for accessibility */
a:focus-visible,
button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform;
}

/* Prevent layout shift during image load */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Responsive text scaling */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Print styles */
@media print {
  .hover\:shadow-2xl,
  .group-hover\:scale-110 {
    box-shadow: none !important;
    transform: none !important;
  }
  
  button {
    display: none;
  }
}
</style>