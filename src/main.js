import Vue from 'vue';
import App from '@/App';

// Plugins
import { vuetify } from '@/plugins/vuetify';
import i18n from '@/plugins/i18n';
import router from '@/router';
import store from '@/store';
import '@/plugins/vue-masonry-css';
import '@/plugins/vue-moment';

// Mixins
import PostsMixin from '@/mixins/postsMixin';
import ThemesMixin from '@/mixins/themesMixin';

// Styles
import '@/scss/main.scss';

Vue.mixin(PostsMixin);
Vue.mixin(ThemesMixin);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
