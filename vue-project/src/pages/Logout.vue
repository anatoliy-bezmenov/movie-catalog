<script>
import { removeToken, getToken } from '../services/authService';
export default {


  data() {
    return {
      token: getToken(),
      showText: false,
    };
  },
  mounted() {
    this.showText = true;
    if (!this.token) {
      this.$router.push('/movies');
    };
    removeToken();
    this.$store.state.logged = false;
  },
};
</script>

<template>
<span class="image-container">
  <img src="../assets/logout.png"> 
</span>
<div class="logout-container">
    <h1>Successfully logged out</h1>
    <p class="go-to"><span class="go-to-title">Go to:</span>
    <transition name="fade">
    <span v-if="showText" class="rows1">
    <router-link to="/login">
        <div class="link">Login</div>
    </router-link>
    <router-link to="/register">
        <div class="link">Register</div>
    </router-link>
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

.logout-container {
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
  margin-left: -205px;
  margin-top: 10px;
}

h1 {
  margin-bottom: 50px;
  margin-left: 50px;
  width: 600px;
  color: #FFF;
}

.link {
  color: rgb(255, 140, 0);
  cursor: pointer;
}

.link:hover {
  color: #FFF;
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