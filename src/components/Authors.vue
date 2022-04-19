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
        <!-- <small class="pl-1">{{ `(0)` }}</small> -->
      </v-chip>
    </v-col>
  </v-row>
</template>

<script>
import getAuthorsWithTotals from '@/apollo/queries/getAuthorsWithTotals.gql';

export default {
  name: 'Authors',
  apollo: {
    authors: {
      query: getAuthorsWithTotals,
      update: (data) => {
        console.log(data);

        return data;
      },
    },
  },
};
</script>
