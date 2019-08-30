export default async ({ __deps__, __imports__ }) => {
  const { Box, Button } = __imports__.grommet
  const { React, icons, Router, CoolBox } = __imports__.utils
  const { napi, iconSize } = __deps__

  const e = React.createElement

  const view = ({ node }) => e(CoolBox,
    {
      filter: 'grayscale(100%)',
      background: napi.getNodeBackground(node),
      fill: true,
      align: 'center',
      justify: 'center'
    }, e(Button, {
      'data-testid': 'confirmDelete.node.action',
      label: `Delete ${node.name}`,
      icon: e(icons.Trash),
      primary: true,
      color: 'status-error',
      onClick: async () => {
        await napi.deleteNode(node.id)
        Router.push({ pathname: Router.pathname, query: { node: node.parentId } })
      } }))

  const icon = ({ node }) => <Box fill align='center' justify='center'><icons.Trash size={iconSize} /></Box>

  return {
    modes: {
      icon,
      view
    }
  }
}
