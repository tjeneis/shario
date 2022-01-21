import axios from 'axios';

const baseURL = `${process.env.VUE_APP_SQUIDEX_BASE_URI}/content/${process.env.VUE_APP_SQUIDEX_APP}`;

export default axios.create({
  baseURL,
  headers: {
    'X-Flatten': true,
  },
});
