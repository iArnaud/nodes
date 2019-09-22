const app = require('./src/app')
const nodes = require('../web/lib/nodes')

const user = { name: 'Test User', email: 'test@example.com', password: 'test' }

const seed = async () => {
  await app.service('users').remove(null, {})
  await app.service('nodes').remove(null, {})
  const testUser = await app.service('users').create({ email: user.email, password: user.password })
  console.log('testUser', testUser)
  const testNode = await app.service('nodes').create({
    id: testUser._id,
    name: user.name,
    sides: {
      user: { name: user.name, email: user.email, providers: { hub: { id: testUser.id } } },
      users: [{ id: testUser._id, role: 'admin' }],
      desktop: {}
    } })
  console.log('testNode', testNode)
  for (const _node of nodes) {
    console.log('creating', _node.name)
    const node = await app.service('nodes').create(_node)
    console.log('created', node.name, node.id)
  }
}

seed()
