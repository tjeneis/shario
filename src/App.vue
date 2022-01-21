<template>
  <v-app
    id="app"
    :style="{
      backgroundColor: 'var(--v-primary-base)'
    }"
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
