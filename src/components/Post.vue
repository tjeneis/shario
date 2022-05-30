<template>
  <v-card
    v-if="post"
    class="mb-8"
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
        :dark="$vuetify.theme.light"
        :light="$vuetify.theme.dark"
        small
      >
        {{ author.data.name.toLowerCase() }}
      </v-chip>

      <v-spacer />

      <div class="d-flex align-center">
        {{ post.data.likes }}
        <v-icon
          class="pl-2"
          :color="likedPosts.includes(post.id) ? '#EA4C89' : '#C9C9C9'"
          :size="18"
          @click.native.stop="likePost(post.id)"
        >
          {{ likedPosts.includes(post.id) ? 'mdi-heart' : 'mdi-heart-outline' }}
        </v-icon>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
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
      post: this.initialPost,
      srcBase: `${process.env.VUE_APP_SQUIDEX_BASE_URI}/assets/${process.env.VUE_APP_SQUIDEX_APP}`,
      loading: {
        like: false,
      },
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
      font-size: 1.125rem;
      letter-spacing: normal;
      line-height: 1.5rem;
      word-break: break-word;
    }
  }
</style>
