import BaseBackend from './base'
import OfflineBackend from './offline'
import TestingBackend from './testing'

class HybridBackend extends BaseBackend {
  constructor ({ offlineBackend, apiBackend }) {
    super()
    this.offlineBackend = offlineBackend || new OfflineBackend()
    this.apiBackend = apiBackend || new TestingBackend()
    this.isBrowser = process.browser
    this.offlineBackend.on('node:event', data => this.emit('node:event', data))
  }

  async create (node) {
    // console.log('[Hybrid backend] create', node)
    return this.isBrowser ? this.offlineBackend.create(node) : this.apiBackend.create(node)
  }

  async retrieve (nodeId) {
    // console.log('[Hybrid backend] retrieve', nodeId)
    return this.isBrowser ? this.offlineBackend.retrieve(nodeId) : this.apiBackend.retrieve(nodeId)
  }

  async update (id, update) {
    // console.log('[Hybrid backend] update', id, update)
    return this.isBrowser ? this.offlineBackend.update(id, update) : this.apiBackend.update(id, update)
  }

  async delete (id) {
    // console.log('[Hybrid backend] delete', id)
    return this.isBrowser ? this.offlineBackend.delete(id) : this.apiBackend.delete(id)
  }

  async find (query) {
    // console.log('[Hybrid backend] find', query)
    return this.isBrowser ? this.offlineBackend.find(query) : this.apiBackend.find(query)
  }

  async findOne (query) {
    // console.log('[Hybrid backend] find one', query)
    return this.isBrowser ? this.offlineBackend.findOne(query) : this.apiBackend.findOne(query)
  }

  async search (text) {}
}

export default HybridBackend
