<script>
import { getToken, getUser } from '../services/authService';

export default {
  data() {
    return {
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
  },
  methods: {
  },
};
</script>

<template>
<p>This is not the page you were looking for</p>
</template>

<style scoped>
p {
  font-size: 50px;
  color: black;
}
</style>