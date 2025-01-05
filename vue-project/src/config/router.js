import { createRouter, createWebHistory } from 'vue-router';
import AddMovie from '../pages/Add-Movie.vue';
import EditMovie from '../pages/Edit-Movie.vue';
import Login from '../pages/Login.vue';
import Logout from '../pages/Logout.vue';
import MovieDetails from '../pages/MovieDetails.vue';
import MovieList from '../pages/MovieList.vue';
import NotFound from '../pages/NotFound.vue';
import Register from '../pages/Register.vue';

const routes = [
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
  
router.beforeEach((to, from) => {
    // console.log('Before the routing', to, from);
});
  
router.afterEach((to, from) => {
    // console.log('AFTER the routing', to, from);
});
  
export default router;