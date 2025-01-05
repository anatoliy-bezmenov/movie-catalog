<script>
import { isLoggedIn, getUser } from '../services/authService';
import { nextTick, ref } from 'vue';
import { store } from '../store/store';

export default {

  inject: [
    'test'
    ],

  data() {
    return {
      loading: false,
      errors: [],
      loggedIn: false,
      renderComponent: true,
      logged: this.test,
    };
  },
  created() {
    // this.loading = true;
    // this.loading = false;
    this.isLogged();
  },
  updated() {
    this.isLogged();
  },
  computed: {
    isLogged1() {
      return isLoggedIn();
    },
  },
  methods: {
    async forceRerender() {
      // Remove MyComponent from the DOM
      this.renderComponent = false;
            // Wait for the change to get flushed to the DOM
      await nextTick();
      // Add the component back in
      this.renderComponent = true;
    },
    async isLogged() {
      this.loggedIn = isLoggedIn();
      await nextTick()
      return this.loggedIn;
    },
    // get username() {
    //   let parsedUser = {name: ''};
    //   parsedUser = JSON.parse(getUser());
    //   return parsedUser?.name;
    // },
  },
}
</script>

<template>
  <div class="header-container">
  <div >LoggedIn: {{isLogged1}}</div>
  <div >Store: {{this.logged}}</div>
  <div v-if="isLogged1">
  <span>
  <!-- <div>Greetings, {{username}}</div> -->
    <router-link to="/logout">
      <div class="link">Logout</div>
    </router-link>
  </span>
  </div>
  <div v-if="!isLogged1">
  <span>
    <router-link to="/login">
      <div class="link">Login</div>
    </router-link>
  </span>
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
     <span>
      <router-link to="/movies/create">
        <div class="link">Add Movie</div>
      </router-link>
    </span>
    <span>
    <router-link to="/movies">
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
  
  margin-bottom: 20px;
  gap: 50px;
  background-color: beige;
}

.header-container > span, .header-container > div {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
}

.link {
  font-size: 25px;
  color: black;
}
</style>
