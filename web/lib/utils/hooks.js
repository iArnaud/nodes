import React from 'react'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'

const authenticate = napi => async token => {
  const [id, provider, email] = token.split('-')
  console.log('from authenticate', id, provider)
  let userNode
  userNode = await napi.findNode({ [`sides.user.providers.${provider}.id`]: id })
  if (userNode.status === 'error') {
    userNode = await napi.createUserNode({ id, provider, email })
  }
  const user = userNode.sides.user
  return { ...user, providers: Object.keys(user.providers), node: userNode.id }
}

export const usePageState = (napi) => {
  const router = useRouter()
  const [state, setState] = React.useState({ node: null, view: null, viewer: null })
  const { node: nodeId, parent: parentId } = router.query
  const token = cookie.get('token')
  React.useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const nodeId = query.get('node')
    const parentId = query.get('parent')
    const _view = query.get(`${nodeId}-view`)
    const plain = router.query[`${nodeId}-plain`] || nodeId === '__login__' || !nodeId
    const view = plain ? _view : 'ui'
    const getPageState = async () => {
      const viewer = token ? await authenticate(napi)(token) : null
      if (viewer === null && nodeId !== '__login__') {
        return router.push({ pathname: router.pathname, query: nodeId ? { node: '__login__', parent: nodeId } : { node: '__login__' } })
      }
      if (viewer && (!nodeId || nodeId === '__login__')) {
        return router.push({ pathname: router.pathname, query: { node: (!nodeId || nodeId === '__login__') ? viewer.node : nodeId } })
      }
      const node = nodeId ? await napi.getNode(nodeId, parentId) : null
      setState({ node, viewer, view })
    }
    // NOTE: hack to overcome how next.js handle prerendering, when on first load router.query is empty, while actual query is not.
    if (nodeId === (router.query.node || null)) {
      getPageState()
    }
  }, [token, nodeId, parentId])
  return state
}
