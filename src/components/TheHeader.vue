<template>

      <v-app-bar app clipped-left class="grey lighten-3 rounded-lg mb-8">
        <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
        />
        <v-toolbar-title class=" headline text-uppercase">
          My TODO's
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
            class="hidden-xs-only"
            text>
          {{this.$store.getters.getUserData.name}}-
          {{this.$store.getters.getUserData.role_name}}
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-avatar>
          <!--                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"/>-->
          <img src="/images/img1.png" alt="Profile Image"/>
        </v-avatar>
        <v-btn text class="hidden-xs-only" >Logout
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </v-app-bar>




</template>

<script>
export default {
name: "TheHeader"
}
</script>

<style scoped>

</style>
