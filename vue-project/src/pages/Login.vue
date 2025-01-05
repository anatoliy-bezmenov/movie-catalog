<script>
import useVuelidate from '@vuelidate/core';
import { email, helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { login } from '../services/userService';
import { setDataToStorage, getToken } from '../services/authService';
import { createMemoryHistory, createRouter, useRouter } from 'vue-router'

const router = useRouter();

export default {
  data() {
    return {
      loading: false,
      errors: [],
      loginForm: {},
      loggedIn: false,
    };
  },
  created() {
    this.loading = true;
    const token = getToken();
    if (token) {
      this.$router.push('/movies');
    };
    this.loading = false;
    this.loggedIn = false;
  },
  methods: {
    loginUser() {
      this.email = this.loginForm.email;
      this.password = this.loginForm.password;
      console.log(this.email, this.password);
      console.log('method login');
        login(this.email, this.password)
        .then((response) => {
          setDataToStorage(response);
          this.$router.push('/movies');
        })
        .catch((error) => {
            console.log("error ", error.message);
        })
    },
    submit() {
        console.log("Email:", this.email);
        console.log("Password:", this.password);
    },
  },
};
</script>

<template>
  <span v-for="error in errors">
    <div>{{error}}</div>
  </span>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          id="email"
          type="email"
          v-model="loginForm.email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          id="password"
          type="password"
          v-model="loginForm.password"
          placeholder="Enter your password"
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
  margin-bottom: 310px;
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