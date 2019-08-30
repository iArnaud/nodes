import { _getNodeFromBackend } from '../node/getNode'

const getUser = deps => async () => {
  const { backend, cache } = deps
  if (cache.get('user')) return cache.get('user')
  let user = await backend.getUser()
  if (user) {
    const userNode = await _getNodeFromBackend(deps)(user.node)
    user = { ...user, ...userNode.sides.user }
  }
  cache.set('user', user)
  return user
}

export default getUser
