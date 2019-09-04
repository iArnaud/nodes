import cookie from 'js-cookie'

import BaseBackend from '../base'
import FSBackend from './fs'
import { configureLoki } from './db'

import { applyPatch } from 'fast-json-patch'
import MiniSearch from 'minisearch'
import { ObjectId } from '../utils'

class OfflineBackend extends BaseBackend {
  constructor ({ nodes = [], db, adapter = 'memory' } = {}) {
    super()
    this._adapter = adapter
    this._nodes = nodes
    this._db = db
    this.fsBackend = process.browser ? new FSBackend() : null
    this._search = new MiniSearch({ fields: ['name'] })
  }

  async install () {
    const id = 'welcome'
    const tutorialId = 'tutorial'
    const userNode = await this.fsBackend.create({
      id,
      parentId: 'users',
      name: 'New User',
      status: 'ok',
      sides: {
        user: { name: 'New User', providers: { local: { id } } },
        markdown: {
          content: `
# Nodes beta

Welcome to Nodes, a hackable lightweight offline-first web system with composable apps.

1. <a href="/?node=${tutorialId}">Getting Started</a>
2. <a href="https://spectrum.chat/nodes" target="_blank">Join the community</a>

3. <a href="https://patreon.com/nodes" target="_blank">Support project </a>`
        },
        desktop: {}
      }
    })
    const tutorialNode = await this.fsBackend.create({
      id: tutorialId,
      parentId: userNode.id,
      name: 'Tutorial',
      sides: {
        markdown: {
          content: `
# Tutorial

1. Nodes is like directories with superpowers given by micro-apps called sides.
2. Each side "do one thing and do it well"(like url preview, text note and so on)
3. Node can contain one instance of each side type and another nodes.
          `
        }
      }
    })
    cookie.set('token', [id, 'local', 'admin@example.com'].join('-'))
    this._nodes.push(userNode, tutorialNode)
    return Promise.all(this._nodes.map(async node => this.fsBackend.create({ ...node, sides: { ...node.sides, users: [{ id: userNode.id, role: 'admin' }] } })))
  }

  async checkUpdates () {
    for (const node of this._nodes) {
      const res = await this.fsBackend.retrieve(node.id)
      console.log('checkUpdates found', node.name)
      if (!res) {
        console.log(node.name, 'missing, installing..')
        await this.fsBackend.create(node)
      }
    }
  }

  async getDB (collection = 'nodes') {
    if (!this._db) {
      const system = await this.fsBackend.retrieve('nodes-ws')
      if (!system) {
        console.log('no system found, installing..')
        await this.install()
        console.log('nodes.ws installed.')
      } else {
        console.log('system found', system)
        await this.checkUpdates()
      }
      const nodes = await this.fsBackend.find()
      console.log('nodes', nodes)
      await this._search.addAllAsync(nodes.map(node => ({ id: node.id, name: node.name })))
      console.log(`${this._search.documentCount} documents index for search`)
      this._db = await configureLoki({ nodes, adapter: this._adapter })
    }
    return collection ? this._db.getCollection(collection) : this._db
  }

  async saveDB () {
    const db = await this.getDB(false)
    if (this._adapter !== 'memory') {
      await new Promise(resolve => db.saveDatabase(resolve))
    }
    return db
  }

  async login (login, password) {
    const userNode = (await this.find({ parentId: 'users', name: login })).items[0]
    if (!userNode) return null
    const token = `${userNode.sides.user.providers.local.id}-local-${userNode.sides.user.email}`
    cookie.set('token', token)
    return token
  }

  async logout () {
    cookie.remove('token')
  }

  async create (node) {
    // console.log('[Offline backend] create', node)
    node.id = node.id || ObjectId()
    const nodesCollection = await this.getDB()
    const _node = nodesCollection.insert({ ...node })
    await this.saveDB()
    if (this.fsBackend) {
      this.fsBackend.create(node).then(res => console.log('fs backend created', res))
    }
    this._search.add({ id: _node.id, name: _node.name })
    // console.log('[Offline backend] created', _node)
    this.emit('node:event', { type: 'save', payload: { node: _node } })
    this.emit('node:event', { type: `child-add:${node.parentId}`, payload: { node: _node } })
    return _node
  }

  async retrieve (nodeId) {
    // console.log('[Offline backend] retrieve', nodeId)
    const nodesCollection = await this.getDB()
    const node = nodesCollection.findOne({ id: nodeId })
    // console.log('[Offline backend] retrieved', node)
    return node
  }

  async update (id, update) {
    // console.log('[Offline backend] update', id, update)
    const nodesCollection = await this.getDB()
    const old = nodesCollection.findOne({ id })
    // console.log('[Offline backend]', update)
    const updatedNode = applyPatch(old, update, /* validate */ true, /* mutate */ false).newDocument
    const node = nodesCollection.update(updatedNode)
    await this.saveDB()
    if (this.fsBackend) {
      this.fsBackend.update(id, update).then(res => console.log('fs backend updated', res))
    }
    if (old.name !== node.name) {
      this._search.remove({ id })
      this._search.add({ id, name: node.name })
    }
    // console.log('[Offline backend] updated', res)
    this.emit('node:event', { type: 'save', payload: { node } })
    this.emit('node:event', { type: `child-update:${node.parentId}`, payload: { node } })
    if (old.parentId !== node.parentId) {
      this.emit('node:event', { type: `child-remove:${old.parentId}`, payload: { node } })
      this.emit('node:event', { type: `child-add:${node.parentId}`, payload: { node } })
    }
    return node
  }

  async delete (id) {
    // console.log('[Offline backend] delete', id)
    const nodesCollection = await this.getDB()
    const res = nodesCollection.findAndRemove({ id })
    await this.saveDB()
    if (this.fsBackend) {
      this.fsBackend.delete(id).then(res => console.log('fs backend deleted', res))
    }
    this._search.remove({ id }) // NOTE: need to test
    // console.log('[Offline backend] deleted', res)
    return res
  }

  async find (query) {
    const { limit = 10, lastId, ..._query } = query
    // console.log('[Offline backend] find', query)
    const nodesCollection = await this.getDB()
    // FIXME: support pagination via id: { $gt: lastId }
    const items = nodesCollection.chain().find(_query).limit(limit).data()
    // console.log('[Offline backend] found', items)
    return { items }
  }

  async search (text) {
    const res = this._search.search(text)
    const { items } = await this.find({ id: { $in: res.map(doc => doc.id) } })
    // console.log('search', items)
    return { results: items }
  }
}

export default OfflineBackend
