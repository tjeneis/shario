import { setup } from 'axios-cache-adapter';

const baseURL = `${process.env.VUE_APP_SQUIDEX_BASE_URI}/content/${process.env.VUE_APP_SQUIDEX_APP}`;

export default setup({
  baseURL,
  headers: {
    'X-Flatten': true,
  },
  cache: {
    maxAge: 15 * 60 * 1000,
  },
});
