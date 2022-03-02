<template>
  <v-parallax
    :height="350"
    src="@/assets/banners/ricoh-building.jpg"
  >
    <v-row
      justify="space-between"
    >
      <v-col
        cols="12"
        md="auto"
      >
        <logo class="logo" />
      </v-col>
      <v-col
        cols="12"
        md="auto"
      >
        <v-row dense>
          <v-col
            v-for="author in authors"
            :key="author.id"
            cols="auto"
          >
            <v-chip
              class="font-weight-bold"
              color="white"
              light
              label
            >
              {{ author.data.name.toLowerCase() }}
            </v-chip>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-parallax>
</template>

<script>
import Repository from '@/repositories/RepositoryFactory';
import Logo from '@/assets/io-logo.svg';

const AuthorRepository = Repository.get('authors');

export default {
  name: 'FeedHeader',
  components: {
    Logo,
  },
  data() {
    return {
      authors: [],
    };
  },
  created() {
    this.getAuthors();
  },
  methods: {
    async getAuthors() {
      const { data } = await AuthorRepository.get();
      this.authors = data?.items;
    },
  },
};
</script>

<style lang="scss" scoped>
  .v-parallax::v-deep {
    .v-parallax__content {
      background-color: rgb(31 31 31 / 50%);
      background: linear-gradient(0deg, var(--v-primary-base), rgb(31 31 31 / 50%));
      padding: 24px;
    }
  }
</style>
