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
        label
        small
      >
        {{ author.data.name.toLowerCase() }}
      </v-chip>

      <v-spacer />

      <v-btn
        color="transparent"
        depressed
        :loading="loading.like"
        @click.native.stop="likePost(post.id)"
      >
        <v-icon
          :color="likedPosts.includes(post.id) ? '#EA4C89' : '#C9C9C9'"
          left
          :size="18"
        >
          {{ likedPosts.includes(post.id) ? 'mdi-heart' : 'mdi-heart-outline' }}
        </v-icon>
        {{ post.data.likes }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import PostsMixin from '@/mixins/postsMixin';

export default {
  name: 'Post',
  mixins: [PostsMixin],
  props: {
    initialPost: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      author: undefined,
      post: this.initialPost,
      srcBase: `${process.env.VUE_APP_SQUIDEX_BASE_URI}/assets/${process.env.VUE_APP_SQUIDEX_APP}`,
    };
  },
  created() {
    this.getAuthor(this.post.data.author[0]);
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
        opacity: 0.05;
      }

      &:hover {
        &:before {
          opacity: 0.05;
        }
      }
    }
  }
</style>
