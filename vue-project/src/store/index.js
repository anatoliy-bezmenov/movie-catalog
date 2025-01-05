import { createStore } from 'vuex';
import movieService from '../services/movieService.js';
// import * as movieService from '@/services/movieService';

export default createStore({
  state: {
    movies: [],
    selectedMovie: null,
    loading: false,
    error: null,
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
    SET_SELECTED_MOVIE(state, movie) {
      state.selectedMovie = movie;
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchMovies({ commit }) {
      commit('SET_LOADING', true);
      try {
        const movies = await movieService.getMovies();
        commit('SET_MOVIES', movies);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
  },
});