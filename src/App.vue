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
  data: () => ({
  }),
};
</script>

<style lang="scss">
  .v-application {
    &.theme--light {
      background: #f7f7f7 !important;
    }
    &.theme--dark {
      background: #121212 !important;
    }
  }
</style>
