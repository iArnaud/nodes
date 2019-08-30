export default async ({ __deps__, __imports__ }) => {
  const { Box } = __imports__.grommet
  const { React, JSONSchemaForm, icons, lodash: _, Router } = __imports__.utils
  const { napi, iconSize } = __deps__

  const routeSchema = {
    type: 'object',
    required: [
      'path'
    ],
    properties: {
      path: {
        type: 'string',
        title: 'Path'
      }
    }
  }

  const uiSchema = {
    path: {
      'ui:autofocus': true,
      'ui:options': {
        testid: 'path.input'
      }
    }
  }

  const edit = ({ node }) => {
    const { path } = _.get(node, 'sides.route', {})
    return (
      <Box fill align='center' justify='center'>
        <Box width='large' overflow='scroll'>
          <JSONSchemaForm
            formData={{ path }}
            schema={routeSchema}
            uiSchema={uiSchema}
            onSubmit={async ({ formData }) => {
              await napi.updateNodeSide(node, 'route/path', formData.path)
              Router.push({ pathname: Router.pathname, query: { node: node.id } })
            }}
          />
        </Box>
      </Box>
    )
  }

  const view = edit

  const icon = ({ node }) => <Box align='center' justify='center' fill><icons.Directions size={iconSize} /></Box>
  const preview = icon

  return {
    modes: {
      icon,
      preview,
      view,
      edit
    }
  }
}
