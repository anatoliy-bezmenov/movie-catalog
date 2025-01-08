<script>
import { getMovies } from '../services/movieService';
import { getToken } from '../services/authService';

export default {
  data() {
    return {
      movies: [],
      loading: false,
      errors: [],
      movie: {},
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
  <div class="grid">
  <h1>Search Movies</h1>
        <span v-for="movie in movies">
            <span class="movie-container">
            <div class="name"><strong>{{ movie.name }}</strong></div>
            <div class="image-container">
          <RouterLink :to="{ path: '/movies/' + movie._id + '/details' }">
            <img class="image" v-bind:src="movie.image">
          </RouterLink>
            </div>
            <div class="double-row">
            <div class="year">
              Year: {{ movie.year }}
            </div>
            <div class="genre">
              Genre: {{ movie.genre }}
            </div>
            </div>
            <!-- <div class="director">
              Director: {{ movie.director }}
            </div>       -->
          </span>
        </span>
      </div>
</template>

<style scoped>
.grid{
  border: 0px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 1rem;
  margin-right: 175px;
}

.name {
  font-size: 30px;
  width: 200px;
  margin-left: 210px;
}

.image {
  margin-left: 160px;
}

.image {
  height: 200px;
  width: 300px;
}

.genre {
  display: flex;
  flex-direction: row;
  margin-left: 50px;
  gap: 30px;
}

.double-row {
  display: flex;
  flex-direction: row;
  margin-left: 170px;
  gap: 30px;
}

.director {
  display: flex;
  text-align: center;
  margin: auto;
  width: 40%;
}

.movie-container {
  display: flex;
  flex-direction: column;
}
</style>