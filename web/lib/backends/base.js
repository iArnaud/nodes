import EventEmitter from 'events'

const notImplementedError = name => {
  throw new Error(`Not implemented: ${name}`)
}

class BaseBackend extends EventEmitter {
  async login () {
    notImplementedError('login')
  }

  async logout () {
    notImplementedError('logout')
  }

  async create (node) {
    notImplementedError('create')
  }

  async retrieve (nodeId) {
    notImplementedError('retrieve')
  }

  async update (id, update) {
    notImplementedError('update')
  }

  async delete (id) {
    notImplementedError('delete')
  }

  async find (query) {
    notImplementedError('find')
  }

  async findOne (query) {
    notImplementedError('findOne')
  }

  async search (text) {
    notImplementedError('search')
  }
}

export default BaseBackend
