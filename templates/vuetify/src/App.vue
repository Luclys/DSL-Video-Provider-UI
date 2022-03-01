<template>
  <v-app>
    <Header/>
    <div class="pt-5">
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
import Header from "./components/Header";

export default {
  name: 'App',

  components: {
    Header,
  },

  data: () => ({}),
};
</script>
