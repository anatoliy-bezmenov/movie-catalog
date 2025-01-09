<script>
import { getMovies } from '../services/movieService';
import { getToken } from '../services/authService';

export default {
  data() {
    return {
      movies: [],
      loading: false,
      errors: [],
      token: getToken(),
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
  },
};
</script>

<template>
  <div class="grid" v-if="this.movies[0]">
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

      <div v-if="!this.movies[0]">
      <h1 class="no-movies">No movies found!</h1>
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

.no-movies {
  margin: auto;
  display: flex;
  width: 50%;
  margin-top: 50px;
  margin-left: 800px;
  margin-bottom: 400px;
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
  margin-bottom: -20px;
}
</style>