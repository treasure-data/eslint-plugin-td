module.exports = {
  create: context => {
    const filenameWithExt = context.getFilename()
    if (filenameWithExt === '<text>') {
      return {}
    }

    return {
      ImportDeclaration: node => {
        const moduleName = node.source.value
        if (
          moduleName === 'reselect' &&
          !filenameWithExt.toLowerCase().includes('selector')
        ) {
          context.report({
            node,
            message:
              'You should only create selectors in a selectors.js or ModuleNameSelectors.js file'
          })
        }
      }
    }
  }
}
