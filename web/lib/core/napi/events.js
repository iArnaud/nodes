export const handleNodeEvents = ({ backend, events }) => {
  backend.on('node:event', ({ type, payload: { node } }) => {
    console.log('NODE:EVENT', type, node)
    if (type === 'save') {
      events.emit(`${node.id}-update`, node)
    } else if (type === 'remove') {
      events.removeAllListeners(`${node.id}-update`)
    } else if (type.startsWith('child')) {
      const [operation, parentId] = type.split(':')
      if (operation === 'child-add') {
        events.emit(`${parentId}-child-update`, { node, type: 'add' })
      } else if (operation === 'child-update') {
        events.emit(`${parentId}-child-update`, { node, type: 'update' })
      } else if (operation === 'child-remove') {
        events.emit(`${parentId}-child-update`, { node, type: 'remove' })
      }
    }
  })
}

export const subscribeToNodeChildrenUpdates = ({ events }) => (id, cb) => events.on(`${id}-child-update`, cb)
export const unsubscribeFromNodeChildrenUpdates = ({ events }) => (id, cb) => events.removeListener(`${id}-child-update`, cb)
export const subscribeToNodeUpdates = ({ events }) => (id, cb) => events.on(`${id}-update`, cb)
export const unsubscribeFromNodeUpdates = ({ events }) => (id, cb) => events.removeListener(`${id}-update`, cb)
export const emitNodeSideEvent = ({ backend }) => (node, sideName, eventName, payload) => backend.emitEvent(`${node.id}:${sideName}:${eventName}`, payload)
export const subscribeToNodeSideEvent = ({ backend }) => (node, sideName, eventName, cb) => backend.subscribeToEvent(`${node.id}:${sideName}:${eventName}`, cb)
export const unsubscribeFromNodeSideEvent = ({ backend }) => (node, sideName, eventName, cb) => backend.unsubscribeFromEvent(`${node.id}:${sideName}:${eventName}`, cb)
