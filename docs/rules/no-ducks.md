# Enforce a redux project structure that avoids large ["duck"](https://github.com/erikras/ducks-modular-redux) modules.

Selectors, actions, and reducers should go into their own respective files. This rule enforces that your only import from [reselect](https://npmjs.com/package/reselect) in a file named `[Module]Selectors.js` or `selectors.js`.

## Pass

```js
// filename: example/selectors.js
import { createSelector } from 'reselect'
```

## Fail

```js
// filename: example/ExampleModule.js
import { createSelector } from 'reselect'
```

## Configuration

```json
"rules": {
        'td/no-ducks': 'error'
    }
```
