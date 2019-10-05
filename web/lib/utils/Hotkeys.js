import React from 'react'
import { GlobalHotKeys, configure } from 'react-hotkeys'
import Router from 'next/router'
import fscreen from 'fscreen'

configure({
  logLevel: 'warning',
  ignoreEventsCondition: e => {
    const { target } = e
    if (e.altKey || e.metaKey || e.ctrlKey) {
      return true
    } else if (target && target.tagName) {
      const tagName = target.tagName.toLowerCase()
      return ['input', 'select', 'textarea'].includes(tagName) || target.isContentEditable
    } else {
      return false
    }
  }
})

const keyMap = {
  TOGGLE_FULLSCREEN: 'shift+f',
  ADD_SIDE: 's',
  ADD_NODE: 't',
  COPY_NODE: 'c',
  PASTE_NODE: 'v',
  MOVE_NODE: 'x',
  MERGE_NODE: 'm',
  DUPLICATE_NODE: 'shift+d',
  DELETE_NODE: ['del', 'backspace'],
  RENAME_NODE: 'r',
  ADD_DESKTOP_NODE: 'n',
  GO_PARENT: ['p', 'left'],
  GO_HOME: 'h',
  GO_DESKTOP: 'd',
  GO_NEXT_SIDE: ']',
  GO_PREVIOUS_SIDE: '[',
  GO_SEARCH: 'f',
  GO_SETTINGS: ',',
  GO_EDIT_SIDE: 'e',
  BROWSER_HISTORY_BACK: 'j',
  BROWSER_HISTORY_FORWARD: 'k'
}

const _handlers = ({ node, view, napi, viewer, Router }) => ({
  TOGGLE_FULLSCREEN: event => {
    event.preventDefault()
    if (fscreen.fullscreenEnabled) {
      if (!fscreen.fullscreenElement) {
        fscreen.requestFullscreenFunction(document.documentElement).bind(document.documentElement)({ navigationUI: 'hide' })
      } else {
        fscreen.exitFullscreen()
      }
    } else {
      console.warn('Fullscreen is not supported.')
    }
  },
  ADD_SIDE: event => {
    event.preventDefault()
    Router.push({ pathname: Router.pathname, query: { parent: node.id, node: '__side__' } })
  },
  ADD_NODE: event => {
    event.preventDefault()
    Router.push({ pathname: Router.pathname, query: { parent: node.id, node: '__node__' } })
  },
  MOVE_NODE: async event => {
    event.preventDefault()
    const parentId = node.parentId
    await napi.moveToClipboard(node, viewer)
    Router.push({ pathname: Router.pathname, query: { node: parentId } })
  },
  COPY_NODE: async event => {
    event.preventDefault()
    console.log('copy', node)
    await napi.copyToClipboard(node, viewer)
  },
  DUPLICATE_NODE: async event => {
    console.log('duplicate', node)
    event.preventDefault()
    const newNode = await napi.duplicateNode(node)
    Router.push({ pathname: Router.pathname, query: { node: newNode.id } })
  },
  PASTE_NODE: async event => {
    console.log('paste', node)
    event.preventDefault()
    await napi.pasteFromClipboard(node, viewer)
  },
  MERGE_NODE: async event => {
    event.preventDefault()
    await napi.mergeFromClipboard(node, viewer)
  },
  DELETE_NODE: event => {
    event.preventDefault()
    Router.push({ pathname: Router.pathname, query: { node: node.id, [`${node.id}-view`]: 'remove' } })
  },
  RENAME_NODE: event => {
    event.preventDefault()
    return napi.renameNode(node.id, `${node.name} `)
  },
  ADD_DESKTOP_NODE: async event => {
    event.preventDefault()
    const newNode = await napi.createNode(null, { parentId: node.id, sides: { desktop: {} } })
    Router.push({ pathname: Router.pathname, query: { node: newNode.id } })
  },
  GO_PARENT: event => {
    event.preventDefault()
    node.parentId && Router.push({ pathname: Router.pathname, query: { node: node.parentId } })
  },
  GO_HOME: event => {
    event.preventDefault()
    if (viewer) {
      let query = { node: viewer.node }
      if (Router.query.node === viewer.node) {
        query[`${node.id}-view`] = 'user'
      }
      Router.push({ pathname: Router.pathname, query })
    }
  },
  GO_DESKTOP: event => {
    event.preventDefault()
    Router.push({ pathname: Router.pathname, query: { node: node.id, [`${node.id}-view`]: 'desktop' } })
  },
  GO_SEARCH: event => {
    event.preventDefault()
    Router.push({ pathname: Router.pathname, query: { node: node.id, [`${node.id}-view`]: 'search' } })
  },
  GO_SETTINGS: event => {
    event.preventDefault()
    Router.push({ pathname: Router.pathname, query: { node: node.id, [`${node.id}-view`]: 'settings' } })
  },
  GO_EDIT_SIDE: event => {
    event.preventDefault()
    const _view = Router.query[`${node.id}-view`] || napi.getNodeView(node)
    Router.push({ pathname: Router.pathname, query: { node: node.id, [`${node.id}-view`]: `${_view}-edit` } })
  },
  GO_NEXT_SIDE: event => {
    event.preventDefault()
    const sides = Object.keys(node.sides)
    const idx = sides.indexOf(Router.query[`${node.id}-view`] ? Router.query[`${node.id}-view`].split('-')[0] : napi.getNodeView(node))
    const next = sides[idx + 1] || sides[0]
    Router.push({ pathname: Router.pathname, query: { node: node.id, [`${node.id}-view`]: next } })
  },
  GO_PREVIOUS_SIDE: event => {
    event.preventDefault()
    const sides = Object.keys(node.sides)
    const idx = sides.indexOf(Router.query[`${node.id}-view`] ? Router.query[`${node.id}-view`].split('-')[0] : napi.getNodeView(node))
    const next = sides[idx - 1] || sides[sides.length - 1]
    Router.push({ pathname: Router.pathname, query: { node: node.id, [`${node.id}-view`]: next } })
  },
  BROWSER_HISTORY_BACK: event => {
    event.preventDefault()
    window.history.back()
  },
  BROWSER_HISTORY_FORWARD: event => {
    event.preventDefault()
    window.history.forward()
  }
})

const Hotkeys = ({ node, view, napi, viewer }) => {
  // FIXME: maybe move Hotkeys to ui side?
  const handlers = _handlers({ node, view, napi, viewer, Router })
  return <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges />
}

export default Hotkeys
