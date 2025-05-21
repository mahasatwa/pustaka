<template>
    <section class="relative bg-gray-100 mt-[76px] py-8">
        <div class="m-container mx-auto grid grid-cols-3 gap-6">
            <!-- Slider -->
            <div class="col-span-2">
                <div class="relative overflow-hidden">
                    <div class="flex transition-transform duration-700 ease-in-out"
                        :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                        <div v-for="slide in sliders" :key="slide.id"
                            class="min-w-full bg-cover bg-center rounded-lg min-h-[400px]"
                            :style="{ backgroundImage: `url(${resolveBannerImage(slide.image)})` }">
                            <div
                                class="inset-0 z-10 bg-gradient-to-b from-transparent from-50% to-black/30 rounded-lg h-full flex flex-col justify-end p-4">
                                <!-- Use justify-end to push content to the bottom -->
                                <h2 class="text-3xl text-white font-bold mb-3">{{ slide.title }}</h2>
                                <p class="text-lg text-gray-100 mb-6">{{ slide.subtitle }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Navigation Dots -->
                    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        <button v-for="(slide, index) in sliders" :key="slide.id" @click="setCurrentIndex(index)"
                            class="w-3 h-3 rounded-full" :class="{
                                'bg-blue-600': currentIndex === index,
                                'bg-gray-400': currentIndex !== index,
                            }"></button>
                    </div>
                </div>
            </div>

            <!-- Promo Banners -->
            <div class="space-y-6">
                <div v-for="promo in promos" :key="promo.id"
                    class="relative bg-cover bg-center rounded-lg shadow-md overflow-hidden"
                    :style="{ backgroundImage: `url(${resolveImage(promo.image)})` }">
                    <div class="inset-0 z-10 bg-gradient-to-b from-transparent from-50% to-black/30 rounded-lg text-white p-4 min-h-[188px] flex flex-col justify-end p-4">
                        <h3 class="text-xl font-bold">{{ promo.title }}</h3>
                        <p class="text-sm" v-if="promo.price_old">
                            <span class="line-through">{{ promo.price_old }}</span>
                            <span class="ml-2 font-bold">{{ promo.price_new }}</span>
                        </p>
                        <p class="text-sm" v-else>
                            <span class="font-bold">{{ promo.price_new }}</span>
                        </p>
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
            }, 5000); // Slide setiap 5 detik
        },
        resetInterval() {
            clearInterval(this.intervalId);
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
/* Custom styling if needed */
</style>