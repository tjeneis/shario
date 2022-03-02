<template>
  <v-parallax
    class="pb-12"
    height="auto"
    :src="banner"
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
        <h3 class="text-h3 font-weight-medium mb-6">
          {{ activeTheme && activeTheme.data.title }}
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
        >
          <v-col cols="auto">
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
                  label
                >
                  {{ author.data.name.toLowerCase() }}
                </v-chip>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="auto">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="font-weight-bold"
                  dark
                  text
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ activeTheme && activeTheme.data.name }}
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list class="py-0">
                <v-list-item
                  v-for="t in themes.filter(t => t.id !== theme)"
                  :key="t.id"
                  @click="theme = t.id"
                >
                  <v-list-item-title>{{ t.data.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
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
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import PostsMixin from '@/mixins/postsMixin';
import ThemesMixin from '@/mixins/themesMixin';
import Logo from '@/assets/io-logo.svg';

export default {
  name: 'FeedHeader',
  components: {
    Logo,
  },
  mixins: [
    PostsMixin,
    ThemesMixin,
  ],
  data() {
    return {
      authors: [],
    };
  },
  computed: {
    banner() {
      return this.activeTheme ? `https://cloud.squidex.io/api/assets/shario/${this.activeTheme.data.banner[0]}` : undefined;
    },
  },
  created() {
    this.getAuthors();
  },
};
</script>

<style lang="scss" scoped>
  .v-parallax::v-deep {
    overflow: visible;

    .v-application.theme--light & {
      overflow: hidden;
    }

    .v-parallax__image-container {
      height: calc(100% * 2);

      &:before {
        content: '';
        display: block;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 2;

        .v-application.theme--dark & {
          background: linear-gradient(0deg, #121212, rgb(18 18 18 / 25%));
        }
        .v-application.theme--light & {
          background: linear-gradient(0deg, rgb(18 18 18 / 75%), rgb(18 18 18 / 25%));
        }
      }
    }

    .v-parallax__content {
      justify-content: start;
      padding: 24px;
    }
  }
</style>
