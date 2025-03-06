import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import BookDetail from "@/components/BookDetail.vue";

const routes = [
    {
        path: "/",
        name: "HomePage",
        component: HomePage
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

export default router;
