<template>
  <div class="home">
    <!-- Ana sayfa bileşeni -->
    <h1>{{ welcomeMessage }}</h1>
    <div class="button-container">
      <!-- Etiketleme işlemi sayfasına yönlendirme -->
      <router-link to="/labeling" class="button">Etiketleme işlemi</router-link>
      <!-- Sesi yazıya çevirme sayfasına yönlendirme -->
      <router-link to="/speechtotext" class="button">Sesi yazıya çevirme</router-link>
      <!-- Resimdeki yazıları okuma sayfasına yönlendirme -->
      <router-link to="/readimage" class="button">Resimdeki yazıları okuma</router-link>
      <!-- Yüz tanıma sayfasına yönlendirme -->
      <router-link to="/facedetect" class="button">Yüz tanıma</router-link>
      <!-- Çeviri işlemi sayfasına yönlendirme -->
      <router-link to="/translate" class="button">Çeviri işlemi</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Hoş geldiniz mesajı
      welcomeMessage: 'Bulut bilişim AI işlemlerine Hoş geldiniz.!',
    };
  },
};
</script>


<style>
.home {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.button {
  padding: 10px 20px;
  margin: 5px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #1a58af; /* Yeni renk */
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  transition: background-color 0.3s, box-shadow 0.3s;
}

.button:hover {
  background-color: #1a58af; /* Yeni renk */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
  transform: scale(1.05); /* Küçük bir animasyon */
}

.router-link-exact-active {
  background-color: #1a58af; /* Yeni renk: Aktif butonun rengi */
}
</style>
