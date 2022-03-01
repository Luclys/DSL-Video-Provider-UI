<template>
  <v-container fluid>
    <div class="white--text">
      <h2 class="mt-6 font-weight-medium mb-4 pa-2 ml-5">{{ title }}</h2>
      <v-slide-group
          active-class="success"
          show-arrows="always"
          dark
          width="100%"
      >
        <v-slide-item
            v-for="index in size"
            :key="index"
            v-slot:default="{ active, toggle }"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card
                :elevation="hover ? 12 : 0"
                :color="active ? undefined : 'grey lighten-5'"
                class="mr-3 rounded-0"
                :class="{ 'on-hover': hover }"
                height="100%"
                width="110"
                @click="toggle"
            >
              <v-img
                  :src="require('@/../assets/thumbnail.jpg')"
                  class=""
              >
              </v-img>
            </v-card>
          </v-hover>
        </v-slide-item>
      </v-slide-group>
    </div>
  </v-container>
</template>

<script>

export default {
  name: "myApp-Catalog",
  props: {
    title: {
      type: String,
      required: true,
    },
    size: Number,
  },
};
</script>

<style scoped>
.v-img {
  object-fit: contain;
}

.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.8;
}
</style>
