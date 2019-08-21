function report(context, nodePath) {
  context.report({
    node: nodePath,
    message:
      'Do not import private symbols outside of test files (ending in "test.js")'
  })
}
function isTestFile(file) {
  return file.indexOf('test.js') > -1
}
module.exports = {
  create: context => {
    return {
      ImportSpecifier: function(node) {
        if (
          !isTestFile(context.getFilename()) &&
          node.imported.name[0] === '_'
        ) {
          report(context, node)
        }
      },
      ImportDefaultSpecifier: function(node) {
        if (!isTestFile(context.getFilename()) && node.local.name[0] === '_') {
          report(context, node)
        }
      }
    }
  }
}
