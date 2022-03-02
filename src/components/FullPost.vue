<template>
  <v-bottom-sheet
    v-model="open"
    :max-width="$vuetify.breakpoint.mdAndUp ? 1161 : '100%'"
    scrollable
  >
    <v-card
      class="rounded-t-lg rounded-b-0"
      min-height="100vh"
    >
      <template v-if="post">
        <v-img
          v-if="post.data.image"
          :max-height="$vuetify.breakpoint.mdAndUp ? 400 : 300"
          :src="`${srcBase}/${post.data.image[0]}`"
          :style="{
            overflow: 'visible'
          }"
        >
          <v-btn
            fab
            :style="{
              left: '24px',
              position: 'absolute',
              top: '24px'
            }"
            small
            @click="open = false"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>

          <v-btn
            fab
            :style="{
              bottom: '0',
              position: 'absolute',
              right: '24px',
              transform: 'translate(0, 50%)'
            }"
            small
            @click="open = false"
          >
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn>
        </v-img>

        <v-card-actions class="pa-6 pb-3">
          <v-chip
            v-if="author"
            class="font-weight-bold"
            dark
            label
            :style="{
              color: author.data.color,
            }"
          >
            {{ author.data.name.toLowerCase() }}
          </v-chip>
        </v-card-actions>

        <v-card-title class="font-weight-bold">
          {{ post.data.title }}
        </v-card-title>
        <v-card-text v-html="post.data.content" />
      </template>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import Repository from '@/repositories/RepositoryFactory';

const AuthorRepository = Repository.get('authors');
const PostRepository = Repository.get('posts');

export default {
  name: 'FullPost',
  data() {
    return {
      author: undefined,
      loading: false,
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
  methods: {
    async getAuthor(id) {
      const { data } = await AuthorRepository.getAuthor(id);
      this.author = data;
    },
    async getPost(id) {
      this.loading = true;
      const { data } = await PostRepository.getPost(id);
      this.post = data;
      this.loading = false;
    },
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
