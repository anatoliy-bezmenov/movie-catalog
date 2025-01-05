<script>
import useVuelidate from '@vuelidate/core';
import { email, helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { register } from '../services/userService';
import { setDataToStorage, getToken } from '../services/authService';
import { createMemoryHistory, createRouter } from 'vue-router'

export default {
  data() {
    return {
      loading: false,
      errors: [],
      registerForm: {},
      loggedIn: false,
    };
  },
  created() {
    this.loading = true;
    this.loading = false;
    const token = getToken();
    if (token) {
      this.$router.push('/movies');
    };
    this.loggedIn = false;
  },
  methods: {
    registerUser() {
      this.email = this.registerForm.email;
      this.name = this.registerForm.name;
      this.password = this.registerForm.password;
      this.rePassword = this.registerForm.rePassword;
        register(this.email, this.name, this.password, this.rePassword)
        .then((response) => {
          if (this.registerForm.password != this.registerForm.rePassword) {
            console.log("Passwords not matching!");
            return;
          };
          setDataToStorage(response);
          this.$router.push('/movies');
        })
        .catch((error) => {
            console.log("error ", error.message);
        })
    },
    submit() {
        console.log("Email:", this.email);
        console.log("Name:", this.name);
        console.log("Password:", this.password);
        console.log("RePassword:", this.rePassword);
    },
  },
};
</script>

<template>
  <span v-for="error in errors">
    <div>{{error}}</div>
  </span>
  <div class="register-form">
    <h2>Register</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          id="email"
          type="email"
          v-model="registerForm.email"
          placeholder="Enter your email"
          required
        />
      </div>
    <div class="form-group">
        <label for="name">Name:</label>
        <input
          id="name"
          type="text"
          v-model="registerForm.name"
          placeholder="Enter your name"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          id="password"
          type="password"
          v-model="registerForm.password"
          placeholder="Enter your password"
          required
        />
      </div>
      <div class="form-group">
        <label for="rePassword">Repeat Password:</label>
        <input
          id="rePassword"
          type="password"
          v-model="registerForm.rePassword"
          placeholder="Repeat your password"
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.register-form {
  max-width: 400px;
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