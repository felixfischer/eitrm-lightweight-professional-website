const fs = require('fs')
const jsYaml = require('js-yaml')
const readdir = require('readdir-enhanced')
const _ = require('lodash')
 
const collectionsDir = './src/collections'
const dataDir = './src/data'
const netlifyCmsConfigFile = './src/static/admin/config.yml'

function loadFolderCollections() {
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

function loadFileCollections() {
  let collectionsFiles = readdir.sync(dataDir, { filter: '*.yml' })
  let collections = {}
  collectionsFiles.forEach(relativePath => {
    let obj = jsYaml.safeLoad(fs.readFileSync(dataDir + '/' + relativePath, 'utf8'))
    let collectionName = relativePath.split('/').pop().slice(0, -4)
    collections[collectionName] = obj
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

let data = loadFileCollections()
data.collections = loadFolderCollections()
data.netlifyCmsConfig = jsYaml.safeLoad(fs.readFileSync(netlifyCmsConfigFile, 'utf8'))
includeRelatedItems(data.collections, 'levels', 'modules')

//console.log(JSON.stringify(data.netlifyCmsConfig, null, 2))

data.marked = require('marked')
data.filter = _.filter

module.exports = {
  locals: data
}
