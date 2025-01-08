<script>
import { removeToken, getToken } from '../services/authService';
export default {


  data() {
    return {
      token: getToken(),
    };
  },
  created() {
    if (!this.token) {
      this.$router.push('/movies');
    };
    removeToken();
    this.$store.state.logged = false;
  },
  methods: {
  },
};
</script>

<template>
<span class="image-container">
  <img src="https://images3.alphacoders.com/674/674364.jpg"> 
</span>
<div class="logout-container">
    <h1>Successfully logged out</h1>
    <p class="go-to"><span class="go-to-title">Go to:</span>
    <span class="rows1">
    <router-link to="/login">
        <div class="link">Login</div>
    </router-link>
    <router-link to="/register">
        <div class="link">Register</div>
    </router-link>
    <router-link to="/movies">
        <div class="link">Movies</div>
    </router-link>
    <router-link to="/search">
        <div class="link">Search</div>
    </router-link>
    </span>
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
  margin-left: -175px;
  margin-top: 10px;
}

h1 {
  margin-bottom: 50px;
  margin-left: 50px;
  width: 600px;
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

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 10px;
}

</style>