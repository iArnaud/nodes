import React from 'react'
import NodeMessage from './NodeMessage'
import { Box } from 'grommet'

const NodeView = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      View: null,
      node: null,
      error: null
    }
  }

  async getView (node, view, mode) {
    const { napi, viewer, ...deps } = this.props
    view = view || napi.getNodeView(node)
    return napi.getView(node, mode ? `${view}-${mode}` : view, { napi, NodeView, viewer, ...deps })
  }

  async componentDidMount () {
    const { napi, view, mode } = this.props
    let { node } = this.props
    // node.children = node.children || await napi.getNodeChildren(node)
    const View = await this.getView(node, view, mode)
    napi.subscribeToNodeUpdates(node.id, this.updateNode)
    return this.setState({ node, View })
  }

  async componentDidUpdate (prevProps, prevState) {
    const { napi, view, mode, viewer } = this.props
    let { node } = this.props
    // node.children = node.children || await napi.getNodeChildren(node)

    let stateUpdate = {}
    const nodeChanged = (prevProps.node && node.id !== prevProps.node.id) || (prevProps.node && node.parentId !== prevProps.node.parentId)
    const viewChanged = (view !== prevProps.view || mode !== prevProps.mode)
    const viewerChanged = (viewer !== prevProps.viewer)
    if (nodeChanged) { // node from props changed - via router
      napi.unsubscribeFromNodeUpdates(prevProps.node.id, this.updateNode)
      napi.subscribeToNodeUpdates(node.id, this.updateNode)
      stateUpdate.node = node
      stateUpdate.View = await this.getView(stateUpdate.node, view, mode)
    } else if (viewChanged || viewerChanged) { // view changed - from props or via layout
      stateUpdate.View = await this.getView(node, view, mode)
    }
    // node was updated from socket - no action required?
    if (Object.keys(stateUpdate).length) {
      return this.setState(stateUpdate)
    }
  }

  componentWillUnmount () {
    // FIXME: need to stop all requests and unsubscribe from node updates.
    const { napi, node } = this.props
    // napi.backend.abortAllRequests()
    napi.unsubscribeFromNodeUpdates(node.id, this.updateNode)
  }

  componentDidCatch (error, info) {
    const { node, view } = this.props
    console.error(`componentDidCatch in ${node.name}, view: ${view}`, this.props, error)
    return this.setState({ error })
  }

  updateNode = async (node) => {
    const { napi } = this.props
    node = await napi.getNode(node.id)
    return this.setState({ node })
  }

  render () {
    const { view, mode, napi } = this.props
    const { View, node, error } = this.state
    if (error) {
      return <NodeMessage node={node} message={error.message} color='status-error' />
    }

    if (!View || !node) {
      return null
    }
    const testid = `${node.name}.${view ? view.split('-')[0] : napi.getNodeView(node)}.${mode || (view ? view.split('-')[1] || 'view' : 'view')}`
    return <Box animation={{ type: 'fadeIn', duration: 500 }} fill align='center' justify='center' data-nodeid={node.id} data-testid={testid}><View node={node} /></Box>
  }
}

export default NodeView
