
<script>
import { getMovies, getMovieByIdNoUser } from '../services/movieService';

export default {
  data() {
    return {
      movies: [],
      loading: false,
      errors: [],
      movie: {},
    };
  },
  created() {
    this.loading = true;
    this.fetchMovies();
    this.loading = false;
  },
  methods: {
    fetchMovies() {
      getMovies()
        .then((response) => {
          this.movies = response;
          console.log(response);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          // error.message
          this.errors.push('Cannot fetch data');
          console.log(this.errors);
        });
    },
  },
};
</script>

<template>
  <span v-for="error in errors">
    <div>{{error}}</div>
  </span>
  <div class="grid">
        <span v-for="movie in movies">
          <!-- <a [routerLink]="'/games/' + game._id + '/details'"> -->
            <span class="movie-container">
            <div class="name"><strong>{{ movie.name }}</strong></div>
            <div class="image-container">
          <!-- <router-link to="/movies/:movieId/details"> -->
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
            <div class="director">
              Director: {{ movie.director }}
            </div>      
          </span>
        <!-- </a> -->
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
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-gap: 1rem;
}

.name {
  color: black;
  font-size: 30px;
  width: 200px;
  margin-left: 210px;
}

.image {
  margin-left: 160px;
}

.image {
  height: 400px;
  width: 300px;
}

.double-row {
  display: flex;
  flex-direction: row;
  margin-left: 190px;
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