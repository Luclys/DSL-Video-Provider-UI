<template>
  <v-responsive>
    <div class="player-container">
      <vue-core-video-player :src="source" :muted="true"/>
    </div>
  </v-responsive>
</template>

<script>
export default {
  name: 'app',

  data() {
    return {
      source: require('@/../assets/mov_bbb.mp4')
    }
  }
}

</script>
