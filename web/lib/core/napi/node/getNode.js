import get from 'lodash/get'
import { _isUrl, _isSystemNodeId } from '../utils'
import { getPluginNodes, _getTemplateNodes, _getUserNodes } from './queries'

const getNode = deps => async (id, parentId) => {
  let node
  try {
    node = await _getNodeFrom(deps)(id, parentId)
  } catch (e) {
    console.error('ERROR in getNode', e)
    node = _getErrorNode(id, parentId, e)
  }
  node.sides.settings = node.sides.settings || await _getRecursively(deps)(node, 'sides.settings')
  node.sides.users = node.sides.users || await _getRecursively(deps)(node, 'sides.users')
  return node
}

export const _getErrorNode = (id, parentId, error) => {
  const errorNode = {
    id,
    parentId,
    name: error.message,
    status: 'error',
    sides: {
      error: {
        message: error.message,
        stack: error.stack
      }
    }
  }
  return errorNode
}

const _getNodeFrom = deps => async (id, parentId) => {
  return _isSystemNodeId(id)
    ? _getSystemNode(deps)(id, parentId)
    : _isUrl(id) ? _getNodeFromUrl(deps)(id, parentId)
      : _getNodeFromBackend(deps)(id, parentId)
}

const _getSystemNode = deps => async (id, parentId) => {
  let node
  const parent = parentId ? await getNode(deps)(parentId) : null
  if (id === '__side__') {
    const children = (await getPluginNodes(deps)()).items
    node = {
      id,
      parentId,
      name: 'Add Side',
      status: 'ok',
      sides: {
        side: {},
        settings: parent.sides.settings
      },
      children
    }
  } else if (id === '__node__') {
    const children = (await _getTemplateNodes(deps)(parentId)).items
    node = {
      id,
      parentId,
      name: 'Add Node',
      status: 'ok',
      sides: {
        node: {},
        settings: parent.sides.settings
      },
      children
    }
  } else if (id === '__login__') {
    node = {
      id,
      parentId,
      name: parent ? `Login to ${parent.name}` : 'Login to Nodes',
      status: 'ok',
      sides: {
        login: {},
        settings: parent ? parent.sides.settings : {}
      }
    }
  } else if (id === '__nstore__') {
    node = {
      id,
      parentId,
      name: 'NStore',
      status: 'ok',
      sides: {
        nstore: {}
      }
    }
  }
  return node
}

const _getNodeFromUrl = ({ http }) => async (url, parentId) => {
  const res = await http.get(url)
  const node = res.data
  return { ...node, parentId }
}
export const _getNodeFromBackend = ({ backend }) => async (id, parentId) => {
  const node = await backend.retrieve(id)
  return { ...node, parentId: parentId || node.parentId }
}

const _getRecursively = deps => async (node, path, defaultValue) => {
  const value = get(node, path)
  if (value) {
    return value
  } else if (node.parentId) {
    const parent = await _getNodeFromBackend(deps)(node.parentId)
    return _getRecursively(deps)(parent, path, defaultValue)
  }
  return defaultValue
}

export default getNode
