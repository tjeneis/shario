<template>
  <v-container>
    <v-row
      align="center"
      class="mt-0 mb-3"
      justify="space-between"
    >
      <v-col
        cols="12"
        md="auto"
      >
        <logo class="logo" />
      </v-col>
      <v-col
        cols="12"
        md="auto"
      >
        <v-row dense>
          <v-col
            v-for="author in authors"
            :key="author.id"
            cols="auto"
          >
            <v-chip
              class="font-weight-bold"
              :color="author.data.color"
              dark
              label
            >
              {{ author.data.name.toLowerCase() }}
            </v-chip>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <masonry
      :gutter="16"
      :cols="{ default: 6, 1024: 4, 768: 3, 425: 2, 375: 1 }"
    >
      <post
        v-for="post in posts"
        :key="post.id"
        :initial-post="post"
      />
    </masonry>
  </v-container>
</template>

<script>
import Repository from '@/repositories/RepositoryFactory';
import Logo from '@/assets/io-logo.svg';
import Post from '@/components/Post.vue';

const AuthorRepository = Repository.get('authors');
const PostRepository = Repository.get('posts');

export default {
  name: 'Feed',
  components: {
    Logo,
    Post,
  },
  data() {
    return {
      authors: [],
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
