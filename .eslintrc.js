module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/airbnb'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'import/no-cycle': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 'off',
    'max-len': 'off',
    'vue/no-unused-vars': 'error',
    'vue/no-v-html': 'off',
  },
};
