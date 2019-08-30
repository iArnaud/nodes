import { _getErrorNode } from './getNode'

export const findNodes = ({ backend }) => async query => backend.find(query)

export const findNode = deps => async query => {
  const res = (await findNodes(deps)(query)).items[0]
  return res || _getErrorNode('error404', null, { message: `Error 404: Not Found for query: ${JSON.stringify(query)}` })
}

export const getRootNode = deps => async () => findNode(deps)({ parentId: null })

export const getPluginNodes = deps => async () => findNodes(deps)({ 'sides.plugin': { '$ne': null }, 'sides.plugin.canAdd': { '$eq': true } })

export const _getTemplateNodes = deps => async nodeId => {
  const base = [{ id: '__none__', name: 'Desktop', status: 'ok', children: [], sides: { desktop: true } }]
  // FIXME: maybe simplify? Need to think about this approach. Now it works incorrect beause of no pagination handling
  const nodesWithTemplates = (await findNodes(deps)({ name: 'Templates' })).items
  const templates = await nodesWithTemplates.reduce(async (collectionPromise, templatesNode) => {
    let collection = await collectionPromise
    const _templates = (await findNodes(deps)({ parentId: templatesNode.id })).items
    return collection.concat(_templates)
  }, Promise.resolve([]))
  const templateNodes = [...base, ...templates]
  return { items: templateNodes } // somedays here will be pagination, I hope:)
}

export const _getUserNodes = deps => async () => findNodes(deps)({ 'sides.user': { '$ne': null }, 'sides.user.providers.local': { '$ne': undefined } })
