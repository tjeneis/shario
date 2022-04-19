<template>
  <div>
    <feed-header />

    <v-container
      class="pa-6 pt-0"
    >
      <masonry
        :gutter="32"
        :cols="{ default: 4, 1024: 3, 768: 2, 425: 1 }"
      >
        <post
          v-for="post in posts"
          :key="post.id"
          :initial-post="post"
        />
      </masonry>

      <full-post />
    </v-container>
  </div>
</template>

<script>
import Repository from '@/repositories/RepositoryFactory';
import FullPost from '@/components/FullPost';
import Post from '@/components/Post';
import FeedHeader from '@/components/FeedHeader';

const PostRepository = Repository.get('posts');

export default {
  name: 'Feed',
  components: {
    FeedHeader,
    FullPost,
    Post,
  },
  data() {
    return {
      open: false,
      posts: [],
    };
  },
  created() {
    this.getPosts();
  },
  mounted() {
    const postId = window.location.hash?.split('#')[1];
    if (postId) {
      this.$root.$emit('open-post', postId);
    }
  },
  methods: {
    async getPosts() {
      const { data } = await PostRepository.get({ params: { $orderby: 'created desc' } });
      this.posts = data?.items;
    },
  },
};
</script>
