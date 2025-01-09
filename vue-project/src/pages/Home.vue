<script>
import { getToken, getUser } from '../services/authService';

export default {
  data() {
    return {
      movies: [],
      errors: [],
      movie: {},
      token: '',
      user: '',
      parsedUser: '',
      isGuest: true,
      showText: false,
    };
  },
  mounted() {
    this.user = getUser();
    this.token = getToken();
    if (this.user) {
        this.parsedUser = JSON.parse(this.user);
    };
    if (this.user) {
        this.isGuest = false;
    } else {
        this.isGuest = true;
    };
    if (!this.token) {
      this.$store.state.logged = false;
    } else {
      this.$store.state.logged = true;
    };
    this.showText = true;
  },
  methods: {
    
  },
};
</script>

<template>
          <span class="image-container">
           <img src="../assets/home.png"> 
          </span>
          <span class="home-container">
          <div class="body" v-if="!this.isGuest">
          <h1 class="welcome">Welcome, {{ this.parsedUser.name }}</h1>
          </div>

          <div class="body" v-else>
          <h1></h1>
          </div>

          <transition name="fade">
          <div v-if="showText" class="main">
          <div class="main-title">This website is all about movies!</div>
          <div class="main-body">You can browse movies, read detailed information about them and add new movies to the catalog.</div>
          </div>
          </transition>
        </span>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 40%;
  margin-bottom: 475px;
}

.main-title {
    margin-bottom: 20px;
}

.main {
    dispaly: flex;
    flex-direction: column;
    margin-top: 150px;
    margin-left: 150px;
    font-size: 30px;
}

.body {
    margin-left: 150px;
    margin-top: -375px;
}

.welcome {
    width: 900px;
    color: #FFF;
    margin-left: 50px;
}

.image-container > img {
  z-index: -1;
  display: flex;
  margin-bottom: -500px;
  height: 100vh;
  width: 1920px;
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