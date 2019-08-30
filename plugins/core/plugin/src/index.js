export default async ({ __deps__, __imports__ }) => {
  const { Box, Text, Button } = __imports__.grommet
  const { React, lodash: _, icons, JSONSchemaForm, Router } = __imports__.utils
  const { napi, iconSize, viewer, NodeView } = __deps__

  const view = ({ node }) => (
    <Box align='center' justify='center' fill overflow='scroll' pad='small'>
      <Text weight='bold'>Plugin: {node.name}</Text>
      <pre>{JSON.stringify(_.get(node, 'sides.plugin', {}))}</pre>
    </Box>
  )

  const pluginSchema = {
    type: 'object',
    required: [
      'url'
    ],
    properties: {
      url: {
        type: 'string',
        title: 'URL'
      },
      canAdd: {
        type: 'boolean',
        title: 'Can Add',
        default: true
      }
    }
  }

  const uiSchema = {
    url: {
      'ui:autofocus': true,
      'ui:options': {
        testid: 'url.input'
      }
    }
  }

  const edit = ({ node }) => {
    const { url, canAdd = true } = _.get(node, 'sides.plugin', {})
    return (
      <Box fill align='center' justify='center'>
        <Box width='large' overflow='scroll'>
          <JSONSchemaForm
            formData={{ url, canAdd }}
            schema={pluginSchema}
            uiSchema={uiSchema}
            onSubmit={async ({ formData }) => {
              await napi.updateNodeSide(node, 'plugin', formData)
              Router.push({ pathname: Router.pathname, query: { node: node.id } })
            }}
          />
        </Box>
      </Box>
    )
  }

  const icon = ({ node }) => <Box fill align='center' justify='center'><icons.Install size={iconSize} /></Box>
  const preview = ({ node }) => <Button plain icon={<NodeView node={node} view={node.name} mode='icon' napi={napi} viewer={viewer} plain />} label={node.name} />

  return {
    modes: {
      icon,
      preview,
      view,
      edit
    }
  }
}
