/* eslint-disable global-require */
module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
      // eslint-disable-next-line no-param-reassign
        options.compiler = require('vue-template-babel-compiler');
        return options;
      });

    config.module
      .rule('graphql')
      .test(/\.(gql|graphql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end();

    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
  pluginOptions: {
    i18n: {
      locale: 'nl',
      fallbackLocale: 'nl',
      localeDir: 'locales',
      enableInSFC: true,
      enableBridge: false,
    },
  },
  publicPath: process.env.BASE_URL,
  transpileDependencies: [
    'vuetify',
  ],
};
