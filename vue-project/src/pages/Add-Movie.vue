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
      // errors: [],
      // movieForm: {},
      movie: {},
      movieForm: {
        name: "",
        year: "",
        genre: "",
        runtime: "",
        director: "",
        description: "",
        country: "",
        imdbRating: "",
        image: "",
      },
      errors: {
        name: null,
        year: null,
        genre: null,
        runtime: null,
        director: null,
        description: null,
        country: null,
        imdbRating: null,
        image: null,
      },
      errorMessage: null,
    };
  },
  created() {
    const token = getToken();
    if (!token) {
      this.$router.push('/login');
    };
    this.loggedIn = false;
  },
  computed: {
    isFormInvalid() {
      return !this.movieForm.name || !this.movieForm.year || !this.movieForm.genre ||
      !this.movieForm.runtime || !this.movieForm.director || !this.movieForm.country ||
      !this.movieForm.imdbRating || !this.movieForm.image || !this.movieForm.description ||
      this.errors.name || this.errors.year || this.errors.genre || this.errors.runtime
      || this.errors.director || this.errors.country || this.errors.imdbRating
      || this.errors.image || this.errors.description;
    },
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
          this.$router.push('/movies');
        })
        .catch((error) => {
            console.log("error ", error.message);
        })
    },
    validateName() {
      if (!this.movieForm.name) {
        this.errors.name = "Name is required.";
      } else if (this.movieForm.name.length < 2) {
        this.errors.name = "Name must be at least 2 characters long.";
      } else {
        this.errors.name = null;
      }
    },
    validateYear() {
      if (!this.movieForm.year) {
        this.errors.year = "Year is required.";
      } else if (this.movieForm.year < 1900) {
        this.errors.year = "Year must be at least 1900.";
      } else if (this.movieForm.year > 2025) {
        this.errors.year = "Year cannot exceed 2025.";
      } else if (isNaN(this.movieForm.year) && isNaN(parseFloat(this.movieForm.year))) {
        this.errors.year = "Year must be a number."
      } else {
        this.errors.year = null;
      }
    },
    validateGenre() {
      if (!this.movieForm.genre) {
        this.errors.genre = "Genre is required.";
      } else if (this.movieForm.genre.length < 1) {
        this.errors.genre = "Genre must be at least 1 character.";
      } else {
        this.errors.genre = null;
      }
    },
    validateRuntime() {
      if (!this.movieForm.runtime) {
        this.errors.runtime = "Runtime is required.";
      } else if (this.movieForm.runtime < 1) {
        this.errors.runtime = "Runtime must be at least 1.";
      } else if (this.movieForm.runtime > 600) {
        this.errors.runtime = "Runtime cannot exceed 600.";
      } else if (isNaN(this.movieForm.runtime) && isNaN(parseFloat(this.movieForm.runtime))) {
        this.errors.runtime = "Runtime must be a number."
      } else {
        this.errors.runtime = null;
      }
    },
    validateDirector() {
      if (!this.movieForm.director) {
        this.errors.director = "Director is required.";
      } else if (this.movieForm.director.length < 1) {
        this.errors.director = "Director must be at least 1 character.";
      } else {
        this.errors.director = null;
      }
    },
    validateCountry() {
      if (!this.movieForm.country) {
        this.errors.country = "Country is required.";
      } else if (this.movieForm.country.length < 1) {
        this.errors.country = "Country must be at least 1 character.";
      } else {
        this.errors.country = null;
      }
    },
    validateRating() {
      if (!this.movieForm.imdbRating) {
        this.errors.imdbRating = "Rating is required.";
      } else if (this.movieForm.imdbRating < 0) {
        this.errors.imdbRating = "Rating must be at least 0.";
      } else if (this.movieForm.imdbRating > 10) {
        this.errors.imdbRating = "Rating cannot exceed 10.";
      } else if (isNaN(this.movieForm.imdbRating) && isNaN(parseFloat(this.movieForm.imdbRating))) {
        this.errors.imdbRating = "Rating must be a number."
      } else {
        this.errors.imdbRating = null;
      }
    },
    validateImage() {
      const imageRegex = /^https?:.*\.(png|jpg)$/i;
      if (!this.movieForm.image) {
        this.errors.image = "Image is required.";
      } else if (!imageRegex.test(this.movieForm.image)) {
        this.errors.image = "Image format must be .png or .jpg";
      } else {
        this.errors.image = null;
      }
    },
    validateDescription() {
      if (!this.movieForm.description) {
        this.errors.description = "Description is required.";
      } else if (this.movieForm.description.length < 10) {
        this.errors.description = "Description must be at least 10 characters long.";
      } else {
        this.errors.description = null;
      }
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
          @blur="validateName"
        />
        <p v-if="errors.name" class="error">{{ errors.name }}</p>
      </div>
      <div class="form-group">
        <label for="year">Year:</label>
        <input
          id="year"
          type="text"
          v-model="movieForm.year"
          placeholder="2004"
          @blur="validateYear"
        />
        <p v-if="errors.year" class="error">{{ errors.year }}</p>
      </div>
      <div class="form-group">
        <label for="rePassword">Genre:</label>
        <input
          id="genre"
          type="text"
          v-model="movieForm.genre"
          placeholder="Adventure"
          @blur="validateGenre"
        />
        <p v-if="errors.genre" class="error">{{ errors.genre }}</p>
      </div>
      <div class="form-group">
        <label for="runtime">Runtime:</label>
        <input
          id="runtime"
          type="text"
          v-model="movieForm.runtime"
          placeholder="99"
          @blur="validateRuntime"
        />
        <p v-if="errors.runtime" class="error">{{ errors.runtime }}</p>
      </div>
      <div class="form-group">
        <label for="director">Director:</label>
        <input
          id="director"
          type="text"
          v-model="movieForm.director"
          placeholder="Robert Zemeckis"
          @blur="validateDirector"
        />
        <p v-if="errors.director" class="error">{{ errors.director }}</p>
      </div>
      <div class="form-group">
        <label for="country">Country:</label>
        <input
          id="country"
          type="text"
          v-model="movieForm.country"
          placeholder="USA"
          @blur="validateCountry"
        />
        <p v-if="errors.country" class="error">{{ errors.country }}</p>
      </div>
      <div class="form-group">
        <label for="imdbRating">Rating:</label>
        <input
          id="imdbRating"
          type="text"
          v-model="movieForm.imdbRating"
          placeholder="7"
          @blur="validateRating"
        />
        <p v-if="errors.imdbRating" class="error">{{ errors.imdbRating }}</p>
      </div>
      <div class="form-group">
        <label for="image">Image:</label>
        <input
          id="image"
          type="text"
          v-model="movieForm.image"
          placeholder="https://m.media-amazon.com/images/M/MV5BMTM1NTU0NTE4MV5BMl5BanBnXkFtZTcwMTQ0MjEzMw@@._V1_.jpg"
          @blur="validateImage"
        />
        <p v-if="errors.image" class="error">{{ errors.image }}</p>
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea
          id="description"
          type="text"
          v-model="movieForm.description"
          placeholder="On Christmas Eve, a young boy embarks on a magical..."
          @blur="validateDescription"
        />
        <p v-if="errors.description" class="error">{{ errors.description }}</p>
      </div>
      <button type="submit" :disabled="isFormInvalid">Add Movie</button>
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