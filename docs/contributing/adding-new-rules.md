# Adding new rules

## From external configs

Eslint configs, unless they require plugins, will be setting rules that come with eslint by default. You should first check the configs we already extend to see if one of them is already setting it. Remember that the order that we extend configs matters, later configs override the settings of previous ones. If no config already sets a rule, or one turns off a rule that we want, you can define it in the `rules` object. See the [eslint docs: configuring](https://eslint.org/docs/user-guide/configuring).


## From external plugins

[TBD]

## In this plugin

Create the following files:

* rules/[new-rule].js
* tests/[new-rule].test.js
* docs/rules/[new-rule].md

Please follow kebab-case for the rule .js file, as we import the whole directory and expose them by their file name automatically and to be consistent with the existing style in eslint plugins.

You should also update the README.md to add the rule to the list, give a brief description, and link to the docs file.

### rules/new-rule.js

For writing a new rule, see the [eslint docs: working with plugins](https://eslint.org/docs/developer-guide/working-with-plugins).

### tests/new-rule.test.js

Eslint provides a `RuleTester` utility which utilizes the `describe` and `it` functions of `jest`. See the [eslint docs: RuleTester](https://eslint.org/docs/developer-guide/nodejs-api#ruletester).

### docs/rules/new-rule.md

This document should provide a short description of the rule and why it exists. It should also provide code snippets which both pass and fail the test, as well as a snippet for how to configure the rule (if necessary).
