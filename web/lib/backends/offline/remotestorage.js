import BaseBackend from '../base'
import RemoteStorage from 'remotestoragejs'
import { ObjectId } from '../utils'
import { applyPatch, compare } from 'fast-json-patch'

class RSBackend extends BaseBackend {
  constructor ({ rs, path = 'nodes' } = {}) {
    super()
    if (!rs) {
      rs = new RemoteStorage({ logging: false })
      rs.access.claim(path, 'rw')
      rs.caching.enable(`/${path}/`)
    }
    this.rs = rs
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
    this._handleChange = this._handleChange.bind(this)
    this.client.on('change', this._handleChange)
  }

  _handleChange (event) {
    if (event.origin === 'remote') {
      console.log('remote change', event)
      if (!event.oldValue && event.newValue) {
        this.emit('remote:create', event.newValue)
      } else if (!event.newValue && event.oldValue) {
        this.emit('remote:delete', event.oldValue)
      } else {
        const update = compare(event.oldValue, event.newValue)
        this.emit('remote:update', { id: event.newValue.id, update })
      }
    } else if (event.origin === 'conflict') {
      const update = compare(event.oldValue, event.newValue)
      console.log('SYNC CONFLICT', event, update)
      if (update.length) this.emit('remote:update', { id: event.newValue.id, update })
    }
  }

  async logout () {
    return this.rs.disconnect()
  }

  async create (node) {
    node.id = node.id || ObjectId()
    await this.client.storeObject('node', node.id, node)
    return node
  }

  async retrieve (nodeId) {
    return this.client.getObject(nodeId, false)
  }

  async update (id, update) {
    const old = await this.retrieve(id)
    const updatedNode = applyPatch(old, update, /* validate */ true, /* mutate */ false).newDocument
    await this.client.storeObject('node', id, updatedNode)
    return updatedNode
  }

  async delete (id) {
    return this.client.remove(id)
  }

  async find (query) {
    if (query) throw new Error('[RSBackend]: find with query not implemented.')
    const res = await this.client.getAll('', false)
    console.log('[RSBackend] find', res)
    // NOTE: https://remotestoragejs.readthedocs.io/en/latest/js-api/base-client.html#getAll
    // For items that are not JSON-stringified objects (e.g. stored using storeFile instead of storeObject), the object’s value is filled in with true.
    // Somehow(with Armadietto server, not with php-remote-storage server) we sometimes get this 'true' values. Maybe it's .~metadata file? Need to check.
    return Object.values(res).filter(val => val !== true)
  }

  async search (text) {
    throw new Error('[RSBackend]: search not implemented.')
  }
}

export default RSBackend
