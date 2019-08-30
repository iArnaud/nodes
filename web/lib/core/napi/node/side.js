import { updateNode } from './nodeActions'
import { loadPlugin } from '../view/getView'

export const addNodeSide = deps => async (node, sideName, pluginDeps, initialValue = {}) => {
  const plugin = await loadPlugin(deps)(node, sideName, pluginDeps)
  let value = { __creator__: pluginDeps.viewer ? pluginDeps.viewer.node : null, ...initialValue }
  if (plugin.create) {
    const res = await plugin.create({ node })
    value = { ...res.side, ...value }
  }
  return updateNode(deps)(node.id, [ { op: 'add', path: `/sides/${sideName}`, value } ])
}

export const updateNodeSide = deps => async (node, sideName, value) => {
  return updateNode(deps)(node.id, [{ op: 'add', path: `/sides/${sideName}`, value }])
}

export const deleteNodeSide = deps => async (node, sideName, pluginDeps) => {
  const plugin = await loadPlugin(deps)(node, sideName, pluginDeps)
  if (plugin.delete) {
    await plugin.delete({ node })
  }
  return updateNode(deps)(node.id, [{ op: 'remove', path: `/sides/${sideName}` }])
}
