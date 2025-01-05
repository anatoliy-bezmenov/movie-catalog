<script>
import { removeToken } from '../services/authService';
import { createMemoryHistory, createRouter } from 'vue-router'
import { nextTick, ref } from 'vue';

export default {

  inject: [
    'test'
    ],

  data() {
    return {
      loading: false,
      errors: [],
      logged: this.test,
    };
  },
  async created() {
    this.loading = true;
    console.log('method logout');
    removeToken();
    this.logged = false;
    await nextTick();
    // this.$router.push('/movies');
    this.loading = false;
  },
  methods: {
    loginUser() {
    },
  },
};
</script>

<template>
  <span v-for="error in errors">
    <div>{{error}}</div>
  </span>
    <h1>Successfully logged out</h1>
    <p>Go to
    <router-link to="/movies">
        <span class="link">Movies</span>
    </router-link>
    </p>
    <router-link to="/login">
        <div class="link">Login</div>
    </router-link>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
</template>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
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