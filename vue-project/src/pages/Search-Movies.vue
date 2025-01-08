<script>
import { getMovies, searchMovie } from '../services/movieService';
import { getToken } from '../services/authService';

export default {
  data() {
    return {
      movies: [],
      loading: false,
      errors: [],
      movie: {},
      token: getToken(),
      movieName: '',
      inputValue: "",
    };
  },
  created() {
    if (this.token) {
      this.$store.state.logged = true;
    } else {
      this.$store.state.logged = false;
    };
    this.fetchMovies();
  },
  methods: {
    fetchMovies() {
      getMovies()
        .then((response) => {
          this.movies = response;
        })
        .catch((error) => {
          this.errors.push('Cannot fetch data');
        });
    },
    fetchGameByName() {
      searchMovie(this.movieName)
      .then((response) => {
        this.movies = response;
      })
    },
  },
};
</script>

<template>
<div class="search-container">
  <h1 class="search-title">Search by name</h1>
    <input v-model="movieName" @keyup.enter="fetchGameByName()" type="text" :min="1" :max="30" />
    <button class="search-button" @click="fetchGameByName()">Search</button>
</div>
    <div class="grid">
        <span v-for="movie in movies">
            <span class="movie-container">
            <div class="image-container">
          <RouterLink :to="{ path: '/movies/' + movie._id + '/details' }">
            <img class="image" v-bind:src="movie.image">
          </RouterLink>
            </div>
            <RouterLink :to="{ path: '/movies/' + movie._id + '/details' }">
            <div class="name"><span class="link">{{ movie.name }}</span></div>
          </RouterLink>
            <div class="year"><span>{{ movie.year }}</span></div>
          </span>
        </span>
      </div>
</template>

<style scoped>
.grid{
  border: 0px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  text-align: left;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem; 
}

.search-container {
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: auto;
}

.search-button {
  width: 200px;
  margin-left: 140px;
}

.search-button:hover {
  color: black;
  background-color: orange;
}


.search-title {
  margin-left: 95px;
  margin-bottom: 10px;
  color: #fff;
}

.link {
  color: #FFF;
}

.link:hover {
  color: orange;
}

.name {
  font-size: 20px;
}

.year {
  font-size: 15px;
}

.image-container {
  width: 100%;
  padding: 5px;
}

.movie-container {
  display: flex;
  flex-direction: column;
}
</style>