import AuthorRepository from './AuthorRepository';
import PostRepository from './PostRepository';
import ThemeRepository from './ThemeRepository';

const repositories = {
  authors: AuthorRepository,
  posts: PostRepository,
  themes: ThemeRepository,
};

export default {
  get: (name) => repositories[name],
};
