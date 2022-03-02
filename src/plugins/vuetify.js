import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

const mq = window.matchMedia('(prefers-color-scheme: dark)');

Vue.use(Vuetify);

// eslint-disable-next-line import/prefer-default-export
export const vuetify = new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    dark: mq.matches,
    themes: {
      light: {
        default: '#FFFFFF',
        primary: '#1F1F1F',
        secondary: '#868ada',
        tertiary: '#9caee9',
        accent: '#82B1FF',
        error: '#ff6161',
        info: '#2196F3',
        success: '#30c58e',
        warning: '#ffa100',
      },
      dark: {
        default: '#1F1D2C',
        primary: '#1F1F1F',
        secondary: '#868ada',
        tertiary: '#9caee9',
        accent: '#82B1FF',
        error: '#ff6161',
        info: '#2196F3',
        success: '#30c58e',
        warning: '#ffa100',
      },
    },
  },
});

mq.addEventListener('change', (e) => {
  vuetify.framework.theme.dark = e.matches;
});
