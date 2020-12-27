const fs = require('fs')
const jsYaml = require('js-yaml')
const readdir = require('readdir-enhanced')
const _ = require('lodash')
 
const dataFile = './src/data/main.yml'
const collectionsDir = './src/collections'

function loadCollections() {
  let collectionsFiles = readdir.sync(collectionsDir, { filter: '**/*.yml', deep: 1 })
  let collections = {}
  collectionsFiles.forEach(relativePath => {
    let collectionName = relativePath.split('/')[0]
    let obj = jsYaml.safeLoad(fs.readFileSync(collectionsDir + '/' + relativePath, 'utf8'))
    if (!Object.keys(collections).includes(collectionName)) {
      collections[collectionName] = []
    }
    collections[collectionName].push(obj)
  })
  Object.keys(collections).forEach(function (collName) {
    collections[collName] = _.sortBy(collections[collName], 'order')
  })
  return collections
}

function includeRelatedItems(dataObj, parentCollection, relatedCollection) {
  let collectionItems = dataObj[parentCollection]
  collectionItems = _.map(collectionItems, (item) => {
    // map each item of parentCollection (e.g., 'level 1')
    item[relatedCollection] = _.filter(dataObj[relatedCollection], {level: item.title})
    return item
  })
}

let data = jsYaml.safeLoad(fs.readFileSync(dataFile, 'utf8'))
data.collections = loadCollections()
includeRelatedItems(data.collections, 'levels', 'modules')

data.marked = require('marked')

module.exports = {
  locals: data
}
