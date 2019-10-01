export default async ({ __deps__, __imports__ }) => {
  const { Box, ResponsiveContext, Menu } = __imports__.grommet
  const { React, Router, lodash: _, icons, DnD } = __imports__.utils
  const { NodeBar, NodeLink, NodeDragTypes } = __imports__.nodehub
  const { napi, NodeView, viewer, iconSize } = __deps__

  const Menubar = ({ node }) => {
    const screen = React.useContext(ResponsiveContext)
    return (
      <Box fill='horizontal' direction='row' align='center' pad={screen === 'small' ? 'small' : 'xsmall'} background={_.get(node.sides, 'settings.ui.menubar.background', { opacity: 'medium', color: 'black' })}>
        <NodeBar node={node} napi={napi} viewer={viewer} showViewer />
      </Box>
    )
  }

  const NodeSide = ({ node, side, mode = 'icon', viewer, napi, height = '30px', width = '30px' }) => {
    const [, dragRef] = DnD.useDrag({
      item: { type: NodeDragTypes.SIDE, node, side }
    })
    return (
      <NodeLink node={node.id} query={Router.query} view={side}>
        <Box ref={node => dragRef(node)} data-testid={`changeSide:${side}.action`} style={{ cursor: 'pointer' }} height={height} width={width} round='xsmall' pad='xsmall'>
          <NodeView node={node} view={side} mode={mode} viewer={viewer} napi={napi} plain />
        </Box>
      </NodeLink>
    )
  }

  const Bottombar = ({ node }) => {
    return (
      <Box fill='horizontal'>
        <Box fill='horizontal' align='center' justify='between' direction='row' pad='small'>
          {napi.hasPermission(viewer, node, 'changeSide') && <Box direction='row' gap='xsmall' overflow='scroll' align='center' justify='center' fill='horizontal' wrap>
            {Object.keys(node.sides).filter(key => key !== 'layout').map(key => {
              const isActive = Router.query[`${node.id}-view`] ? (key === (Router.query[`${node.id}-view`]).split('-')[0]) : key === napi.getNodeView(node, false)
              return (
                <Box elevation={isActive ? 'large' : null} key={key} align='center' justify='center' round='xsmall' background={{ color: 'black', opacity: 'medium' }} pad='xsmall' direction='row' gap='xsmall'>
                  <NodeSide node={node} side={key} napi={napi} viewer={viewer} />
                  {isActive && (
                    <Menu
                      dropAlign={{ bottom: 'top', left: 'left' }}
                      items={[
                        { icon: <Box align='center' justify='center'><icons.Edit /></Box>, onClick: async () => Router.push({ pathname: Router.pathname, query: { ...Router.query, [`${node.id}-view`]: `${key}-edit` } }) },
                        { icon: <Box align='center' justify='center'><icons.Pin /></Box>, onClick: async () => napi.updateNodeSide(node, 'settings/defaultView', key) },
                        { icon: (<Box fill align='center'><icons.Next /></Box>),
                          onClick: async () => {
                            const newNode = await napi.createNode(null, { parentId: node.id, sides: { [key]: node.sides[key] } })
                            Router.push({ pathname: Router.pathname, query: { ...Router.query, node: newNode.id, parent: node.parentId } })
                            await napi.deleteNodeSide(node, key, __deps__)
                          }
                        },
                        { icon: <Box align='center' justify='center'><icons.Trash /></Box>,
                          onClick: async () => {
                            await napi.deleteNodeSide(node, key, __deps__)
                            const { [`${node.id}-view`]: _view, ...newQuery } = Router.query
                            Router.push({ pathname: Router.pathname, query: newQuery })
                          } }
                      ]}>
                      <Box align='center' justify='center'><icons.More color='control' /></Box>
                    </Menu>)}
                </Box>
              )
            })}
          </Box>}
        </Box>
        {_.get(node, 'sides.settings.ui.background.audio') && (
          <Box fill='horizontal'>
            <audio style={{ width: '100%', height: '30px' }} src={node.sides.settings.ui.background.audio} controls loop />
          </Box>
        )}
      </Box>
    )
  }

  const view = ({ node }) => {
    const routerView = Router.query[`${node.id}-view`]
    const view = routerView && routerView !== 'ui' ? routerView : napi.getNodeView(node, false)
    return (
      <Box fill background={napi.getNodeBackground(node)}>
        <Box fill='horizontal'><Menubar node={node} /></Box>
        <Box fill align='center' justify='center'>
          <NodeView node={node} view={view} napi={napi} viewer={viewer} />
        </Box>
        <Box fill='horizontal'><Bottombar node={node} /></Box>
      </Box>
    )
  }

  const icon = ({ node }) => <Box fill align='center' justify='center'><icons.Template size={iconSize} /></Box>

  return {
    modes: {
      icon,
      view
    }
  }
}
