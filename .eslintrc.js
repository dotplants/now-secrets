module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    '@yuzulabo',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  plugins: ['@typescript-eslint']
};
