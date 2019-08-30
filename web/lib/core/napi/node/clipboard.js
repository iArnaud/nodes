import mergeDeepRight from 'ramda/src/mergeDeepRight'
import { compare } from 'fast-json-patch'

import { findNode } from './queries'
import { copyNode, createNode, moveNode } from './nodeActions'
import getNodeChildren from './getNodeChildren'

const _getUserClipboard = deps => async viewer => {
  const node = await findNode(deps)({ parentId: viewer.node, name: '.Clipboard' })
  if (node.status === 'ok') {
    return node
  }
  const clipboard = await createNode(deps)(null, { parentId: viewer.node, name: '.Clipboard', sides: { desktop: {}, users: [{ id: viewer.node, role: 'user' }] } })
  return clipboard
}

export const copyToClipboard = deps => async (node, viewer) => {
  const clipboard = await _getUserClipboard(deps)(viewer)
  return copyNode(deps)(node, clipboard.id, false)
}

export const moveToClipboard = deps => async (node, viewer) => {
  const clipboard = await _getUserClipboard(deps)(viewer)
  return moveNode(deps)(node, clipboard.id)
}

export const pasteFromClipboard = deps => async (node, viewer) => {
  const clipboard = await _getUserClipboard(deps)(viewer)
  const nodeToPaste = (await getNodeChildren(deps)(clipboard)).items[0]
  if (nodeToPaste) {
    return copyNode(deps)(nodeToPaste, node.id, false)
  }
}

export const mergeFromClipboard = deps => async (node, viewer) => {
  const clipboard = await _getUserClipboard(deps)(viewer)
  const nodeToMerge = (await getNodeChildren(deps)(clipboard)).items[0]
  const merged = mergeDeepRight(node, nodeToMerge)
  const diff = compare({ sides: node.sides }, { sides: merged.sides })
  return diff
}
