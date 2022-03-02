<template>
  <v-card
    v-if="post"
    class="mb-4"
    flat
    @click="$root.$emit('open-post', post.id)"
  >
    <v-img
      v-if="post.data.image"
      :src="`${srcBase}/${post.data.image[0]}`"
    />

    <v-card-title class="font-weight-bold">
      {{ post.data.title }}
    </v-card-title>
    <v-card-actions class="pa-4 pt-0">
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

      <v-spacer />

      <v-btn
        color="transparent"
        depressed
        :loading="loading.likes"
        @click="likePost"
      >
        <v-icon
          class="mr-1"
          color="#C9C9C9"
          :size="18"
        >
          mdi-heart
        </v-icon>
        {{ post.data.likes }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Repository from '@/repositories/RepositoryFactory';

const AuthorRepository = Repository.get('authors');
const PostRepository = Repository.get('posts');

export default {
  name: 'Post',
  props: {
    initialPost: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      author: undefined,
      loading: {
        likes: false,
      },
      post: this.initialPost,
      srcBase: `${process.env.VUE_APP_SQUIDEX_BASE_URI}/assets/${process.env.VUE_APP_SQUIDEX_APP}`,
    };
  },
  created() {
    this.getAuthor(this.post.data.author[0]);
  },
  methods: {
    async getAuthor(id) {
      const { data } = await AuthorRepository.getAuthor(id);
      this.author = data;
    },
    async likePost() {
      this.loading.likes = true;
      const { id } = this.post;
      let { data: { likes } } = this.post;

      // eslint-disable-next-line no-plusplus
      likes++;

      PostRepository
        .patch({
          likes: {
            iv: likes,
          },
        }, id)
        .then(() => {
          // eslint-disable-next-line no-plusplus
          this.post.data.likes++;
        })
        .finally(() => {
          this.loading.likes = false;
        });
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
