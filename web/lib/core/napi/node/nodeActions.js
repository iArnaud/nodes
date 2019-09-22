import get from 'lodash/get'

import getNode, { _getNodeFromBackend } from './getNode'
import getNodeChildren from './getNodeChildren'

export const renameNode = deps => async (id, name) => updateNode(deps)(id, [{ op: 'replace', path: '/name', value: name }])

export const createNode = deps => async (type, props, ...children) => {
  const { backend } = deps
  props.sides = props.sides || {}
  if (props.parentId) {
    const parent = await _getNodeFromBackend(deps)(props.parentId)
    props.sides.users = get(props, 'sides.users') || parent.sides.users
  }
  const node = await backend.create(new _Node(props))
  // await Promise.all(children.map(async (child) => {
  //   await this.createNode(child.type, {...child.props, parentId: node.id}, ...child.children)
  // }))
  return node
}

export const pinNode = deps => async (node, parentId) => {
  return createNode(null, { parentId, name: `${node.name} link`, sides: { settings: get(node, 'sides.settings'), link: { nodeId: node.id } } })
}

export const copyNode = deps => async (node, parentId, rename = true) => {
  const { sides, name } = node
  const newName = rename ? (typeof rename === 'string' ? rename : `${name} copy`) : name
  const newNode = await createNode(deps)(null, { name: newName, parentId, sides })
  // FIXME: need to reimplement children logic as pagination was added
  const children = (await getNodeChildren(deps)(node)).items
  await Promise.all(children.map(async (child) => {
    return copyNode(deps)(child, newNode.id, false)
  }))
  return newNode
}

export const duplicateNode = deps => async node => copyNode(deps)(node, node.parentId)

export const moveNode = deps => async (node, parentId) => updateNode(deps)(
  node.id, [{ op: 'replace', path: '/parentId', value: parentId }]
)

export const deleteNode = deps => async id => {
  const { backend } = deps
  // FIXME: need to reimplement children logic as pagination was added
  const node = await getNode(deps)(id)
  const children = (await getNodeChildren(deps)(node)).items
  await backend.delete(id)
  return Promise.all(children.map(async (child) => {
    return deleteNode(deps)(child.id)
  }))
}

export const updateNode = ({ backend }) => async (id, update) => backend.update(id, update)

// FIXME: move to napi?
export const createUserNode = deps => async ({ id, provider, ...rest }) => {
  const name = id
  const userNode = {
    parentId: 'users',
    name,
    sides: {
      settings: {
        public: true,
        ui: {
          background: {
            image: 'linear-gradient(to right, #12c2e9, #c471ed, #f64f59)'
          }
        }
      },
      user: {
        name,
        providers: {
          [provider]: {
            id,
            ...rest
          }
        }
      },
      users: [],
      desktop: true
    }
  }
  const saved = await createNode(deps)(null, userNode)
  const updated = await updateNode(deps)(saved.id, [{ op: 'add', path: '/sides/users/0', value: { id: saved.id, role: 'admin' } }])
  return updated
}

// FIXME: refactor to function
class _Node {
  constructor ({ name = 'Untitled node', id = null, status = 'ok', parentId = null, sides = { desktop: {}, settings: {}, users: [] }, children = [], createdAt, updatedAt, creatorId }) {
    if (id) this.id = id
    this.name = name
    this.status = status
    this.parentId = parentId
    this.sides = sides
    this.children = children
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
