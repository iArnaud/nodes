import BaseBackend from '../base'
import RemoteStorage from 'remotestoragejs'
import { ObjectId } from '../utils'
import { applyPatch } from 'fast-json-patch'

class RSBackend extends BaseBackend {
  constructor ({ rs, path = 'nodes' } = {}) {
    super()
    rs = rs || new RemoteStorage({ logging: true })
    rs.access.claim(path, 'rw')
    rs.caching.enable(`/${path}/`)
    this.client = rs.scope(`/${path}/`)
    this.client.declareType('node', {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        status: { type: 'string' },
        sides: { type: 'object' }
      }
    })
    if (typeof window !== 'undefined') {
      window.remotestorage = rs
    }
  }

  async create (node) {
    node.id = node.id || ObjectId()
    await this.client.storeObject('node', `/${node.id}`, node)
    return node
  }

  async retrieve (nodeId) {
    return this.client.getObject(`/${nodeId}`, false)
  }

  async update (id, update) {

  }

  async delete (id) {
    return this.client.remove(id)
  }

  async find (query) {
    if (query) throw new Error('[RSBackend]: find with query not implemented.')
    const res = await this.client.getAll('/')
    return Object.values(res)
  }

  async search (text) {
    throw new Error('[RSBackend]: search not implemented.')
  }
}

export default RSBackend
