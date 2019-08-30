export default async ({ __deps__, __imports__ }) => {
  const { Box } = __imports__.grommet
  const { React, icons, lodash: _ } = __imports__.utils
  const { NodeMessage } = __imports__.nodehub
  const { iconSize } = __deps__

  const view = ({ node }) => {
    const error = _.get(node, 'sides.error', {})
    return (
      <NodeMessage node={node} message={error.message} color='status-error' />
    )
  }

  const icon = ({ node }) => <Box fill align='center' justify='center'><icons.StatusCritical size={iconSize} color='status-error' /></Box>
  const preview = view
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
