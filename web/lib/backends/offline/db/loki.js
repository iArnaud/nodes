const Loki = require('lokijs')

const setupLoki = ({ nodes, adapter }) => {
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
