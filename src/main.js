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
    // Global meta tags for SEO and Open Graph
    defaults: {
        titleTemplate: '%s - Dwimulya Pustaka', // Site-wide title template
        meta: [
            { name: 'description', content: 'This is a description of your site for SEO purposes.' },
            { name: 'robots', content: 'index, follow' }, // Ensure search engines index and follow links
            { name: 'author', content: 'Dwimulya Pustaka' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },

            // Open Graph Meta Tags
            { property: 'og:type', content: 'website' }, // type of content: 'website', 'article', etc.
            { property: 'og:title', content: 'Your Site Title' }, // Title that will show on social media
            { property: 'og:description', content: 'A brief description of your site for Open Graph' },
            { property: 'og:url', content: 'https://pustaka.stiedwimulya.ac.id' }, // Your website URL
            { property: 'og:image', content: 'https://pustaka.stiedwimulya.ac.id/img/og-image.jpg' }, // Image URL for social sharing
            { property: 'og:image:alt', content: 'Alt text for the image' }, // Alternative text for the image

            // Twitter Card Meta Tags (useful for Twitter sharing)
            { name: 'twitter:card', content: 'summary_large_image' }, // Image size for Twitter
            { name: 'twitter:site', content: '@pustaka.dm' }, // Your Twitter handle
            { name: 'twitter:title', content: 'Dwimulya Pustaka' },
            { name: 'twitter:description', content: 'Pilihan Buku Terbaik untuk temani perjalanan akademikmu' },
            { name: 'twitter:image', content: 'https://pustaka.stiedwimulya.ac.id/img/twitter-image.jpg' }, // Twitter-specific image URL
        ],
    }
});

app.use(router);
app.use(metaManager);
app.mount("#app");
