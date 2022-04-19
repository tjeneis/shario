import Vue from 'vue';
import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-boost';

export const apolloClient = new ApolloClient({
  uri: `${process.env.VUE_APP_SQUIDEX_BASE_URI}/content/${process.env.VUE_APP_SQUIDEX_APP}/graphql`,
});

Vue.use(VueApollo);

export default new VueApollo({
  defaultClient: apolloClient,
});
