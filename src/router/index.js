import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import BookDetail from "@/components/BookDetail.vue";
import AllReleases from "@/components/AllReleases.vue";

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
    },
    {
        path: '/all-releases',
        name: 'AllReleases',
        component: AllReleases,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
