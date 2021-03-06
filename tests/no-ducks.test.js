const { RuleTester } = require('eslint')
const noDucks = require('../rules/no-ducks')
const babelEslint = require.resolve('babel-eslint')

const ruleTester = new RuleTester({
  parser: babelEslint,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  }
})
ruleTester.run('no-ducks', noDucks, {
  valid: [
    {
      code: "import { createSelector } from 'reselect'",
      filename: 'selectors.js'
    }
  ],

  invalid: [
    {
      code: "import { createSelector } from 'reselect'",
      filename: 'duckfile.js',
      errors: [
        {
          message:
            'You should only create selectors in a selectors.js or ModuleNameSelectors.js file'
        }
      ]
    }
  ]
})
