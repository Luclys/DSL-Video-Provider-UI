<template>
  <div>
    <v-toolbar
        dark
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-menu class="hidden-md-and-up">
        <v-list>
          <v-list-tile v-for='item in %ToCList%' :key="item.title">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>


      %LogoComponent%
      <v-img
          src="https://vuejs.org/images/logo.png"
          max-height="30"
          max-width="50">
      </v-img>
      %!LogoComponent%

      %TitleComponent%
      <v-toolbar-title>%Title%</v-toolbar-title>
      %!TitleComponent%

      %ToCComponent%
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
            v-for='item in %ToCList%'
            :key="item.title"
            :to="item.link"
            text
        >{{ item.title }}
        </v-btn>
      </v-toolbar-items>
      %!ToCComponent%

      <v-spacer></v-spacer>

      %SearchComponent%
      <v-text-field label="Search"></v-text-field>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      %!SearchComponent%

      %DarkmodeComponent%
      <v-spacer></v-spacer>
      <v-switch
          v-model="$vuetify.theme.dark"
          hint="This toggles the global state of the Vuetify theme"
          label="Vuetify Theme Dark"
          persistent-hint
      ></v-switch>
      %!DarkmodeComponent%

      %AvatarComponent%
      <v-avatar size="64">
        <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="Avatar">
      </v-avatar>
      %!AvatarComponent%

    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
}
</script>
