const fs = require('fs')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const t = require('@babel/types')
const parse = require('@babel/parser')

const SKIP_COMMENT = '#td skip NamespaceImports'

function getAst(file) {
  const js = fs.readFileSync(file).toString()

  return parse(js, {
    sourceType: 'module',
    plugins: [
      'classProperties',
      'jsx',
      'flow',
      'exportDefaultFrom',
      'exportNamespaceFrom'
    ]
  })
}

function NamespacedImports(file) {
  const ast = getAst(file)
  if (ast.comments.length && ast.comments[0].value.trim() === SKIP_COMMENT) {
    return null
  }

  let allDeclarations = {}
  traverse(ast, {
    VariableDeclarator: function(nodePath) {
      allDeclarations[nodePath.node.id.name] = true
    },

    ImportDefaultSpecifier: function(nodePath) {
      allDeclarations[nodePath.node.local.name] = true
    },

    ImportNamespaceSpecifier: function(nodePath) {
      allDeclarations[nodePath.node.local.name] = true
    },

    ImportSpecifier: function(nodePath) {
      allDeclarations[nodePath.node.local.name] = true
    }
  })

  function findCollisionlessName(importName, moduleName) {
    function cleanModuleName(name) {
      if (name[0].toUpperCase() === name[0]) {
        name = `${name[0].toLowerCase()}${name.substr(1)}`
      }

      return name.replace(/[^a-z0-9]/gi, '')
    }

    function permutate(name) {
      if (!allDeclarations[name]) {
        return name
      }
      return permutate(`${name}_`)
    }

    return permutate(`${importName}_${cleanModuleName(moduleName)}`)
  }

  let mappedNames = {}
  let importNames = []
  let imports = {}
  let importMembers = {}
  function addImportMember(importName, member, local) {
    if (!importMembers[importName]) {
      importMembers[importName] = {
        plain: [],
        statement: []
      }
    }

    if (!importMembers[importName].plain.includes(member)) {
      importMembers[importName].plain.push(member)
      importMembers[importName].statement.push(
        t.importSpecifier(t.identifier(local), t.identifier(member))
      )
    }
  }
  traverse(ast, {
    ImportNamespaceSpecifier: function(nodePath) {
      importNames.push(nodePath.node.local.name)
      imports[nodePath.node.local.name] = nodePath.parentPath
    }
  })

  traverse(ast, {
    Identifier: function(nodePath) {
      if (nodePath.parent.type !== 'MemberExpression') {
        return
      }
      if (importNames.includes(nodePath.node.name)) {
        let localName = nodePath.parent.property.name

        if (mappedNames[localName]) {
          localName = mappedNames[localName]
        } else if (allDeclarations[localName]) {
          const previousLocalName = localName
          localName = findCollisionlessName(localName, nodePath.node.name)
          mappedNames[previousLocalName] = localName
        }

        addImportMember(
          nodePath.node.name,
          nodePath.parent.property.name,
          localName
        )
        if (nodePath.parent.property.name !== localName) {
          nodePath.parent.property.name = localName
        }
        nodePath.parentPath.replaceWith(nodePath.parent.property)
      }
    }
  })

  let keys = Object.keys(importMembers)
  if (!keys.length) {
    return null
  }

  keys.forEach(key => {
    const import_ = t.importDeclaration(
      importMembers[key].statement,
      imports[key].node.source
    )
    imports[key].replaceWith(import_)
  })

  return generate(ast).code
}

module.exports = NamespacedImports
