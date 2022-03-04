import Repository from '@/repositories/RepositoryFactory';

const AuthorRepository = Repository.get('authors');
const PostRepository = Repository.get('posts');

export default {
  data: () => ({
    likedPosts: [],
  }),
  mounted() {
    if (localStorage.likedPosts) {
      this.likedPosts = localStorage.likedPosts?.split(',');
    }
  },
  watch: {
    likedPosts(likedPosts) {
      localStorage.likedPosts = likedPosts;
    },
  },
  methods: {
    async getPost(id) {
      this.loading.post = true;
      const { data } = await PostRepository.getPost(id);
      this.post = data;
      this.loading.post = false;
    },
    async getAuthors() {
      const { data } = await AuthorRepository.get();
      this.authors = data?.items;
    },
    async getAuthor(id) {
      const { data } = await AuthorRepository.getAuthor(id);
      this.author = data;
    },
    async likePost(id) {
      this.loading.like = true;
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
          this.likedPosts.push(id); // Save like in localStorage;
        })
        .finally(() => {
          this.loading.like = false;
        });
    },
  },
};
