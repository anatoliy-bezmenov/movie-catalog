import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import router from './config/router';
// import { store } from './store/store';
import './styles/reset.css';

const store = createStore({
    modules: {

    },
    state: {
        logged: false,
    },
    getters: {

    },
    mutations: {

    },
});

const pinia = createPinia();
const app = createApp(App);
// app.use(pinia);
app.use(store);

app.provide('test', true);

app.use(router);

app.mount('#app');
