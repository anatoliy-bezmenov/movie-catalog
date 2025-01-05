<script>
import useVuelidate from '@vuelidate/core';
import { email, helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { setDataToStorage } from '../services/authService';
import { createMemoryHistory, createRouter } from 'vue-router';
import { createMovie } from '../services/movieService';
import { getToken } from '../services/authService';

export default {
  data() {
    return {
      loading: false,
      errors: [],
      movieForm: {},
      loggedIn: false,
      movie: {},
    };
  },
  created() {
    this.loading = true;
    this.loading = false;
    const token = getToken();
    if (!token) {
      this.$router.push('/login');
    };
    this.loggedIn = false;
  },
  methods: {
    addMovie() {
      let movie = {};
      const token = getToken();
      movie.name = this.movieForm.name;
      movie.year = this.movieForm.year;
      movie.genre = this.movieForm.genre;
      movie.runtime = this.movieForm.runtime;
      movie.director = this.movieForm.director;
      movie.country = this.movieForm.country;
      movie.imdbRating = this.movieForm.imdbRating;
      movie.image = this.movieForm.image;
      movie.description = this.movieForm.description;
      
      createMovie(movie, token)
        .then((response) => {
          console.log("response: ", response);
          this.$router.push('/movies');
        })
        .catch((error) => {
            console.log("error ", error.message);
        })
    },
  },
};
</script>

<template>
  <span v-for="error in errors">
    <div>{{error}}</div>
  </span>
  <div class="movie-form">
    <h2>Create Movie</h2>
    <form @submit.prevent="addMovie">
    <div class="form-group">
        <label for="name">Name:</label>
        <input
          id="name"
          type="text"
          v-model="movieForm.name"
          placeholder="The Polar Express"
          required
        />
      </div>
      <div class="form-group">
        <label for="year">Year:</label>
        <input
          id="year"
          type="text"
          v-model="movieForm.year"
          placeholder="2004"
          required
        />
      </div>
      <div class="form-group">
        <label for="rePassword">Genre:</label>
        <input
          id="genre"
          type="text"
          v-model="movieForm.genre"
          placeholder="Adventure"
          required
        />
      </div>
      <div class="form-group">
        <label for="runtime">Runtime:</label>
        <input
          id="runtime"
          type="text"
          v-model="movieForm.runtime"
          placeholder="99"
          required
        />
      </div>
      <div class="form-group">
        <label for="director">Director:</label>
        <input
          id="director"
          type="text"
          v-model="movieForm.director"
          placeholder="Robert Zemeckis"
          required
        />
      </div>
      <div class="form-group">
        <label for="country">Country:</label>
        <input
          id="country"
          type="text"
          v-model="movieForm.country"
          placeholder="USA"
          required
        />
      </div>
      <div class="form-group">
        <label for="imdbRating">Rating:</label>
        <input
          id="imdbRating"
          type="text"
          v-model="movieForm.imdbRating"
          placeholder="7"
          required
        />
      </div>
      <div class="form-group">
        <label for="image">Image:</label>
        <input
          id="image"
          type="text"
          v-model="movieForm.image"
          placeholder="https://m.media-amazon.com/images/M/MV5BMTM1NTU0NTE4MV5BMl5BanBnXkFtZTcwMTQ0MjEzMw@@._V1_.jpg"
          required
        />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <input
          id="description"
          type="text"
          v-model="movieForm.description"
          placeholder="On Christmas Eve, a young boy embarks on a magical..."
          required
        />
      </div>
      <button type="submit">Add Movie</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.movie-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
}

.form-group {
  margin-bottom: 15px;
}

h2 {
    display: flex;
    margin: auto;
    width: 100px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 10px;
}

</style>