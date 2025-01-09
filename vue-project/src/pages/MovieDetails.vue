<script>
import { getMovies, getMovieByIdNoUser, getMovieById, deleteMovieById } from '../services/movieService';
import { getToken, getUser } from '../services/authService';

export default {
  data() {
    return {
      movies: [],
      errors: [],
      movie: {},
      id: '',
      token: '',
      user: '',
      isOwner: false,
    };
  },
  created() {
    this.id = this.$route.params.movieId
    this.token = getToken();
    if (!this.token) {
      this.$store.state.logged = false;
    } else {
      this.$store.state.logged = true;
    };
    this.user = getUser();
    this.fetchMovies();
    this.fetchMovie(this.id, this?.token);
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
    fetchMovie(id, token) {
      if (token) {
      getMovieById(id, token)
      .then((response) => {
        this.movie = response;
        let user = getUser();
        let parsedUser = JSON.parse(user);
        if (response.owner.email == parsedUser.email) {
          this.isOwner = true;
        };
      })
      .catch((error) => {
        this.errors.push(error.message);
      })
    };

    if (!token) {
      getMovieByIdNoUser(id)
      .then((response) => {
        this.movie = response;
      })
      .catch((error) => {
        this.errors.push(error.message)
      })
    };
    },
    
    deleteMovie() {
      deleteMovieById(this.id, this.token)
      .then((response) => {
        this.movie = {};
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
          <span class="movie-container">
            <div class="name"><strong>{{ movie.name }}</strong></div>
            <div class="image-container">
            <img class="image" v-bind:src="movie.image">
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

          <div v-if="this.token">
            <div v-if="this.isOwner">

            <div class="buttons">
              <router-link to="/movies">
                <button class="button backToMovies">Back to Movies</button>
              </router-link>
              <span v-if="this.token">
              <span v-if="this.isOwner">
              <RouterLink :to="{ path: '/movies/' + movie._id + '/edit' }">
                <button class="button editMovie">Edit Movie</button>
              </RouterLink>
              </span>
              </span>
                <span v-if="this.token">
                <span v-if="this.isOwner">
                <button class="button deleteMovie" @click="deleteMovie()">Delete Movie</button>
                </span>
                </span>
            </div>

            </div>
            
            <div v-else>
            <div class="button-big">
            <router-link to="/movies">
                <button class="button backToMovies">Back to Movies</button>
              </router-link>
              </div>
            </div>

          </div>

          <div v-else>
            <div class="button-big">
            <router-link to="/movies">
                <button class="button backToMovies">Back to Movies</button>
              </router-link>
              </div>
            </div>

        </span>
</template>

<style scoped>
.name {
  display: inline-block;
  width: 300px;
  font-size: 45px;
  margin-left: 260px;
  line-height: 40px;
  text-align: center;
  margin-bottom: 15px;
  margin-top: 20px;
}

.backToMovies:hover {
  color: black;
  background-color: orange;
}

.editMovie:hover {
  color: black;
  background-color: orange;
}

.deleteMovie:hover {
  color: black;
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

.button-big {
  margin-left: 300px;
  margin-top: 20px;
}

.deleteMovie {
  background-color: red;
  border-color: red;
}
</style>