const Loki = require('lokijs')
const LokiIndexedAdapter = require('lokijs/src/loki-indexed-adapter')

const setupLoki = ({ nodes, adapter }) => {
  if (adapter === 'indexdb') {
    return new Promise((resolve, reject) => {
      const databaseInitialize = () => {
        let nodesCollection = db.getCollection('nodes')
        if (!nodesCollection) {
          nodesCollection = db.addCollection('nodes', { unique: ['id'] })
          // nodesCollection.setChangesApi(true)
          nodes.forEach(node => nodesCollection.insert(node))
          db.saveDatabase(() => resolve(db))
        } else {
          resolve(db)
        }
      }
      const db = new Loki('nodehub', {
        adapter: new LokiIndexedAdapter('nodes'),
        autoload: true,
        autoloadCallback: databaseInitialize,
        autosave: false
      })
    })
  }
  return new Promise(resolve => {
    const db = new Loki('nodehub')
    let nodesCollection = db.getCollection('nodes')
    if (!nodesCollection) {
      nodesCollection = db.addCollection('nodes', { unique: ['id'] })
      // nodesCollection.setChangesApi(true)
      nodes.forEach(node => {
        // console.log(node.name)
        nodesCollection.insert(node)
      })
    }
    resolve(db)
  })
}

const configureDB = async ({ nodes, adapter = 'memory' }) => {
  const db = await setupLoki({ nodes, adapter })
  const nodesCollection = db.getCollection('nodes')
  console.log('number of nodes in database : ' + nodesCollection.count())
  return db
}

module.exports = configureDB
