<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  data() {
    return {
      logged: false,
    }
  },
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<template>
  <AppHeader />
  <main>
    <router-view />
  </main>
  <AppFooter />
</template>
