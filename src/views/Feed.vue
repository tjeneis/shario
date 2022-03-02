<template>
  <div>
    <feed-header />

    <v-container
      :style="{
        marginTop: '-60px'
      }"
    >
      <masonry
        :gutter="16"
        :cols="{ default: 4, 1024: 4, 768: 3, 425: 2, 374: 1 }"
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
      const { data } = await PostRepository.get();
      this.posts = data?.items;
    },
  },
};
</script>
