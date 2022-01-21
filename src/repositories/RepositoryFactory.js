import AuthorRepository from './AuthorRepository';
import PostRepository from './PostRepository';

const repositories = {
  authors: AuthorRepository,
  posts: PostRepository,
};

export default {
  get: (name) => repositories[name],
};
