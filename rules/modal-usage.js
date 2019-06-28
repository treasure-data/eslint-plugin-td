const jp = require('jsonpath')

/*
 * helper functions
 */
// const l = (...args) => { console.log.apply(console, args); return true; }
const oneOf = (needle, haystack) => haystack.indexOf(needle) > -1
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

/*
 * transform a babel-eslint AST node to a simplified representation for pattern matching
 */
function transform(astNode) {
  const supportedChildren = element =>
    oneOf(element.type, ['JSXElement', 'JSXExpressionContainer'])
  const children = cs => cs.filter(supportedChildren).map(expressionOrElement)
  const attributes = attrs =>
    attrs.map(attr => {
      const name =
        attr.type === 'JSXSpreadAttribute'
          ? `...${attr.argument.name}`
          : attr.name.name
      return { name }
    })
  // const expression = expr => ({
  //   type: 'expression',
  //   left: expressionOrElement(expr.left),
  //   right: expressionOrElement(expr.right)
  // })
  const expression = expr => {
    return {
      type: 'expression',
      left: expressionOrElement(expr.left),
      right: expressionOrElement(expr.right)
    }
  }
  const expressionOrElement = node => {
    switch (node.type) {
      case 'JSXElement':
        return element(node)
      case 'JSXExpressionContainer':
        return expressionOrElement(node.expression)
      case 'LogicalExpression':
        return expression(node)
      case 'MemberExpression':
      case 'JSXMemberExpression':
        return memberExpressionName(node)
      default:
        return null
    }
  }
  const memberExpressionName = expr => {
    const collapse = obj =>
      oneOf(obj.type, ['JSXIdentifier', 'Identifier'])
        ? obj.name
        : memberExpressionName(obj)
    const object = collapse(expr.object)
    const property = collapse(expr.property)

    return `${object}.${property}`
  }
  const name = node =>
    jp.value(node, '$.openingElement.name.name') ||
    memberExpressionName(node.openingElement.name)
  const notNull = x => !!x
  const element = el => ({
    type: 'element',
    tagName: name(el),
    attributes: attributes(el.openingElement.attributes || []).filter(notNull),
    children: children(el.children || []).filter(notNull)
  })

  return element(astNode)
}

/*
 * available matchers
 */
const match = {
  element: tagName => (...attributes) => (...children) => el =>
    el.type === 'element' &&
    tagName === el.tagName &&
    matchAll(attributes, el.attributes) &&
    matchAll(children, el.children),
  attribute: name => attr => attr.name === name
}

/*
 * patterns for modal usages that should be replaced with a standard modal
 */
const patterns = {
  shouldBeSimpleModal: match.element('Modal')()(
    match.element('Modal.Header')()(),
    match.element('Modal.Body')()(),
    match.element('Modal.Footer')()()
  )
}

module.exports = {
  create: context => {
    return {
      JSXElement: element => {
        if (jp.value(element, '$.openingElement.name.name') !== 'Modal') {
          return
        }

        try {
          if (patterns.shouldBeSimpleModal(transform(element))) {
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
