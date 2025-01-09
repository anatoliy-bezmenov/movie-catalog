<script>
import { getToken, getUser } from '../services/authService';

export default {
  data() {
    return {
      showText: false,
    };
  },
  mounted() {
    this.showText = true;
    this.id = this.$route.params.movieId
    this.token = getToken();
    if (!this.token) {
      this.$store.state.logged = false;
    } else {
      this.$store.state.logged = true;
    };
    this.user = getUser();
  },
  methods: {
  },
};
</script>

<template>
<span class="image-container">
  <img src="../assets/404.png"> 
</span>
<div class="not-found-container">
    <h1>This is not the page you were looking for</h1>
    <p class="go-to"><span class="go-to-title">Go to:</span>
    <transition name="fade">
    <span v-if="showText" class="rows1">
    <router-link to="/">
        <div class="link">Home</div>
    </router-link>
    <router-link to="/movies">
        <div class="link">Movies</div>
    </router-link>
    <router-link to="/search">
        <div class="link">Search</div>
    </router-link>
    </span>
    </transition>
    </p>
</div>
</template>

<style scoped>

.image-container > img {
  z-index: -1;
  display: flex;
  margin-bottom: -850px;
  height: 100vh;
  width: 1920px;
}

.not-found-container {
  display: flex;
  margin: auto;
  width: 500px;
  flex-direction: column;
  margin-top: -50px;
}

.go-to {
  margin-left: 225px;
  margin-top: -25px;
  margin-bottom: 650px;
}

.go-to-title {
  color: #FFF;
  font-size: 30px;
}

.rows1 {
  display: flex;
  flex-direction: row;
  gap: 50px;
  margin-left: -100px;
  margin-top: 10px;
}

h1 {
  margin-bottom: 50px;
  margin-left: -80px;
  width: 800px;
  color: #FFF;
}

.link {
  color: rgb(255, 140, 0);
  cursor: pointer;
}

h2 {
    display: flex;
    margin: auto;
    width: 100px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.link:hover {
  color: #FFF;
}

.error {
  color: red;
  margin-top: 10px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-text {
  color: #FFF;
}
</style>