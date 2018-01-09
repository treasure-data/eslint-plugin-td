# eslint-plugin-td

> A shared eslint config and additional rules, to be used across Treasure Data frontend projects.

[![Build Status](https://travis-ci.org/treasure-data/eslint-plugin-td.svg?branch=master)](https://travis-ci.org/treasure-data/eslint-plugin-td)

## Install

```
$ npm install --save-dev eslint eslint-plugin-td
```

## Usage

Configure eslint to use it in `package.json`:

```json
{
    "eslintConfig": {
        "extends": "plugin:td/recommended",
        "plugins": ["td"]
    }
}
```

For more information on configuring eslint, see the [docs](https://eslint.org/docs/user-guide/configuring).

## Rules

* [**no-ducks**](/docs/rules/no-ducks.md) - Prevents the use of ["duck modules"](https://github.com/erikras/ducks-modular-redux).

## Licence

Apache 2.0 &copy; [Treasure Data](https://treasuredata.com)
