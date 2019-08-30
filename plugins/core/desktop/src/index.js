export default async ({ __deps__, __imports__ }) => {
  const { Box, ResponsiveContext } = __imports__.grommet
  const { React, lodash: _, icons, DnD, lib, Router } = __imports__.utils
  const { NodePreview, NodeDragTypes, NodeGrid } = __imports__.nodehub
  const { napi, viewer, iconSize, NodeView } = __deps__

  const useNodeChildren = node => {
    const [nodeChildren, setNodeChildren] = React.useState([])
    const lastId = React.useRef(null)
    const hasMore = React.useRef(false)
    const parentNode = node
    React.useEffect(() => {
      let unmounted = false
      const getNodeChildren = async () => {
        const result = await napi.getNodeChildren(node, 32)
        const children = result.items
        // console.log(node.name, 'initial children', children)
        if (!unmounted) {
          lastId.current = result.lastId
          hasMore.current = result.hasMore
          setNodeChildren(children.filter(child => _.get(node, 'sides.settings.ui.showHidden') || !child.name.startsWith('.')))
        }
      }

      getNodeChildren()
      return () => {
        unmounted = true
      }
    }, [node.id])
    React.useEffect(() => {
      const handleNodeChildrenUpdates = async ({ node, type }) => {
        if (type === 'update') {
          console.log(parentNode.name, 'child updated', node.name)
          setNodeChildren(nodeChildren => nodeChildren.map(child => child.id === node.id ? node : child))
        } else if (type === 'add') {
          console.log(parentNode.name, 'child added', node.name)
          setNodeChildren(nodeChildren => [...nodeChildren, node])
        } else if (type === 'remove') {
          console.log(parentNode.name, 'child removed', node.name)
          setNodeChildren(nodeChildren => nodeChildren.filter(child => child.id !== node.id))
        }
      }
      napi.subscribeToNodeChildrenUpdates(node.id, handleNodeChildrenUpdates)
      return () => {
        napi.unsubscribeFromNodeChildrenUpdates(node.id, handleNodeChildrenUpdates)
      }
    })
    const onMore = !hasMore.current ? null : async () => {
      const result = await napi.findNodes({ parentId: node.id, limit: 32, lastId: lastId.current })
      const newNodes = result.items
      lastId.current = result.lastId
      hasMore.current = result.hasMore
      if (newNodes.length) {
        setNodeChildren([...nodeChildren, ...newNodes])
      }
    }
    return [nodeChildren, onMore]
  }

  const handleNodeDrop = async (item, node) => {
    console.log(`moving ${item.node.id} to ${node.id}`)
    await napi.moveNode(item.node, node.id)
  }

  const handleURLDrop = async (item, node) => {
    const url = item.urls[0]
    const dropedHtml = item.dataTransfer.getData('text/html')
    const titleFromHtml = dropedHtml ? lib.elementFromHTML(dropedHtml).textContent : null
    const name = titleFromHtml && titleFromHtml !== '' ? titleFromHtml : url
    const _node = { name, parentId: node.id, sides: { link: { url, preview: true } } }
    console.log('creating node from URL drop', _node)
    await napi.createNode(null, _node)
  }

  const handleFilesDrop = async (item, node) => {
    console.log('creating node from files drop', item.files)
    console.log(item.items)
  }

  const DragNodePreview = (props) => {
    const [, dragRef] = DnD.useDrag({
      item: { type: NodeDragTypes.NODE, node: props.node }
    })

    const [, dropRef] = DnD.useDrop({
      accept: [NodeDragTypes.NODE, NodeDragTypes.SIDE, DnD.NativeTypes.URL, DnD.NativeTypes.FILE, DnD.NativeTypes.TEXT],
      drop: async (item, monitor) => {
        console.log('drop on node preview', item, monitor)
        if (item.type === NodeDragTypes.NODE && item.node.id !== props.node.id) {
          await handleNodeDrop(item, props.node)
        } else if (item.type === NodeDragTypes.SIDE) {
          console.log('add side from side drop', item)
          if (item.node.sides[item.side]) {
            if (_.get(props.node, ['sides', item.side])) {
              await napi.updateNodeSide(props.node, item.side, item.node.sides[item.side])
            } else {
              await napi.addNodeSide(props.node, item.side, __deps__, item.node.sides[item.side])
            }
            Router.push({ pathname: Router.pathname, query: { node: props.node.id, [`${props.node.id}-view`]: `${item.side}-edit` } })
          }
        } else if (item.type === DnD.NativeTypes.URL) {
          await handleURLDrop(item, props.node)
        } else if (item.type === DnD.NativeTypes.FILE) {
          await handleFilesDrop(item, props.node)
        }
      }
    })
    return (
      <Box ref={node => dragRef(dropRef(node))}><NodePreview {...props} /></Box>
    )
  }

  const GridItem = parent => ({ node }) => <DragNodePreview
    showPreview={_.get(node.sides, 'settings.ui.background.image') !== _.get(parent.sides, 'settings.ui.background.image')}
    node={node}
    napi={napi}
    viewer={viewer} />

  const view = ({ node }) => {
    const screen = React.useContext(ResponsiveContext)
    const [, dropRef] = DnD.useDrop({
      accept: [NodeDragTypes.NODE, NodeDragTypes.SIDE, DnD.NativeTypes.URL, DnD.NativeTypes.FILE, DnD.NativeTypes.TEXT],
      drop: async (item, monitor) => {
        if (monitor.didDrop()) return
        console.log('drop on desktop!', item)
        if (item.type === NodeDragTypes.NODE) {
          if ((item.node.id !== node.id) && (item.node.parentId !== node.id)) {
            await handleNodeDrop(item, node)
          } else {
            await napi.copyNode(item.node, node.id)
          }
        } else if (item.type === NodeDragTypes.SIDE) {
          const _node = { parentId: node.id, sides: { [item.side]: node.sides[item.side] } }
          console.log('creating node from side drop', _node)
          const newNode = await napi.createNode(null, _node)
          Router.push({ pathname: Router.pathname, query: { node: newNode.id, [`${newNode.id}-view`]: `${item.side}-edit` } })
        } else if (item.type === DnD.NativeTypes.URL) {
          await handleURLDrop(item, node)
        } else if (item.type === DnD.NativeTypes.FILE) {
          await handleFilesDrop(item, node)
        }
      }
    })
    const [nodeChildren, onMore] = useNodeChildren(node)
    return (
      <Box fill pad={screen === 'small' ? 'xsmall' : 'small'} overflow='scroll' ref={dropRef}>
        <NodeGrid step={20} nodes={nodeChildren} Item={GridItem(node)} onMore={onMore} />
      </Box>
    )
  }

  const preview = ({ node }) => {
    const [nodeChildren] = useNodeChildren(node)
    return (
      <Box fill align='center' justify='center'>
        <Box round='xsmall' pad='xsmall' fill direction='row' wrap gap='xsmall' background={{ color: 'black', opacity: 'weak' }} justify='center' align='center' overflow='scroll'>
          {nodeChildren.map(child => {
            return (
              <Box key={child.id} width='30px' height='30px' pad='xsmall' round='xsmall' background={{ color: 'black', opacity: 'weak' }}>
                <NodeView node={child} view={napi.getNodeView(child, false)} mode='icon' napi={napi} viewer={viewer} iconSize='small' />
              </Box>
            )
          })}
        </Box>
      </Box>
    )
  }

  const icon = ({ node }) => <Box fill align='center' justify='center'><icons.Desktop size={iconSize} /></Box>
  const edit = view

  return {
    modes: {
      icon,
      preview,
      view,
      edit
    }
  }
}
