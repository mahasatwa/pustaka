import { createApp } from "vue";
import App from "./App.vue";
import './assets/css/main.css';
import router from "./router";
import { createMetaManager } from "vue-meta";

const app = createApp(App);

const metaManager = createMetaManager({
    meta: { 
        tag: 'meta', 
        nameless: true 
    },
    // Global meta tags default untuk seluruh website
    defaults: {
        titleTemplate: '%s | Dwimulya Pustaka', // Template title untuk semua halaman
        meta: [
            // Basic Meta Tags
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
            { name: 'description', content: 'Dwimulya Pustaka - Penerbit buku berkualitas untuk pengembangan diri, manajemen, akademik, dan literatur populer.' },
            { name: 'keywords', content: 'dwimulya pustaka, penerbit buku, buku manajemen, buku akademik, buku pengembangan diri' },
            { name: 'author', content: 'Dwimulya Pustaka' },
            { name: 'robots', content: 'index, follow' },
            
            // Open Graph Meta Tags (Facebook, LinkedIn, WhatsApp)
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: 'Dwimulya Pustaka' },
            { property: 'og:title', content: 'Dwimulya Pustaka - Penerbit Buku Berkualitas' },
            { property: 'og:description', content: 'Temukan buku berkualitas terbitan Dwimulya Pustaka untuk manajemen, pengembangan diri, dan literatur populer.' },
            { property: 'og:url', content: 'https://pustaka.stiedwimulya.ac.id' },
            { property: 'og:image', content: 'https://pustaka.stiedwimulya.ac.id/assets/img/dmpustaka.png' },
            { property: 'og:image:alt', content: 'Logo Dwimulya Pustaka' },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            { property: 'og:locale', content: 'id_ID' },
            
            // Twitter Card Meta Tags
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: 'Dwimulya Pustaka - Penerbit Buku Berkualitas' },
            { name: 'twitter:description', content: 'Pilihan buku terbaik untuk temani perjalanan akademikmu. Penerbit buku berkualitas untuk pengembangan diri dan manajemen.' },
            { name: 'twitter:image', content: 'https://pustaka.stiedwimulya.ac.id/assets/img/dmpustaka.png' },
            { name: 'twitter:image:alt', content: 'Logo Dwimulya Pustaka' },
        ],
    }
});

app.use(router);
app.use(metaManager);
app.mount("#app");