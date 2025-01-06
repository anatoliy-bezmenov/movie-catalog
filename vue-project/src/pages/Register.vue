<script>
import useVuelidate from '@vuelidate/core';
import { email, helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { register } from '../services/userService';
import { setDataToStorage, getToken } from '../services/authService';
import { createMemoryHistory, createRouter } from 'vue-router'

export default {
  data() {
    return {
      registerForm: {
        email: "",
        name: "",
        password: "",
        rePassword: "",
      },
      errors: {
        email: null,
        name: null,
        password: null,
        rePassword: null,
      },
      errorMessage: null,
    };
  },
  created() {
    const token = getToken();
    if (token) {
      this.$router.push('/movies');
    };
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
    validatePassword() {
      if (!this.registerForm.password) {
        this.errors.password = "Password is required.";
      } else if (this.registerForm.password.length < 4) {
        this.errors.password = "Password must be at least 4 characters long.";
      } else {
        this.errors.password = null;
      }
    },
    validateRePassword() {
      if (this.registerForm.rePassword != this.registerForm.password) {
        this.errors.rePassword = "Passwords must match.";
      } else {
        this.errors.rePassword = null;
      }
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.registerForm.email) {
        this.errors.email = "Email is required.";
      } else if (!emailRegex.test(this.registerForm.email)) {
        this.errors.email = "Invalid email format.";
      } else {
        this.errors.email = null;
      }
    },
    validateName() {
      if (!this.registerForm.name) {
        this.errors.name = "Name is required.";
      } else if (this.registerForm.name.length < 5) {
        this.errors.name = "Name must be at least 5 characters long.";
      } else {
        this.errors.name = null;
      }
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
          @blur="validateEmail"
        />
        <p v-if="errors.email" class="error">{{ errors.email }}</p>
      </div>
    <div class="form-group">
        <label for="name">Name:</label>
        <input
          id="name"
          type="text"
          v-model="registerForm.name"
          placeholder="Enter your name"
          @blur="validateName"
        />
        <p v-if="errors.name" class="error">{{ errors.name }}</p>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          id="password"
          type="password"
          v-model="registerForm.password"
          placeholder="Enter your password"
          @blur="validatePassword"
        />
        <p v-if="errors.password" class="error">{{ errors.password }}</p>
      </div>
      <div class="form-group">
        <label for="rePassword">Repeat Password:</label>
        <input
          id="rePassword"
          type="password"
          v-model="registerForm.rePassword"
          placeholder="Repeat your password"
          @blur="validateRePassword"
        />
        <p v-if="errors.rePassword" class="error">{{ errors.rePassword }}</p>
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