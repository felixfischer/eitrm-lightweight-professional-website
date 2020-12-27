const fs = require('fs')
const jsYaml = require('js-yaml')
const readdir = require("readdir-enhanced")
 
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
console.log(data)

module.exports = {
  locals: data
}
