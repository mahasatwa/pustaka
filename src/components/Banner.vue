<template>
    <section class="relative bg-gray-100 mt-[76px] py-8">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Slider -->
                <div class="col-span-1 md:col-span-2">
                    <div class="relative overflow-hidden rounded-lg" @mouseenter="pauseAutoSlide"
                        @mouseleave="resumeAutoSlide">
                        <div class="flex transition-transform duration-700 ease-in-out"
                            :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                            <div v-for="slide in sliders" :key="slide.id"
                                class="min-w-full bg-cover bg-center rounded-lg min-h-[280px] sm:min-h-[400px]"
                                :style="{ backgroundImage: `url(${resolveBannerImage(slide.image)})` }">
                                <div
                                    class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 flex flex-col justify-end p-4 z-10">
                                    <h2 class="text-2xl sm:text-3xl text-white font-bold mb-2">{{ slide.title }}</h2>
                                    <p class="text-sm sm:text-base text-gray-100 mb-4">{{ slide.subtitle }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Navigation Dots -->
                        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                            <button v-for="(slide, index) in sliders" :key="slide.id" @click="setCurrentIndex(index)"
                                class="w-3 h-3 rounded-full transition-all duration-200" :class="{
                                    'bg-blue-600': currentIndex === index,
                                    'bg-gray-400': currentIndex !== index
                                }"></button>
                        </div>
                    </div>
                </div>

                <!-- Promo Banners -->
                <div class="space-y-6">
                    <div v-for="promo in promos" :key="promo.id"
                        class="relative bg-cover bg-center rounded-lg shadow-md overflow-hidden min-h-[160px] sm:min-h-[188px]"
                        :style="{ backgroundImage: `url(${resolveImage(promo.image)})` }">
                        <div
                            class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 flex flex-col justify-end p-4 z-10">
                            <h3 class="text-lg sm:text-xl font-bold text-white">{{ promo.title }}</h3>
                            <p class="text-xs sm:text-sm text-gray-200">
                                <span v-if="promo.price_old" class="line-through mr-1">{{ promo.price_old }}</span>
                                <span class="font-bold">{{ promo.price_new }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import sliders from "@/assets/json/banner.json";
import promos from "@/assets/json/sticked.json";

export default {
    name: "BannerBlock",
    data() {
        return {
            sliders,
            promos,
            currentIndex: 0,
            intervalId: null,
        };
    },
    methods: {
        setCurrentIndex(index) {
            this.currentIndex = index;
            this.resetInterval();
        },
        startAutoSlide() {
            this.intervalId = setInterval(() => {
                this.currentIndex = (this.currentIndex + 1) % this.sliders.length;
            }, 5000);
        },
        resetInterval() {
            clearInterval(this.intervalId);
            this.startAutoSlide();
        },
        pauseAutoSlide() {
            clearInterval(this.intervalId);
        },
        resumeAutoSlide() {
            this.startAutoSlide();
        },
        resolveBannerImage(image) {
            return require(`@/assets/img/banners/${image}`);
        },
        resolveImage(image) {
            return require(`@/assets/img/books/${image}`);
        },
    },
    mounted() {
        this.startAutoSlide();
    },
    beforeUnmount() {
        clearInterval(this.intervalId);
    },
};
</script>

<style scoped>
/* Opsional: Tambahkan gaya tambahan jika diperlukan */
</style>