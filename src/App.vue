<template>
  <v-app
    id="app"
  >
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
};
</script>

<style lang="scss">
  .v-application {
    &.theme--light {
      background: #F2F2F2 !important;
    }
    &.theme--dark {
      background: #121212 !important;
    }
  }
</style>
