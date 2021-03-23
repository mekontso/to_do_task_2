<template>
  <v-footer
      absolute
      class="grey lighten-3 rounded-lg"
      app
  >
    <v-card class="flex"  color="grey lighten-3">
      <v-card-text class="py-2 text-center">
        Copyright &copy; {{new Date().getFullYear()}} -
        <strong class="text-uppercase font-weight-bold">My TODO's</strong> All rights reserved
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "TheFooter"
}
</script>

<style scoped>

</style>
