<template>
  <div class="homepage">
    <!-- Hero Banner -->
    <Banner />

    <!-- Resources Section -->
    <Resources />

    <!-- New Releases Section -->
    <NewReleases />
  </div>
</template>

<script setup>
import Banner from "@/components/Banner.vue";
import Resources from "@/components/Resources.vue";
import NewReleases from "@/components/NewReleases.vue";
import { useMeta } from "vue-meta";

// Set meta tags untuk halaman utama
useMeta({
  title: "Home - Dwimulya Pustaka",
  meta: [
    {
      name: "description",
      content: "Temukan berbagai buku unggulan dari Dwimulya Pustaka.",
    },
    {
      property: "og:title",
      content: "Home - Dwimulya Pustaka",
    },
    {
      property: "og:description",
      content:
        "Penerbit buku berkualitas untuk pengembangan diri, manajemen, dan akademik.",
    },
    {
      property: "og:image",
      content: "/assets/img/dmpustaka.png",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
});
</script>

<style scoped>
.homepage {
  background-color: #f9fafb;
  /* Tailwind's bg-gray-50 */
}
</style>