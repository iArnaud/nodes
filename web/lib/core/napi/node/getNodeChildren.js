import get from 'lodash/get'
import { _getErrorNode } from './getNode'
import { findNodes } from './queries'
import execMethod from './execMethod'

const getNodeChildren = deps => async (node, limit, lastId) => {
  let nodeChildren = []
  try {
    if (_hasComputableChildren(node)) {
      nodeChildren = await execMethod(deps)(node, '__children__')
    } else {
      nodeChildren = await findNodes(deps)({ parentId: node.id, limit, lastId })
    }
  } catch (e) {
    nodeChildren = [_getErrorNode(node.id, node.parentId, e)]
  }
  return nodeChildren
}

const _hasComputableChildren = node => get(node, 'sides.methods.methods.__children__')

export default getNodeChildren
