<script>
import { isLoggedIn, getUser } from '../services/authService';
import { nextTick, ref } from 'vue';
import { store } from '../store/store';
import { getToken } from '../services/authService';
// import { useMovieStore } from '../store/index';

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
    // const test = useMovieStore();
    console.log('vuex ', this.$store.state.logged);
    console.log(this.isLogged());
    this.loggedInVar = this.isLogged();
    console.log(this.loggedInVar);
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
  <div class="header-container">
  <div v-if="this.$store.state.logged">
  <span>
  <!-- <div>Greetings, {{username}}</div> -->
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
