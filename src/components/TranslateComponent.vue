<template>
  <div class="app">
    <h1 class="title">Translation Tool</h1>
    <div class="input-container">
      <label for="text-input">Text:</label>
      <textarea id="text-input" v-model="textInput"></textarea>
    </div>
    <div class="input-container">
      <label for="language-select">Select a language:</label>
      <select id="language-select" v-model="selectedLanguage">
        <option value="" disabled>Select a language</option>
        <option v-for="language in languages" :value="language.code" :key="language.code">{{ language.name }}</option>
      </select>
    </div>
    <button class="translate-button" @click="translate" :disabled="isLoading">Translate</button>
    <div class="loading-container" v-if="isLoading">
      <div class="loader"></div>
      <div class="loading-text">Loading...</div>
    </div>
    <div class="result" v-else>
      <h2 class="subtitle">Translated Text:</h2>
      <p>{{ translatedText }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textInput: "",
      selectedLanguage: "",
      translatedText: "",
      isLoading: false
    };
  },
  computed: {
    languages() {
      return [
        { code: "en", name: "English" },
        { code: "fr", name: "French" },
        { code: "es", name: "Spanish" },
        { code: "de", name: "German" },
        { code: "it", name: "Italian" },
        { code: "pt", name: "Portuguese" },
        { code: "ru", name: "Russian" },
        { code: "zh", name: "Chinese" },
        { code: "ja", name: "Japanese" },
        { code: "ko", name: "Korean" }

        // Add other languages...
      ];
    }
  },
  methods: {
    translate() {
      if (this.textInput && this.selectedLanguage) {
        const data = {
          target_language: this.selectedLanguage,
          text: this.textInput
        };

        this.isLoading = true;

        fetch("http://127.0.0.1:8000/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
          .then((response) => response.json())
          .then((data) => {
            this.translatedText = data.translated_text;
            this.isLoading = false;
          })
          .catch((error) => {
            console.error(error);
            this.isLoading = false;
          });
      }
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

textarea,
select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

.translate-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-left: 10px;
}

.result {
  margin-top: 20px;
}

.subtitle {
  font-size: 18px;
  margin-bottom: 10px;
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