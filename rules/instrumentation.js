const INSTRUMENTATION_COMPONENTS = ['a', 'button', 'input']
const INSTRUMENTATION_ATTRIBUTES = [
  'href',
  'to',
  'onChange',
  'onKeyDown',
  'onKeyUp',
  'onMouseDown',
  'onMouseUp',
  'onClick',
]
const INSTRUMENTATION_PROP = 'data-instrumentation'

const findAttribute = (element, needle) =>
  element.attributes?.find((attribute) => attribute.name?.name === needle)

function shouldHaveInstrumentation(node) {
  if (INSTRUMENTATION_COMPONENTS.includes(node.name?.name)) {
    return true
  }
  if (INSTRUMENTATION_ATTRIBUTES.some((attr) => findAttribute(node, attr))) {
    return true
  }
  return false
}

function hasInstrumentation(node) {
  const instrumentationProp = findAttribute(node, INSTRUMENTATION_P  ROP)
  if (!instrumentationProp || instrumentationProp.value?.value === '') {
    return false
  }
  return true
}

module.exports = {
  supportsAutofix: true,
  create: (context) => {
    return {
      JSXOpeningElement: (node) => {
        if (!shouldHaveInstrumentation(node)) {
          return
        }
        if (hasInstrumentation(node)) {
          return
        }
        context.report({
          node,
          loc: node.loc,
          message: `Component ${node.name?.name} needs to have have a ${INSTRUMENTATION_PROP} attribute`,
        })
      },
    }
  },
}
