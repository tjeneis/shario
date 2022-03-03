<template>
  <v-row
    align="center"
    dense
  >
    <v-col
      v-for="author in authors"
      :key="author.id"
      cols="auto"
    >
      <v-chip
        color="rgba(255,255,255,0.24)"
        dark
        :style="{
          fontSize: '1rem',
          backdropFilter: 'blur(12px)'
        }"
      >
        <span class="font-weight-bold">{{ author.data.name.toLowerCase() }}</span>
        <small class="pl-1">{{ `(${count})` }}</small>
      </v-chip>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Authors',
  data() {
    return {
      authors: [],
      count: 10,
    };
  },
  created() {
    this.getAuthors();
  },
};
</script>
