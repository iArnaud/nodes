import BaseBackend from '../base'
import FS from '@isomorphic-git/lightning-fs'
import { ObjectId } from '../utils'
import { applyPatch } from 'fast-json-patch'

class FSBackend extends BaseBackend {
  constructor ({ fs, name = 'nodesfs' } = {}) {
    super()
    this.fs = fs || new FS(name)
    this.pfs = this.fs.promises
  }

  async create (node) {
    node.id = node.id || ObjectId()
    await this.pfs.writeFile(`/${node.id}`, JSON.stringify(node), 'utf8')
    return node
  }

  async retrieve (nodeId) {
    let file
    try {
      file = await this.pfs.readFile(`/${nodeId}`, 'utf8')
    } catch (e) {
      console.error(e)
    }
    return file ? JSON.parse(file) : null
  }

  async update (id, update) {
    const old = await this.retrieve(id)
    const updatedNode = applyPatch(old, update, /* validate */ true, /* mutate */ false).newDocument
    await this.pfs.writeFile(`/${id}`, JSON.stringify(updatedNode), 'utf8')
    return updatedNode
  }

  async delete (id) {
    await this.pfs.unlink(`/${id}`)
    return id
  }

  async find (query) {
    if (query) throw new Error('[FSBackend]: find with query not implemented.')
    const nodeIds = await this.pfs.readdir('/')
    return Promise.all(nodeIds.map(async nodeId => this.retrieve(nodeId)))
  }

  async search (text) {
    throw new Error('[FSBackend]: search not implemented.')
  }
}

export default FSBackend
