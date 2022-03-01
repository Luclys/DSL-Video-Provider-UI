<template>
  <div>
    <v-toolbar
        dark
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-menu class="hidden-md-and-up">
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
        <v-list>
          <v-list-tile v-for="item in items" :key="item.title">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>

      %TitleComponent%<v-toolbar-title>%Title%</v-toolbar-title>%!TitleComponent%

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
            v-for="item in items"
            :key="item.title"
            :to="item.link"
            flat
        >{{ item.title }}</v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>
      %DarkmodeComponent%
      <v-switch
          :value="darkmode"
          @change="toggleDarkMode"
      >
      </v-switch>
      %!DarkmodeComponent%

      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' },
      ],
      right: null,
    }
  },
}
</script>
