import { findNode } from '../node/queries'
import { imports } from '../../utils'

const getView = deps => async (node, view, pluginDeps) => {
  try {
    const [ pluginName, mode ] = view.split('-')
    // console.log('getView', pluginName, mode)
    const plugin = await loadPlugin(deps)(node, pluginName, pluginDeps)
    return plugin.modes[mode || 'view']
  } catch (e) {
    console.error(e)
    console.error('ERROR in getView', node, view, pluginDeps)
    return () => e.message
  }
}

export const loadPlugin = deps => async (node, pluginName, pluginDeps) => {
  const { cache, dimport } = deps
  const cacheName = `plugins:${pluginName}`
  const loadModule = async url => {
    const module = await dimport(url)
    cache.set(cacheName, module)
    return module
  }
  let module
  if (cache.get(cacheName)) {
    module = cache.get(cacheName)
  } else if (pluginName.startsWith('http')) {
    module = await loadModule(pluginName)
  } else {
    const pluginNode = await findNode(deps)({ 'sides.plugin': { '$ne': null }, name: pluginName })
    // console.log('pluginNode', pluginNode)
    module = await loadModule(pluginNode.sides.plugin.url)
  }
  // keep old plugins deps names to ease migration
  const plugin = await module.default({ __deps__: pluginDeps, __imports__: imports, __props__: { node } })
  return plugin
}

export default getView
