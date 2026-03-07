<template>
    <section class="bg-gray-50 mt-[120px] py-6 md:py-8">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                <!-- Main Slider -->
                <div class="lg:col-span-2">
                    <div class="relative overflow-hidden rounded-lg group bg-white">
                        <!-- Slides -->
                        <div 
                            class="flex transition-transform duration-700 ease-in-out"
                            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
                        >
                            <div 
                                v-for="slide in sliders" 
                                :key="slide.id"
                                class="min-w-full relative"
                            >
                                <!-- Image -->
                                <img 
                                    :src="resolveBannerImage(slide.image)" 
                                    :alt="slide.title"
                                    class="w-full h-[280px] md:h-[400px] object-cover"
                                    @error="handleImageError"
                                />
                                
                                <!-- Gradient Overlay -->
                                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
                                
                                <!-- Content -->
                                <div class="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                    <h2 class="text-xl md:text-3xl font-semibold text-white mb-2 drop-shadow-lg">
                                        {{ slide.title }}
                                    </h2>
                                    <p class="text-sm md:text-base text-gray-100 max-w-2xl drop-shadow-md">
                                        {{ slide.subtitle }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Navigation Arrows -->
                        <button 
                            @click="prevSlide"
                            class="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                            aria-label="Previous slide"
                        >
                            <svg class="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button 
                            @click="nextSlide"
                            class="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                            aria-label="Next slide"
                        >
                            <svg class="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <!-- Dots Navigation -->
                        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            <button 
                                v-for="(slide, index) in sliders" 
                                :key="slide.id" 
                                @click="setCurrentIndex(index)"
                                class="h-1.5 rounded-full transition-all duration-300"
                                :class="currentIndex === index ? 'w-8 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/70'"
                                :aria-label="`Go to slide ${index + 1}`"
                            ></button>
                        </div>
                    </div>
                </div>

                <!-- Promo Cards -->
                <div class="space-y-4 md:space-y-6">
                    <router-link
                        v-for="promo in displayPromos" 
                        :key="promo.id"
                        :to="`/book/${promo.pretty_url || promo.id}`"
                        class="group block relative overflow-hidden rounded-lg bg-white hover:shadow-md transition-shadow"
                    >
                        <!-- Image -->
                        <img 
                            :src="resolveImage(promo.image)" 
                            :alt="promo.title"
                            class="w-full h-[140px] md:h-[180px] object-cover"
                            @error="handleImageError"
                        />
                        
                        <!-- Gradient Overlay -->
                        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 group-hover:to-black/75 transition-all"></div>
                        
                        <!-- Content -->
                        <div class="absolute inset-0 flex flex-col justify-end p-4">
                            <h3 class="text-base md:text-lg font-semibold text-white mb-1 line-clamp-2 group-hover:text-gray-100 transition-colors">
                                {{ promo.title }}
                            </h3>
                            
                            <div class="flex items-baseline gap-2 text-sm">
                                <span v-if="promo.price_old" class="text-gray-300 line-through text-xs">
                                    {{ promo.price_old }}
                                </span>
                                <span class="text-white font-semibold">
                                    {{ promo.price_new }}
                                </span>
                            </div>
                        </div>

                        <!-- Discount Badge -->
                        <div 
                            v-if="promo.discount" 
                            class="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded"
                        >
                            -{{ promo.discount }}%
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import sliders from "@/assets/json/banner.json";
import promos from "@/assets/json/stacked.json";

export default {
    name: "BannerBlock",
    data() {
        return {
            sliders,
            promos,
            currentIndex: 0,
            intervalId: null,
            isTransitioning: false,
        };
    },
    computed: {
        displayPromos() {
            // Show only first 2 promos
            return this.promos.slice(0, 2);
        }
    },
    methods: {
        setCurrentIndex(index) {
            if (this.isTransitioning) return;
            this.currentIndex = index;
            this.resetInterval();
        },
        
        nextSlide() {
            if (this.isTransitioning) return;
            this.isTransitioning = true;
            this.currentIndex = (this.currentIndex + 1) % this.sliders.length;
            this.resetInterval();
            setTimeout(() => {
                this.isTransitioning = false;
            }, 700);
        },
        
        prevSlide() {
            if (this.isTransitioning) return;
            this.isTransitioning = true;
            this.currentIndex = this.currentIndex === 0 
                ? this.sliders.length - 1 
                : this.currentIndex - 1;
            this.resetInterval();
            setTimeout(() => {
                this.isTransitioning = false;
            }, 700);
        },
        
        startAutoSlide() {
            this.intervalId = setInterval(() => {
                this.nextSlide();
            }, 5000);
        },
        
        resetInterval() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
            this.startAutoSlide();
        },
        
        resolveBannerImage(image) {
            try {
                return require(`@/assets/img/banners/${image}`);
            } catch (error) {
                console.warn(`Banner image not found: ${image}`);
                return this.getPlaceholder('1200x400', 'Banner');
            }
        },
        
        resolveImage(image) {
            try {
                return require(`@/assets/img/books/${image}`);
            } catch (error) {
                console.warn(`Book image not found: ${image}`);
                return this.getPlaceholder('400x300', 'Book');
            }
        },
        
        handleImageError(event) {
            event.target.src = this.getPlaceholder('800x400', 'Error');
        },
        
        getPlaceholder(size, text) {
            return `https://via.placeholder.com/${size}?text=${text}&bg=e5e7eb&textColor=6b7280`;
        }
    },
    mounted() {
        this.startAutoSlide();
    },
    beforeUnmount() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    },
};
</script>

<style scoped>
/* Line clamp utility */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Prevent image dragging */
img {
    user-select: none;
    -webkit-user-drag: none;
}
</style>