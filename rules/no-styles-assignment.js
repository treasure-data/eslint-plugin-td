module.exports = {
  create: context => {
    return {
      JSXAttribute: function(node) {
        if (node.name.name.toLowerCase() !== 'style') {
          return
        }

        if (node.value.type === 'JSXExpressionContainer') {
          if (node.value.expression.type === 'ObjectExpression') {
            context.report({
              node,
              message: 'Direct assignment of styles detected'
            })
          }

          if (node.value.expression.type === 'Identifier') {
            const variable = context
              .getScope()
              .upper.variables.filter(
                variable => variable.name === node.value.expression.name
              )
              .pop()

            if (variable) {
              const declaration = variable.defs.pop()
              if (declaration && declaration.node && declaration.node.init) {
                if (declaration.node.init.type === 'ObjectExpression') {
                  context.report({
                    node,
                    message: 'Assignment of styles via object detected'
                  })
                }

                if (
                  declaration.node.init.type === 'CallExpression' &&
                  declaration.node.init.callee.type === 'MemberExpression'
                ) {
                  if (
                    declaration.node.init.callee.object.name === 'Object' &&
                    declaration.node.init.callee.property.name === 'assign'
                  ) {
                    context.report({
                      node,
                      message: 'Assignment of styles via Object.assign detected'
                    })
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
