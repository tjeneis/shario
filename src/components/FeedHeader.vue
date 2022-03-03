<template>
  <v-parallax
    class="pb-12"
    height="auto"
    :src="banner"
  >
    <v-row
      align="center"
      class="flex-grow-0"
      justify="space-between"
    >
      <v-col
        class="d-flex align-center"
        cols="auto"
      >
        <logo class="logo" />
        <span class="pl-4">/</span>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="font-weight-bold"
              dark
              text
              v-bind="attrs"
              v-on="on"
            >
              {{ activeThemeConfig && activeThemeConfig.data.name }}
            </v-btn>
          </template>
          <v-list class="py-0">
            <v-list-item
              v-for="t in themes.filter(t => t.id !== theme)"
              :key="t.id"
              @click="activeTheme = t.id"
            >
              <v-list-item-title>{{ t.data.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>

      <v-col
        cols="auto"
      >
        <v-row
          align="center"
          dense
          justify-md="end"
        >
          <v-col
            class="px-2"
            cols="auto"
          >
            <v-btn
              color="rgba(255, 255, 255, 0.24)"
              dark
              depressed
              fab
              small
              :style="{
                backdropFilter: 'blur(12px)'
              }"
            >
              <v-icon>mdi-link-variant</v-icon>
            </v-btn>
          </v-col>
          <v-col
            class="px-2"
            cols="auto"
          >
            <v-btn
              color="rgba(255, 255, 255, 0.24)"
              dark
              depressed
              fab
              small
              :style="{
                backdropFilter: 'blur(12px)'
              }"
              @click="$vuetify.theme.dark = !$vuetify.theme.dark"
            >
              <v-icon>mdi-white-balance-sunny</v-icon>
            </v-btn>
          </v-col>
          <v-col
            class="pl-2"
            cols="auto"
          >
            <v-btn
              color="white"
              light
              fab
              depressed
              small
            >
              <v-icon>mdi-shape-square-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row
      align="center"
      class="flex-column"
    >
      <v-col
        class="text-center my-12"
        cols="auto"
      >
        <h3 class="text-h3 font-italic font-weight-regular mb-3">
          {{ 'back & forward' }}
        </h3>
        <h3 class="text-h3 font-weight-medium mb-6">
          {{ activeThemeConfig && activeThemeConfig.data.title }}
        </h3>
      </v-col>

      <v-col cols="auto">
        <authors />
      </v-col>
    </v-row>
  </v-parallax>
</template>

<script>
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import Authors from '@/components/Authors';
import Logo from '@/assets/io-logo.svg';

export default {
  name: 'FeedHeader',
  components: {
    Authors,
    Logo,
  },
  computed: {
    banner() {
      return this.activeThemeConfig ? `https://cloud.squidex.io/api/assets/shario/${this.activeThemeConfig.data.banner[0]}` : undefined;
    },
  },
};
</script>

<style lang="scss" scoped>
  .v-parallax::v-deep {
    overflow: visible;

    .v-parallax__image-container {
      height: calc(100% * 1.5);

      .v-parallax__image {
        bottom: auto;
        top: 0;
      }

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
          background: linear-gradient(0deg, #121212, rgb(18 18 18 / 50%));
        }
        .v-application.theme--light & {
          background: rgba(18, 18, 18, 0.50);
        }
      }
    }

    .v-parallax__content {
      justify-content: start;
      padding: 24px;
    }
  }
</style>
