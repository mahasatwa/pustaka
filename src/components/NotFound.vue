<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Halaman yang Anda cari tidak ditemukan</p>
    <router-link to="/" class="btn-home">
      Kembali ke Beranda
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 100px 20px;
}

.not-found h1 {
  font-size: 120px;
  margin: 0;
  color: #333;
}

.not-found p {
  font-size: 24px;
  margin: 20px 0 40px;
  color: #666;
}

.btn-home {
  display: inline-block;
  padding: 12px 30px;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s;
}

.btn-home:hover {
  background: #0056b3;
}
</style>