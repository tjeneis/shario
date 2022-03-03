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

const AuthorRepository = Repository.get('authors');
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
      authors: [],
      open: false,
      posts: [],
    };
  },
  created() {
    this.getAuthors();
    this.getPosts();
  },
  methods: {
    async getAuthors() {
      const { data } = await AuthorRepository.get();
      this.authors = data?.items;
    },
    async getPosts() {
      const { data } = await PostRepository.get({ params: { $orderby: 'created desc' } });
      this.posts = data?.items;
    },
  },
};
</script>
