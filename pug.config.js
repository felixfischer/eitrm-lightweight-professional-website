const fs = require('fs')
const jsYaml = require('js-yaml')
const readdir = require("readdir-enhanced")
const indexBy = require('lodash.indexby')
const map = require('lodash.map')
const findWhere = require('lodash.findwhere')
 
const collectionsDir = './src/collections'

const data = jsYaml.safeLoad(fs.readFileSync('./src/data/main.yml', 'utf8'))
data.collections = {}

let collectionsFiles = readdir.sync(collectionsDir, { filter: '**/*.yml', deep: 1 })
collectionsFiles.forEach(relativePath => {
  let collectionName = relativePath.split('/')[0]
  let obj = jsYaml.safeLoad(fs.readFileSync(collectionsDir + '/' + relativePath, 'utf8'))
  if (!Object.keys(data.collections).includes(collectionName)) {
    data.collections[collectionName] = []
  }
  data.collections[collectionName].push(obj)
})

function includeRelatedItems(dataObj, parentCollection, relatedCollection) {
  let collectionItems = dataObj[parentCollection]
  collectionItems = map(collectionItems, (item) => {
    // each of parentCollection
    if (Object.keys(item).includes(relatedCollection)) {
      // parentCollection has a key for relatedCollection
      item[relatedCollection + '_data'] = map(dataObj[relatedCollection], findWhere(dataObj[relatedCollection], {title: item[relatedCollection]}))
    }
    return item
  })
}

includeRelatedItems(data.collections, 'levels', 'modules')
//console.log(data.collections.levels)

module.exports = {
  locals: data
}
