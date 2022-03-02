<template>
  <v-parallax
    src="@/assets/banners/ricoh-building.jpg"
  >
    <v-row
      align="center"
      class="flex-grow-0"
    >
      <v-col
        class="d-flex"
        cols="12"
        md="auto"
      >
        <logo class="logo" />
      </v-col>
      <v-spacer />
      <v-col
        cols="12"
        md="auto"
      >
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
      <v-col cols="auto">
        <v-btn
          icon
          @click="$vuetify.theme.dark = !$vuetify.theme.dark"
        >
          <v-icon>mdi-white-balance-sunny</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row
      class="flex-grow-0"
      justify="center"
    >
      <v-col
        class="text-center"
        cols="8"
        md="6"
      >
        <h2 class="text-h4 font-italic font-weight-regular mb-3">
          {{ $t('StayUpdated') }}
        </h2>
        <h3 class="text-h3 font-weight-medium">
          State of iO
        </h3>
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
      justify-content: start;
      padding: 24px;

      .v-application.theme--dark & {
        background: linear-gradient(0deg, #121212, rgb(18 18 18 / 25%));
      }
      .v-application.theme--light & {
        background: linear-gradient(0deg, rgb(18 18 18 / 75%), rgb(18 18 18 / 25%));
      }
    }
  }
</style>
