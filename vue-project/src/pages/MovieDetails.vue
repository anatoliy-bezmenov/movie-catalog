
<script>
import axios from 'axios';
import { createMemoryHistory, createRouter } from 'vue-router'
import { getMovies, getMovieById, deleteMovieById } from '../services/movieService';
import { getToken } from '../services/authService';

export default {
  data() {
    return {
      movies: [],
      loading: false,
      errors: [],
      movie: {},
      id: '',
      token: '',
    };
  },
  created() {
    // console.log("params ", this.$route.params.movieId);
    this.id = this.$route.params.movieId
    this.token = getToken();
    this.loading = true;
    this.fetchMovie(this.id, this.token);
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
    fetchMovie(id, token) {
      getMovieById(id, token)
      .then((response) => {
        this.movie = response;
        console.log("response ", response);
      })
      .catch((error) => {
        this.errors.push(error.message);
      })
    },
    deleteMovie() {
      console.log("token ", this.token, this.id);
      deleteMovieById(this.id, this.token)
      .then((response) => {
        this.movie = {};
        // fetchMovies();
        this.$router.push('/movies')
      })
      .catch((error) => {
        this.errors.push(error.message)
      });
    },
  },
};
</script>

<template>
  <span v-for="error in errors">
    <div>{{error}}</div>
  </span>
          <!-- <a [routerLink]="'/games/' + game._id + '/details'"> -->
          <span class="movie-container">
            <div class="name"><strong>{{ movie.name }}</strong></div>
            <div class="image-container">
          <!-- <router-link to="/movies/:movieId/details"> -->
          <router-link to="/movies/6766b72d8094d8a092a48737/details">
            <img class="image" v-bind:src="movie.image">
          </router-link>
            </div>

            <div class="double-row">
            <div class="year">
              Year: {{ movie.year }}
            </div>
            <div class="genre">
              Genre: {{ movie.genre }}
            </div>
            </div>
            
            <div class="double-row">
            <div class="runtime">
              Runtime: {{ movie.runtime }} minutes
            </div>
            <div class="country">
              Country: {{ movie.country }}
            </div>
            </div>

            <div class="double-row">
            <div class="director">
              Director: {{ movie.director }}
            </div>
            <div class="rating">
              Rating: {{ movie.imdbRating }}
            </div>
            </div>
            <div class="description">{{movie.description}}</div>

            <div class="buttons">
              <router-link to="/movies">
                <button class="button backToMovies">Back to Movies</button>
              </router-link>

              <RouterLink :to="{ path: '/movies/' + movie._id + '/edit' }">
                <button class="button editMovie">Edit Movie</button>
              </RouterLink>

                <button class="button deleteMovie" @click="deleteMovie()">Delete Movie</button>

            </div>

        </span>
</template>

<style scoped>
.name {
  display: inline-block;
  width: 300px;
  color: black;
  font-size: 45px;
  margin-left: 260px;
  line-height: 40px;
  text-align: center;
  margin-bottom: 15px;
}

.image {
  margin-left: 160px;
  height: 600px;
  width: 500px;
  margin-bottom: 10px;
}

.double-row {
  display: flex;
  flex-direction: row;
  margin-left: 160px;

  margin-bottom: 10px;
  width: 500px;
  justify-content: space-between;
}

.movie-container {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 40%;
}

.description {
  margin-top: 20px;
  width: 500px;
  margin-left: 160px;
}

.buttons {
  margin-top: 20px;
  margin-left: 145px;
}

.button {
  margin-left: 10px;
  margin-right: 10px;
}

.deleteMovie {
  background-color: red;
  border-color: red;
}
</style>