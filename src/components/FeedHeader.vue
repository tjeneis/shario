<template>
  <v-parallax
    :height="$vuetify.breakpoint.mdAndUp ? 500 : 'auto'"
    src="@/assets/banners/ricoh-building.jpg"
  >
    <v-row
      align="center"
      class="flex-grow-0"
    >
      <v-col
        class="d-flex"
        cols="12"
        md="6"
      >
        <logo class="logo" />
      </v-col>
      <v-col
        class="text-center my-6"
        cols="12"
        order-md="3"
      >
        <h2 class="text-h4 font-italic font-weight-regular mb-3">
          {{ $t('StayUpdated') }}
        </h2>
        <h3 class="text-h3 font-weight-medium">
          State of iO
        </h3>
      </v-col>
      <v-col
        cols="12"
        md="6"
        order-md="2"
      >
        <v-row
          align="center"
          justify-md="end"
          dense
        >
          <v-col
            v-for="author in authors"
            :key="author.id"
            cols="auto"
          >
            <v-chip
              class="font-weight-bold"
              label
            >
              {{ author.data.name.toLowerCase() }}
            </v-chip>
          </v-col>
          <v-col
            v-if="$vuetify.breakpoint.mdAndUp"
            cols="auto"
          >
            <v-btn
              icon
              @click="$vuetify.theme.dark = !$vuetify.theme.dark"
            >
              <v-icon>mdi-white-balance-sunny</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-parallax>
</template>

<script>
import PostsMixin from '@/mixins/postsMixin';
import Logo from '@/assets/io-logo.svg';

export default {
  name: 'FeedHeader',
  components: {
    Logo,
  },
  mixins: [PostsMixin],
  data() {
    return {
      authors: [],
    };
  },
  created() {
    this.getAuthors();
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
