const plugin = require('.')

module.exports = {
  // We want the default config but with a subset of extends/plugins
  // We won't need react here and we can't use ourself(?)
  ...plugin.configs.recommended,
  rules: {},
  extends: ['standard', 'prettier', 'prettier/standard'],
  plugins: ['standard', 'prettier']
}
