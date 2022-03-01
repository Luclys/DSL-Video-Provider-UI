<template>
  <v-carousel>
    <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: 'LeCarousel',
  data() {
    return {
      items: [
        {
          src: 'https://www.themoviedb.org/t/p/original/h22eEPJpdS47JisaEPevdj48fVT.jpg',
        },
        {
          src: 'https://www.themoviedb.org/t/p/original/1wv9TV3nSHT5UBYwxG6r0UAEVe2.jpg',
        },
        {
          src: 'https://www.themoviedb.org/t/p/original/9TRJSYHuYoggi2TtkzajJtpMKga.jpg',
        },
        {
          src: 'https://www.themoviedb.org/t/p/original/wFLYxP5wbWNoiHbJacZC2uNnBz4.jpg',
        },
      ],
    }
  },
}
</script>
