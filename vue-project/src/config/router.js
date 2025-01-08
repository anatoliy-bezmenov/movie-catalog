import { createRouter, createWebHistory } from 'vue-router';
import AddMovie from '../pages/Add-Movie.vue';
import EditMovie from '../pages/Edit-Movie.vue';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Logout from '../pages/Logout.vue';
import MovieDetails from '../pages/MovieDetails.vue';
import MovieList from '../pages/MovieList.vue';
import NotFound from '../pages/NotFound.vue';
import Register from '../pages/Register.vue';
import SearchMovies from '../pages/Search-Movies.vue';

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/search', name: 'search', component: SearchMovies },
    { path: '/movies', name: 'movie-list', component: MovieList },
    { path: '/movies/create', name: 'add-movie', component: AddMovie },
    { path: '/movies/:movieId/details', name: 'movie-details', component: MovieDetails },
    { path: '/movies/:movieId/edit', name: 'movie-edit', component: EditMovie },
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    { path: '/logout', name: 'logout', component: Logout },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});
  
export default router;