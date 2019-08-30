import EventEmitter from 'events'
import axios from 'axios'

import { getNode, getNodeChildren, getNodeView, renameNode, createNode, updateNode, copyNode, duplicateNode, moveNode, deleteNode, pinNode, execMethod, createUserNode } from './node'
import { findNode, findNodes, getRootNode, getPluginNodes } from './node/queries'
import search from './node/search'
import { addNodeSide, updateNodeSide, deleteNodeSide } from './node/side'
import { moveToClipboard, copyToClipboard, pasteFromClipboard, mergeFromClipboard } from './node/clipboard'
import { getView, loadPlugin } from './view'
import { getNodeBackground } from './view/utils'
import { getNodeUsers, getUser, hasPermission } from './users'
// import { createViewFromSrc } from '../utils'
import { login, logout, setToken, getToken } from './auth'
import { handleNodeEvents, subscribeToNodeUpdates, unsubscribeFromNodeUpdates, subscribeToNodeChildrenUpdates, unsubscribeFromNodeChildrenUpdates, emitNodeSideEvent, subscribeToNodeSideEvent, unsubscribeFromNodeSideEvent } from './events'
import SimpleCache from './cache'

const init = ({ backend, cache, http, env, events, searchEngines, dimport }) => {
  dimport = dimport || ((typeof window !== 'undefined') ? require('dimport').default : () => { throw Error('No dimport on server, yet.') })

  cache = cache || new SimpleCache()

  http = http || axios.create()
  http.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 401) {
      backend.removeToken()
    }
    return Promise.reject(error)
  })

  env = env || {}

  if (!events) {
    const defaultEvents = new EventEmitter()
    defaultEvents.setMaxListeners(0)
    events = defaultEvents
  }

  handleNodeEvents({ backend, cache, events })

  let napi = {} // this will be lightweight variant of napi for consumption by execMethod
  napi.findNode = findNode({ backend })
  napi.findNodes = findNodes({ backend })
  napi.getPluginNodes = getPluginNodes({ backend })

  return {
    deps: process.browser && typeof window !== 'undefined' && window.Cypress ? { backend, cache, http, env, events, dimport } : null,
    getNode: getNode({ backend, napi }),
    getNodeChildren: getNodeChildren({ backend, napi }),
    getView: getView({ backend, cache, http, env, dimport }),
    loadPlugin: loadPlugin({ backend, cache, http, env, dimport }),
    getNodeUsers: getNodeUsers({ backend }),
    createUserNode: createUserNode({ backend }),
    getNodeView, // FIXME: bad name, maybe getNodeCurrentView?
    renameNode: renameNode({ backend }),
    createNode: createNode({ backend }),
    updateNode: updateNode({ backend }),
    copyNode: copyNode({ backend }),
    duplicateNode: duplicateNode({ backend }),
    moveNode: moveNode({ backend }),
    deleteNode: deleteNode({ backend }),
    search: search({ backend }),
    pinNode: pinNode({ backend }),
    moveToClipboard: moveToClipboard({ backend }), // TODO: tests
    copyToClipboard: copyToClipboard({ backend }), // TODO: tests
    pasteFromClipboard: pasteFromClipboard({ backend }), // TODO: tests
    mergeFromClipboard: mergeFromClipboard({ backend }), // TODO: tests
    addNodeSide: addNodeSide({ backend, http, env, cache, dimport }),
    updateNodeSide: updateNodeSide({ backend }),
    deleteNodeSide: deleteNodeSide({ backend, http, env, cache, dimport }),
    findNodes: findNodes({ backend }),
    findNode: findNode({ backend }),
    getRootNode: getRootNode({ backend }),
    getPluginNodes: getPluginNodes({ backend }),
    subscribeToNodeUpdates: subscribeToNodeUpdates({ events }),
    unsubscribeFromNodeUpdates: unsubscribeFromNodeUpdates({ events }),
    subscribeToNodeChildrenUpdates: subscribeToNodeChildrenUpdates({ events }),
    unsubscribeFromNodeChildrenUpdates: unsubscribeFromNodeChildrenUpdates({ events }),
    emitNodeSideEvent: emitNodeSideEvent({ backend }),
    subscribeToNodeSideEvent: subscribeToNodeSideEvent({ backend }),
    unsubscribeFromNodeSideEvent: unsubscribeFromNodeSideEvent({ backend }),
    getUser: getUser({ backend, cache }),
    login: login({ backend, cache }), // TODO: tests
    logout: logout({ backend, cache }), // TODO: tests
    setToken: setToken({ backend, cache }), // TODO: tests
    getToken: getToken({ backend }), // TODO: tests
    getNodeBackground, // TODO: tests
    // createViewFromSrc, // FIXME: tests, incredible it is in public surface. Refactor!
    hasPermission, // TODO: tests
    execMethod: execMethod({ napi }) // TODO: tests
  }
}

export default init
