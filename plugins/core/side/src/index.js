export default async ({ __deps__, __imports__ }) => {
  const { Box, ResponsiveContext, Grid, Text, Anchor } = __imports__.grommet
  const { React, lodash: _, icons, Router } = __imports__.utils
  const { NodePreview, NodeLink } = __imports__.nodehub
  const { napi, viewer, iconSize } = __deps__

  const view = ({ node }) => {
    const screen = React.useContext(ResponsiveContext)
    const gridPad = screen === 'small' ? 'xsmall' : 'small'
    return (
      <Box fill pad={gridPad} overflow='scroll'>
        <Grid
          fill
          columns={{ count: 'fill', size: 'small' }}
          rows='small'
          gap={{ row: gridPad, column: gridPad }}
        >
          <Box data-testid='addSide.nstore' background={{ color: 'black', opacity: 'medium' }} round='small' pad='xsmall' align='center' justify='center'>
            <NodeLink node='__nstore__' query={{ parent: Router.query.parent }}><Anchor icon={<icons.Apps />} label='N S T O R E' /></NodeLink>
          </Box>
          {node.children.map(child => (
            <NodePreview
              key={`${child.name}-${child.id}`}
              node={child}
              showPreview={_.get(child.sides, 'settings.ui.background.image') !== _.get(node.sides, 'settings.ui.background.image')}
              napi={napi}
              viewer={viewer}
              onClick={async () => {
                const parent = await napi.getNode(Router.query.parent)
                await napi.addNodeSide(parent, child.name, __deps__)
                Router.push({ pathname: Router.pathname, query: { node: Router.query.parent, [`${Router.query.parent}-view`]: `${child.name}-edit` } })
              }}
            />
          ))}
        </Grid>
      </Box>
    )
  }

  const icon = ({ node }) => <Box fill align='center' justify='center'><icons.Duplicate size={iconSize} /></Box>
  const preview = icon
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
