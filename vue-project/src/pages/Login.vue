<script>
import { login } from '../services/userService';
import { setDataToStorage, getToken } from '../services/authService';

export default {
  data() {
    return {
       loginForm: {
        email: "",
        password: "",
        credentials: "",
      },
      errors: {
        email: null,
        password: null,
        credentials: null,
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
  computed: {
    isFormInvalid() {
      return !this.loginForm.email || !this.loginForm.password || this.errors.email
      || this.errors.password;
    },
  },
  methods: {
    loginUser() {
      this.email = this.loginForm.email;
      this.password = this.loginForm.password;
        login(this.email, this.password)
        .then((response) => {
          setDataToStorage(response);
          this.$store.state.logged = true;
          this.$router.push('/');
        })
        .catch((error) => {
          this.errors.credentials = "The requested user could not be found.";
        })

    },
    validatePassword() {
      if (!this.loginForm.password) {
        this.errors.password = "Password is required.";
      } else {
        this.errors.password = null;
      }
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.loginForm.email) {
        this.errors.email = "Email is required.";
      } else if (!emailRegex.test(this.loginForm.email)) {
        this.errors.email = "Invalid email format.";
      } else {
        this.errors.email = null;
      }
    },
  },
};
</script>

<template>
  <div class="login-form">
  <p v-if="errors.credentials" class="error">{{ errors.credentials }}</p>
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          id="email"
          type="email"
          v-model="loginForm.email"
          placeholder="Enter your email"
          @blur="validateEmail"
        />
         <p v-if="errors.email" class="error">{{ errors.email }}</p>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          id="password"
          type="password"
          v-model="loginForm.password"
          placeholder="Enter your password"
          @blur="validatePassword"
        />
        <p v-if="errors.password" class="error">{{ errors.password }}</p>
      </div>
      <button class="login-button" type="submit" :disabled="isFormInvalid">Login</button>
      <p class="signup">Don't have an account? <router-link to="/register">
      <span class="link">Sign up</span>
    </router-link> right now!
      </p>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.login-form {
  max-width: 450px;
  margin: 0 auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
  margin-bottom: 310px;
}

.form-group {
  margin-bottom: 15px;
}

.signup {
  font-size: 18px;
  margin-left: 18px;
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

h2, label, p {
  color: #fff;
}

.login-button:hover {
  background-color: #FF8C00;
  color: black;
}

.link:hover {
  color: orange;
}

.link {
  color: #0099FF;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>