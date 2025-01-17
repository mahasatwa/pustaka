import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import BookDetail from "@/components/BookDetail.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/book/:pretty_url",
        name: "BookDetail",
        component: BookDetail,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    // Set default title jika meta tidak ditemukan
    const defaultTitle = "Dwimulya Pustaka - Penerbit Buku Berkualitas";
    const metaTitle = to.meta?.title || defaultTitle;
    document.title = metaTitle;
    next();
});

export default router;
