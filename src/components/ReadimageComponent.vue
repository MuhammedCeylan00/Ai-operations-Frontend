<template>
  <div class="app">
    <!-- Uygulama bileşeni -->
    <h1 class="title">Metin Çıkar</h1>
    <div class="upload">
      <!-- Resim yükleme alanı -->
      <label for="fileInput" class="upload-button">
        Resim Ekle
        <input id="fileInput" type="file" @change="uploadImage" accept="image/*" />
      </label>
    </div>
    <!-- Çıkarılan metnin gösterildiği alan -->
    <div v-if="extractedText.length > 0" class="extracted-text">
      <h2 class="subtitle">Çıkarılan Metin:</h2>
      <p>{{ extractedText }}</p>
    </div>
    <!-- Yüklenme pop-up'ı -->
    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <h2 class="popup-title">Resim Yükleniyor...</h2>
        <div class="loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Çıkarılan metin
      extractedText: '',
      // Yüklenme pop-up'ının görünürlük durumu
      showPopup: false,
    };
  },
  methods: {
    // Resim yükleme işlemi
    uploadImage(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);

      // Yüklenme pop-up'ını göster
      this.showPopup = true;

      // Resimden metin çıkarma API'sine gönder
      fetch('http://127.0.0.1:8000/extract-text', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Çıkarılan metni al ve ekranda göster
          this.extractedText = data.extracted_text;
          this.showPopup = false;
        })
        .catch((error) => {
          console.error(error);
          this.showPopup = false;
        });
    },
  },
};
</script>

  
  <style scoped>
  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .subtitle {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .upload {
    margin-bottom: 20px;
  }
  
  .upload-button {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    border: 2px solid #4caf50;
    border-radius: 5px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .upload-button:hover {
    background-color: #45a049;
  }
  
  .extracted-text {
    text-align: center;
  }
  
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .popup-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }
  
  .popup-title {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
    margin: 0 auto;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  