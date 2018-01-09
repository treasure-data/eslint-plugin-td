# Publishing

## Prerequisites

* You've cloned the repo locally and you're on the latest commit of the master branch
* [The latest commit on master is passing CI](https://github.com/treasure-data/eslint-plugin-td/commits/master)
* [You have access to publish on npm](https://www.npmjs.com/package/eslint-plugin-td/access)

## Steps

1. `npm version [sermver label]` e.g. `npm version patch`
2. `git push --tags`
3. `npm publish`
