<template>
  <v-bottom-sheet
    v-model="show"
    :max-width="$vuetify.breakpoint.mdAndUp ? 1161 : '100%'"
    :overlay-opacity="0.75"
    scrollable
  >
    <simplebar data-simplebar-auto-hide="false">
      <v-card
        min-height="calc(100vh - 92px)"
      >
        <div
          class="mx-auto px-6 py-12 py-md-6"
          :style="{
            maxWidth: $vuetify.breakpoint.mdAndUp ? '852px' : '100%'
          }"
        >
          <v-row class="mb-2">
            <v-col cols="auto">
              <v-chip
                class="font-weight-bold"
                :color="$vuetify.theme.dark ? 'rgba(255,255,255,0.24)' : 'rgba(0,0,0,0.24)'"
                dark
                small
              >
                {{ author?.data?.name?.toLowerCase() }}
              </v-chip>
            </v-col>
            <v-col
              class="pl-0"
              cols="auto"
            >
              {{ post?.created | moment('LLLL') }}
            </v-col>
          </v-row>

          <h1 class="text-h5 font-weight-bold mb-6">
            {{ post?.data?.title }}
          </h1>

          <v-img
            v-if="post?.data?.image"
            class="mb-6"
            :max-height="480"
            max-width="100%"
            :src="`${srcBase}/${post.data.image[0]}`"
          />

          <div v-html="post?.data?.content" />
        </div>
      </v-card>
    </simplebar>

    <v-row
      align="center"
      :class="{ 'flex-column': $vuetify.breakpoint.mdAndUp, 'flex-row': !$vuetify.breakpoint.mdAndUp }"
      justify="center"
      :style="{
        position: 'absolute',
        top: '-1.25rem',
        right: '2rem',
        width: 'auto'
      }"
    >
      <v-col
        :class="{ 'pb-2': $vuetify.breakpoint.mdAndUp, 'pr-2': !$vuetify.breakpoint.mdAndUp }"
        cols="auto"
      >
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="white"
              light
              fab
              depressed
              small
              :style="{
                backdropFilter: 'blur(12px)'
              }"
              v-bind="attrs"
              v-on="on"
              @click="show = false"
            >
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </template>
          <span>{{ $t('ClosePost') }}</span>
        </v-tooltip>
      </v-col>
      <v-col
        :class="{ 'py-2': $vuetify.breakpoint.mdAndUp, 'px-2': !$vuetify.breakpoint.mdAndUp }"
        cols="auto"
      >
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="rgba(255, 255, 255, 0.24)"
              dark
              depressed
              fab
              small
              :style="{
                backdropFilter: 'blur(12px)'
              }"
              v-bind="attrs"
              v-on="on"
              @click="copyLinkToClipboard"
            >
              <v-icon>mdi-link-variant</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('CopyLink') }}</span>
        </v-tooltip>
      </v-col>
      <v-col
        :class="{ 'pb-2': $vuetify.breakpoint.mdAndUp, 'pl-2': !$vuetify.breakpoint.mdAndUp }"
        cols="auto"
      >
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="rgba(255, 255, 255, 0.24)"
              dark
              depressed
              fab
              :loading="loading.like"
              small
              :style="{
                backdropFilter: 'blur(12px)'
              }"
              v-bind="attrs"
              v-on="on"
              @click.native.stop="likePost(post?.id)"
            >
              <v-icon
                :color="likedPosts.includes(post?.id) ? '#EA4C89' : '#C9C9C9'"
              >
                {{ likedPosts.includes(post?.id) ? 'mdi-heart' : 'mdi-heart-outline' }}
              </v-icon>
            </v-btn>
          </template>
          <span>{{ $t('LikePost') }}</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: 'FullPost',
  data() {
    return {
      author: undefined,
      show: false,
      post: undefined,
      srcBase: `${process.env.VUE_APP_SQUIDEX_BASE_URI}/assets/${process.env.VUE_APP_SQUIDEX_APP}`,
      loading: {
        like: false,
      },
    };
  },
  watch: {
    show() {
      if (this.show) {
        document.body.style.height = '100vh';
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.height = '';
        document.body.style.overflow = '';
        // eslint-disable-next-line no-restricted-globals
        history.pushState('', document.title, window.location.pathname
                                                       + window.location.search);
      }
    },
  },
  created() {
    this.$root.$on('open-post', (id) => {
      this.getPost(id)
        .then(() => {
          this.getAuthor(this.post.data.author[0]);
          window.location.hash = this.post.id;
        });
      this.show = true;
    });
  },
  methods: {
    copyLinkToClipboard() {
      const { location } = window;
      navigator.clipboard.writeText(location);
      this.$toast.open(this.$t('LinkCopiedToClipboard'));
    },
  },
};
</script>

<style lang="scss" scoped>
  *::v-deep {
    .simplebar-track.simplebar-vertical {
      margin: 0.5rem !important;
    }
    .simplebar-scrollbar:before {
      background: rgba(255,255,255,0.24);
    }
    .v-dialog {
      position: relative;
    }
  }

  .v-card {
    &__title {
      font-size: 1.125rem;
      letter-spacing: normal;
      line-height: 1.5rem;
      word-break: break-word;
    }
  }
</style>
