import Vue from 'vue';
import App from '@/App';

// Plugins
import { vuetify } from '@/plugins/vuetify';
import i18n from '@/plugins/i18n';
import router from '@/router';
import store from '@/store';
import '@/plugins/vue-apollo';
import '@/plugins/vue-toast-notification';
import '@/plugins/simplebar-vue';
import '@/plugins/vue-masonry-css';
import '@/plugins/vue-meta';
import '@/plugins/vue-moment';

// Mixins
import PostsMixin from '@/mixins/postsMixin';

// Styles
import '@/scss/main.scss';

Vue.mixin(PostsMixin);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
