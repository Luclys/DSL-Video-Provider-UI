<template>
  <v-app>
    <Header/>
    <v-main>
      <Carousel/>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header';
import Carousel from './components/Carousel';

export default {
  name: 'App',

  components: {
    Carousel,
    Header,
  },

  data: () => ({
    //
  }),
};
</script>
