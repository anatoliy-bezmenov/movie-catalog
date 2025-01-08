<script>
import { getUser } from '../services/authService';
import { store } from '../store/store';

export default {
  
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
  },
}
</script>

<template>
  <div class="header-container">
  <div v-if="this.$store.state.logged">
  <span>
    <router-link to="/logout">
      <div class="link">Logout</div>
    </router-link>
  </span>
  </div>

  <div v-if="!this.$store.state.logged">
  <span>
    <router-link to="/login">
      <div class="link">Login</div>
    </router-link>
  </span>
  </div>
  <div v-if="!this.$store.state.logged">
  <span>
    <router-link to="/register">
      <div class="link">Register</div>
    </router-link>
  </span>
  </div>
    <span>
      <router-link to="/">
        <div class="link">Home</div>
      </router-link>
    </span>
    <span>
      <router-link to="/movies">
        <div class="link">Movies</div>
      </router-link>
    </span>
     <span v-if="this.$store.state.logged">
      <router-link to="/movies/create">
        <div class="link">Add Movie</div>
      </router-link>
    </span>
    <span>
    <router-link to="/search">
      <div class="link">Search</div>
    </router-link>
    </span>
  </div>
</template>

<style scoped>

.header-container {
  display: flex;
  margin: auto;
  justify-content: center;
  gap: 50px;
  background-color: beige;
  margin-top: -5px;
  background-color: #E74C3C;
  background-image: linear-gradient(#E74C3C, #1C1C1E);
  height: 100px;
}

.header-container > span, .header-container > div {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.link {
  font-size: 25px;
  color: #FFF;
}
</style>
