import get from 'lodash/get'
import find from 'lodash/find'

const hasPermission = (viewer, node, action) => {
  const guestPermissions = []
  const userPermissions = [...guestPermissions, 'search', 'addSide', 'changeSide', 'editSide', 'deleteSide', 'addNode', 'viewUsers']
  const adminPermissions = [...userPermissions, 'rename', 'deleteNode', 'addUser', 'deleteUser', 'changeUserPermissions']

  const roles = {
    user: userPermissions,
    admin: adminPermissions
  }

  if (viewer) {
    const nodeUsers = get(node, 'sides.users', [])
    const user = find(nodeUsers, { id: viewer.node })
    if (user) {
      return (roles[user.role] || []).includes(action)
    }
  }
  return false
}

export default hasPermission
