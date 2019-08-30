import get from 'lodash/get'
import { findNodes } from '../node/queries'

const getNodeUsers = deps => async node => {
  const _users = get(node, 'sides.users', [])
  const ids = _users.map(user => user.id)
  const users = (await findNodes(deps)({ id: { $in: ids } })).items
  const usersById = users.reduce((obj, user) => {
    obj[user.id] = user
    return obj
  }, {})
  return {
    items: _users.map((user, i) => ({ ...get(usersById[user.id], 'sides.user', {}), role: user.role, id: user.id }))
  }
}

export default getNodeUsers
