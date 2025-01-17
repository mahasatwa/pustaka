<template>
  <div id="app">
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
        name: "description",
        content:
          "Dwimulya Pustaka adalah penerbit buku berkualitas yang menyediakan berbagai karya untuk pengembangan diri, manajemen, akademik, dan literatur populer."
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
        content: "/assets/img/dmpustaka.png"
      }
    ]
  }
};
</script>
