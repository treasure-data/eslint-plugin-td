const path = require('path')
const importModules = require('import-modules')

module.exports = {
  rules: importModules(path.resolve(__dirname, 'rules'), { camelize: false }),
  configs: {
    recommended: {
      parser: 'babel-eslint',
      parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
          experimentalObjectRestSpread: true
        }
      },
      env: {
        node: true,
        es6: true
      },
      extends: [
        'plugin:react/recommended',
        'standard',
        'standard-jsx',
        'prettier',
        'prettier/react',
        'prettier/standard'
      ],
      plugins: [
        'standard',
        'react',
        'react-hooks',
        'prettier',
        'td'
      ],
      rules: {
        'td/no-ducks': 'error',
        'td/modal-usage': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'import/extensions': [
          'error',
          'never',
          { css: 'always', json: 'always' }
        ]
      }
    }
  }
}
