<script>
import { isLoggedIn, getUser } from '../services/authService';
import { nextTick, ref } from 'vue';
import { store } from '../store/store';
import { getToken } from '../services/authService';

export default {
  
  data() {
    return {
      loading: false,
      errors: [],
      loggedInVar: false,
      renderComponent: true,
      token: getToken(),
      testVar: false,
    };
  },
  created() {
    console.log(this.isLogged());
    this.loggedInVar = this.isLogged();
    console.log(this.loggedInVar);
  },
  beforeUpdate() {
    // this.isLogged();
    this.loggedInVar = this.isLogged();
  },
  updated() {
    // this.isLogged();
    this.loggedInVar = this.isLogged();
  },
  unmounted() {
    this.loggedInVar = this.isLogged();
  },
  activated() {
    this.loggedInVar = this.isLogged();
  },
  methods: {
    isLogged() {
      return this.loggedInVar = isLoggedIn();
    },
    test() {
      console.log('test button logout');
      this.testVar = true;
      console.log(this.testVar);
      this.$emit('testing')
    },
    test2() {
      this.testVar = false;
      this.$emit('testing')
    },
    receiveResponse(){
      console.log('receive response');
      this.testVar = true;
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
  <Status v-on:updateStatus="receiveResponse" />

  <div class="header-container">
  <div>
  <span>
  <!-- <div>Greetings, {{username}}</div> -->
    <router-link to="/logout">
      <div class="link">Logout</div>
    </router-link>
  </span>
  </div>


    <!-- <button @click="test">
    Logout Test2
    </button>
    <div>{{ this.testVar }}</div>
    <button @click="test2">
    Hidden Button
    </button> -->


  <div>
  <span>
    <router-link to="/login">
      <div class="link">Login</div>
    </router-link>
  </span>
  </div>
  <div v-if="this.testVar">
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
    <button>
      <router-link to="/movies">
        <div class="link">Movies</div>
      </router-link>
    </button>
    </span>
     <span v-if="this.token">
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
