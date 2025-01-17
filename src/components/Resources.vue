<template>
    <section class="py-12 bg-gray-50">
        <div class="container mx-auto px-4">
            <h3 class="text-xl font-semibold mb-6">Sumber Daya Untuk...</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div class="bg-white shadow rounded p-4 text-center">
                    <p class="font-semibold">Mahasiswa</p>
                </div>
                <div class="bg-white shadow rounded p-4 text-center">
                    <p class="font-semibold">Dosen</p>
                </div>
                <div class="bg-white shadow rounded p-4 text-center">
                    <p class="font-semibold">Peneliti</p>
                </div>
                <div class="bg-white shadow rounded p-4 text-center">
                    <p class="font-semibold">Perpustakaan</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "ResourcesBlock",
};
</script>