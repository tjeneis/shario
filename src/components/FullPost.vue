<template>
  <v-bottom-sheet
    v-model="open"
    :max-width="$vuetify.breakpoint.mdAndUp ? 1161 : '100%'"
    :overlay-opacity="0.75"
    scrollable
  >
    <v-card
      min-height="100vh"
    >
      <div
        v-if="post"
        class="mx-auto"
        :style="{
          maxWidth: '900px'
        }"
      >
        <v-row class="pt-6 mb-2">
          <v-col cols="auto">
            <v-chip
              class="font-weight-bold"
              dark
              small
            >
              {{ author.data.name.toLowerCase() }}
            </v-chip>
          </v-col>
          <v-col
            class="pl-0"
            cols="auto"
          >
            {{ post.created | moment('LLLL') }}
          </v-col>
        </v-row>

        <h1 class="text-h5 font-weight-bold mb-6">
          {{ post.data.title }}
        </h1>

        <v-img
          v-if="post.data.image"
          class="mb-6"
          :max-height="480"
          :src="`${srcBase}/${post.data.image[0]}`"
        />

        <!-- <v-col cols="auto">
              <v-row align="center">
                <v-col cols="auto">
                  <v-tooltip>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        :color="likedPosts.includes(post.id) ? '#EA4C89' : '#C9C9C9'"
                        :loading="loading.like"
                        v-bind="attrs"
                        @click.native.stop="likePost(post.id)"
                        v-on="on"
                      >
                        {{ likedPosts.includes(post.id) ? 'mdi-heart' : 'mdi-heart-outline' }}
                      </v-icon>
                    </template>
                    <span>{{ $t('LikePost') }}</span>
                  </v-tooltip>
                </v-col>
                <v-col cols="auto">
                  <v-tooltip>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        @click="open = false"
                      >
                        mdi-close
                      </v-icon>
                    </template>
                    <span>{{ $t('ClosePost') }}</span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-col> -->

        <div v-html="post.data.content" />
      </div>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: 'FullPost',
  data() {
    return {
      author: undefined,
      open: false,
      post: undefined,
      srcBase: `${process.env.VUE_APP_SQUIDEX_BASE_URI}/assets/${process.env.VUE_APP_SQUIDEX_APP}`,
    };
  },
  created() {
    this.$root.$on('open-post', (id) => {
      this.getPost(id)
        .then(() => {
          this.getAuthor(this.post.data.author[0]);
        });
      this.open = true;
    });
  },
};
</script>

<style lang="scss" scoped>
  .v-card {
    &__title {
      font-size: 1.125rem;
      letter-spacing: normal;
      line-height: 1.5rem;
      word-break: break-word;
    }

    .v-chip {
      background: none !important;

      &:before {
        opacity: 0.24;
      }

      &:hover {
        &:before {
          opacity: 0.24;
        }
      }
    }
  }
</style>
