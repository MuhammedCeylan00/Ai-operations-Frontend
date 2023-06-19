<template>
  <div class="app">
    <!-- Uygulama bileşeni -->
    <h1 class="title">Konuşma Aktarımı</h1>
    <div class="input-container">
      <!-- Ses dosyası yükleme alanı -->
      <label for="audio">Ses Dosyası:</label>
      <input type="file" id="audio" @change="handleAudioFile" accept=".flac">
    </div>
    <!-- Aktarımı başlatan düğme -->
    <button @click="transcribe" class="transcribe-button" :disabled="transcribing">Aktarımı Başlat</button>
    <!-- Aktarım yapılırken gösterilen yüklenme durumu -->
    <div v-if="transcribing" class="loading">Aktarım yapılıyor...</div>
    <!-- Aktarım sonucu gösterilen metin -->
    <div v-else-if="transcription" class="result">
      <h2 class="subtitle">Aktarılan Metin:</h2>
      <p>{{ transcription }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Seçilen ses dosyası
      audioFile: null,
      // Aktarım işleminin devam ettiği durumu
      transcribing: false,
      // Aktarılan metin
      transcription: ""
    };
  },
  methods: {
    // Ses dosyasını işleme
    handleAudioFile(event) {
      this.audioFile = event.target.files[0];
    },
    // Aktarım işlemini başlatma
    transcribe() {
      if (!this.audioFile) {
        alert("Lütfen bir ses dosyası seçin.");
        return;
      }

      const formData = new FormData();
      formData.append("audio", this.audioFile);

      this.transcribing = true;

      // Ses dosyasını aktarım API'sine gönder
      fetch("http://127.0.0.1:8000/transcribe", {
        method: "POST",
        body: formData
      })
        .then((response) => response.json())
        .then((data) => {
          // Aktarılan metni al ve ekranda göster
          if (data.transcription) {
            this.transcription = data.transcription;
          } else {
            this.transcription = "Aktarım yapılamadı.";
          }
        })
        .catch((error) => {
          console.error(error);
          this.transcription = "Aktarım yapılamadı.";
        })
        .finally(() => {
          this.transcribing = false;
        });
    }
  }
};
</script>

  
  <style scoped>
  .app {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .input-container {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="file"] {
    width: 100%;
    padding: 10px;
    font-size: 16px;
  }
  
  .transcribe-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .loading {
    margin-top: 20px;
  }
  
  .result {
    margin-top: 20px;
  }
  
  .subtitle {
    font-size: 18px;
    margin-bottom: 10px;
  }
  </style>
  