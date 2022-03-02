<template>
  <v-bottom-sheet
    v-model="open"
    :max-width="$vuetify.breakpoint.mdAndUp ? 1161 : '100%'"
    scrollable
  >
    <v-card
      min-height="100vh"
    >
      <template v-if="post">
        <div class="pa-6">
          <v-row>
            <v-col cols="auto">
              <h1 class="text-h6 font-weight-bold mb-1">
                {{ post.data.title }}
              </h1>
              <v-row
                align="center"
              >
                <v-col cols="auto">
                  <v-chip
                    class="font-weight-bold"
                    label
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
            </v-col>

            <v-spacer />

            <v-col cols="auto">
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
            </v-col>
          </v-row>
        </div>

        <v-card-text>
          <v-img
            v-if="post.data.image"
            :max-height="$vuetify.breakpoint.mdAndUp ? 400 : 300"
            :src="`${srcBase}/${post.data.image[0]}`"
          />

          <div v-html="post.data.content" />
        </v-card-text>
      </template>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import PostsMixin from '@/mixins/postsMixin';

export default {
  name: 'FullPost',
  mixins: [PostsMixin],
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
      letter-spacing: normal;
      line-height: 1.625rem;
      word-break: break-word;
    }

    .v-chip {
      background: none !important;

      &:before {
        opacity: 0.15;
      }

      &:hover {
        &:before {
          opacity: 0.15;
        }
      }
    }
  }
</style>
