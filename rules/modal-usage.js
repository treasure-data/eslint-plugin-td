const lodash = require('lodash')

/*
 * helper functions
 */
const matchAll = (needles, haystack) => {
  if (needles.length === 0) {
    return true
  }
  if (needles.length > 0 && haystack.length === 0) {
    return false
  }

  return needles.reduce((state, needle) => {
    /*
     * once a needle fails, state is false, and haystack.reduce is skipped.
     * since all needles need to succeed to matchAll, this is expected behaviour
     */
    return (
      state &&
      haystack.reduce((innerState, straw) => {
        return innerState || needle(straw)
      }, false)
    )
  }, true)
}

const memberExpressionName = expr => {
  const collapse = obj =>
    ['JSXIdentifier', 'Identifier'].includes(obj.type)
      ? obj.name
      : memberExpressionName(obj)
  const object = collapse(expr.object)
  const property = collapse(expr.property)

  return `${object}.${property}`
}

const tag = node =>
  lodash.get(node, ['openingElement', 'name', 'name']) ||
  memberExpressionName(node.openingElement.name)

/*
 * available matchers
 */
const match = {
  /*
   * Recursively match jsx elements based on tagName
   */
  element: tagName => (...children) => el =>
    el.type === 'JSXElement' &&
    tagName === tag(el) &&
    matchAll(children, el.children)
}

/*
 * patterns for modal usages that should be replaced with a standard modal
 */
const patterns = {
  shouldBeSimpleModal: match.element('Modal')(
    match.element('Modal.Header')(),
    match.element('Modal.Body')(),
    match.element('Modal.Footer')()
  )
}

module.exports = {
  create: context => {
    return {
      JSXElement: element => {
        if (
          lodash.get(element, ['openingElement', 'name', 'name']) !== 'Modal'
        ) {
          return
        }

        try {
          if (patterns.shouldBeSimpleModal(element)) {
            context.report({
              node: element,
              message:
                'Please use the SimpleModal if you do not need custom functionality for header or footer'
            })
          }
        } catch (e) {
          console.log('error', context.getFilename(), element.loc, e)
        }
      }
    }
  }
}
