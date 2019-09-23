const logger = require('../logger')
const nodes = require('./nodes')

const user = { name: 'admin', email: process.env.ADMIN_USER_EMAIL || 'admin@example.com', password: process.env.ADMIN_USER_PASSWORD || 'admin' }

module.exports = async function (app) {
  // // Wait for MongoDB to connect https://github.com/feathersjs/feathers/issues/805#issuecomment-361100134
  // await app.get('mongoClient')
  // await app.service('users').remove(null, {})
  // await app.service('nodes').remove(null, {})
  // return
  const usersService = app.service('users')
  const nodesService = app.service('nodes')
  const { total: totalNodes } = await nodesService.find({ query: { $limit: 0 } })
  const { total: totalUsers } = await usersService.find({ query: { $limit: 0 } })
  logger.info(`Found ${totalNodes} nodes in db`)

  if (!totalNodes && !totalUsers) {
    logger.info('Installing nodes..')
    const adminUser = await usersService.create({ email: user.email, password: user.password })
    const userNode = await nodesService.create({
      id: adminUser._id,
      parentId: 'users',
      name: user.name,
      sides: {
        user: { name: user.name, email: user.email, providers: { hub: { id: adminUser.id } } },
        users: [{ id: adminUser._id, role: 'admin' }],
        desktop: {}
      } })

    await Promise.all(nodes.map(node => nodesService.create({ ...node, sides: { ...node.sides, users: [{ id: userNode.id, role: 'admin' }] } })))
    logger.info(`${nodes.length} nodes installed.`)
  } else {
    logger.info('Checking updates..')
    for (const node of nodes) {
      const res = await nodesService.get(node.id)
      if (!res) {
        logger.info(node.name, 'missing, installing..')
        await nodesService.create(node)
      }
    }
  }
}
