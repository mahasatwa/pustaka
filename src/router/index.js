import { createRouter, createWebHistory } from "vue-router";

// Hapus semua import komponen di atas, gunakan lazy loading di bawah
const routes = [
    {
        path: "/",
        name: "HomePage",
        component: () => import('@/components/HomePage.vue'), // Lazy load
        meta: {
            title: "Beranda",
            description: "Dwimulya Pustaka - Penerbit buku berkualitas untuk pengembangan diri, manajemen, akademik, dan literatur populer.",
            keywords: "dwimulya pustaka, penerbit buku, buku terbaru"
        }
    },
    {
        path: "/book/:pretty_url",
        name: "BookDetail",
        component: () => import('@/components/BookDetail.vue'), // Lazy load
        props: true,
        meta: {
            title: "Detail Buku",
            description: "Informasi lengkap tentang buku terbitan Dwimulya Pustaka."
        }
    },
    {
        path: '/all-releases',
        name: 'AllReleases',
        component: () => import('@/components/AllReleases.vue'), // Lazy load
        meta: {
            title: "Semua Terbitan",
            description: "Jelajahi semua koleksi buku terbitan Dwimulya Pustaka.",
            keywords: "daftar buku, katalog buku, semua terbitan"
        }
    },
    // 404 Not Found - Catch all route
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/components/NotFound.vue'), // Lazy load
        meta: {
            title: "Halaman Tidak Ditemukan",
            description: "Halaman yang Anda cari tidak ditemukan."
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    // Scroll ke atas setiap kali pindah halaman
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            // Kembali ke posisi sebelumnya jika user klik back button
            return savedPosition;
        } else if (to.hash) {
            // Scroll ke element dengan ID tertentu jika ada hash
            return {
                el: to.hash,
                behavior: 'smooth'
            };
        } else {
            // Scroll ke atas untuk navigasi normal
            return { top: 0, behavior: 'smooth' };
        }
    }
});

// Navigation Guard untuk update page title dan meta tags
router.beforeEach((to, from, next) => {
    // Update document title
    const title = to.meta.title 
        ? `${to.meta.title} | Dwimulya Pustaka` 
        : 'Dwimulya Pustaka - Penerbit Buku Berkualitas';
    document.title = title;
    
    // Update meta description
    if (to.meta.description) {
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', to.meta.description);
        }
    }
    
    next();
});

// Error handling untuk navigasi
router.onError((error) => {
    console.error('Router error:', error);
});

export default router;