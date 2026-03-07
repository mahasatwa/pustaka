<template>
  <div id="app" class="app-container">
    <Header />
    <router-view /> <!-- Tempat di mana konten rute akan dimuat -->
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  metaInfo: {
    // Metadata global sebagai fallback
    title: "Dwimulya Pustaka - Penerbit Buku Berkualitas",
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        name: "description",
        content:
          "Dwimulya Pustaka adalah penerbit buku berkualitas yang menyediakan berbagai karya untuk pengembangan diri, manajemen, akademik, dan literatur populer."
      },
      {
        property: "og:type",
        content: "website"
      },
      {
        property: "og:title",
        content: "Dwimulya Pustaka - Penerbit Buku Berkualitas"
      },
      {
        property: "og:description",
        content:
          "Temukan buku berkualitas terbitan Dwimulya Pustaka untuk manajemen, pengembangan diri, dan literatur populer."
      },
      {
        property: "og:image",
        content: "https://yourdomain.com/assets/img/dmpustaka.png"
      },
      {
        property: "og:url",
        content: "https://yourdomain.com"
      },
      {
        name: "twitter:card",
        content: "summary_large_image"
      },
      {
        name: "twitter:title",
        content: "Dwimulya Pustaka - Penerbit Buku Berkualitas"
      },
      {
        name: "twitter:description",
        content:
          "Temukan buku berkualitas terbitan Dwimulya Pustaka untuk manajemen, pengembangan diri, dan literatur populer."
      },
      {
        name: "twitter:image",
        content: "https://yourdomain.com/assets/img/dmpustaka.png"
      }
    ]
  }
};
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>