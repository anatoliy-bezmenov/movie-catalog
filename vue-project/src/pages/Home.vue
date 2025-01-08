<script>
import { getMovies, getMovieByIdNoUser, getMovieById, deleteMovieById } from '../services/movieService';
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
    };
  },
  created() {
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
  },
  methods: {
    // fetchMovies() {
    // },
  },
};
</script>

<template>
          <span class="image-container">
           <img src="../assets/home.png"> 
          </span>
          <span class="home-container">
          <div class="body" v-if="!this.isGuest">
          <h1>Welcome Home, {{ this.parsedUser.name }}</h1>
          </div>

          <div class="body" v-else>
          <h1></h1>
          </div>

          <div class="main">
          <div class="main-title">This website is all about movies!</div>
          <div class="main-body">You can browse movies, read detailed information about them and add new movies to the catalog.</div>
          </div>
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

.body > h1 {
    width: 900px;
}

.image-container > img {
  z-index: -1;
  display: flex;
  margin-bottom: -500px;
  height: 100vh;
  width: 1920px;
}

h1 {
    color: #FFF;
}
</style>