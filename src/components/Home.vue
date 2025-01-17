<template>
  <div>
    <Banner />
    <Resources />
    <NewReleases />
  </div>
</template>

<script>
import Banner from "@/components/Banner.vue";
import NewReleases from "@/components/NewReleases.vue";

export default {
  name: "HomePage",
  components: {
    Banner,
    NewReleases
  },
  metaInfo: {
    title: "Home - Dwimulya Pustaka",
    meta: [
      {
        name: "description",
        content: "Temukan berbagai buku unggulan dari Dwimulya Pustaka."
      },
      {
        property: "og:title",
        content: "Home - Dwimulya Pustaka"
      },
      {
        property: "og:description",
        content: "Penerbit buku berkualitas untuk pengembangan diri, manajemen, dan akademik."
      },
      {
        property: "og:image",
        content: "/assets/img/dmpustaka.png"
      },
      {
        property: "og:type",
        content: "website"
      }
    ]
  }
};
</script>
