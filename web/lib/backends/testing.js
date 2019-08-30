import BaseBackend from './base'

import jsonpatch from 'fast-json-patch'
import sift from 'sift'

class TestBackend extends BaseBackend {
  constructor ({ nodes = [] } = {}) {
    super()
    this.nodesIndex = nodes.reduce((obj, node) => {
      obj[node.id] = node
      return obj
    }, {})
  }

  get nodes () {
    return Object.values(this.nodesIndex)
  }

  async create (node) {
    const id = String(Object.values(this.nodesIndex).length + 1)
    const savedNode = { ...node, id }
    this.nodesIndex[id] = savedNode
    this.emit('node:event', { type: 'save', payload: { node: savedNode } })
    return { ...savedNode }
  }

  async retrieve (nodeId) {
    const node = this.nodesIndex[nodeId]
    return node ? Promise.resolve({ ...node }) : Promise.reject(new Error(`Can't find node with id ${JSON.stringify(nodeId)}`))
  }

  async update (id, update) {
    const updatedNode = jsonpatch.applyPatch(
      this.nodesIndex[id], update,
      /* validate */ true, /* mutate */ false
    ).newDocument
    this.nodesIndex[id] = updatedNode
    return { ...updatedNode }
  }

  async delete (id) {
    const deletedNode = { ...this.nodesIndex[id] }
    delete this.nodesIndex[id]
    return deletedNode
  }

  async find (query) {
    const { limit = 10, lastId, ...match } = query
    const res = this.nodes.filter(sift(match))
    const items = res.slice(0, limit)
    return { items, total: items.length }
  }
}

export default TestBackend
