# Adding new rules

## From external configs

ESLint configs, unless they require plugins, will be setting rules that come with ESLint by default. You should first check the configs we already extend to see if one of them is already setting it. Remember that the order that we extend configs matters, later configs override the settings of previous ones. If no config already sets a rule, or one turns off a rule that we want, you can define it in the `rules` object. See the [ESLint docs: configuring](https://ESLint.org/docs/user-guide/configuring).

## From external plugins

[TBD]

## In this plugin

Create the following files:

* `rules/new-rule.js`
* `tests/new-rule.test.js`
* `docs/rules/new-rule.md`

Please follow kebab-case for the rule .js file, as we import the whole directory and expose them by their file name automatically and to be consistent with the existing style in ESLint plugins.

You should also update the `README.md` to add the rule to the list, give a brief description, and link to the docs file.

Finally, our default setting for the rule should be added to the recommended config rules in `index.js`

### `rules/new-rule.js`

For writing a new rule, see the [ESLint docs: working with plugins](https://ESLint.org/docs/developer-guide/working-with-plugins).

### `tests/new-rule.test.js`

ESLint provides a `RuleTester` utility which utilizes the `describe` and `it` functions of `jest`. See the [ESLint docs: RuleTester](https://ESLint.org/docs/developer-guide/nodejs-api#ruletester).

### `docs/rules/new-rule.md`

This document should provide a short description of the rule and why it exists. It should also provide code snippets which both pass and fail the test, as well as a snippet for how to configure the rule (if necessary).
