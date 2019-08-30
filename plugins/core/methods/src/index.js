export default async ({ __deps__, __imports__ }) => {
  const { Button, Box } = __imports__.grommet
  const { React, icons, JSONSchemaForm, lodash: _, Router } = __imports__.utils
  const { napi, iconSize, viewer } = __deps__

  const view = ({ node }) => {
    const [state, setState] = React.useState()
    return (
      <Box fill direction='row'>
        <Box align='center' justify='center' fill>
          {Object.keys(_.get(node, 'sides.methods.methods', {})).map(method => {
            return <Button key={method} label={method} onClick={async () => {
              const res = await napi.execMethod(node, method, { someArgs: true }, { napi, viewer })
              setState(res)
            }} />
          })}
        </Box>
        <Box fill overflow='scroll'>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </Box>
      </Box>
    )
  }

  const edit = ({ node }) => {
    const methods = _.get(node, 'sides.methods.methods')
    const schema = {
      type: 'object',
      properties: {
        methods: {
          type: 'array',
          title: 'Methods',
          items: {
            type: 'object',
            required: ['methodName', 'methodCode'],
            properties: {
              methodName: {
                title: 'Method name',
                type: 'string'
              },
              methodCode: {
                type: 'string',
                title: 'Method code'
              }
            }
          }
        }
      }
    }
    const uiSchema = {
      methods: {
        items: {
          methodCode: {
            'ui:widget': 'CodeWidget'
          }
        }
      }
    }
    return (
      <Box fill align='center' justify='center'>
        <Box width='large' overflow='scroll'>
          <JSONSchemaForm
            formData={methods ? { methods: Object.keys(methods).map(key => ({ methodName: key, methodCode: methods[key] })) } : null}
            schema={schema}
            uiSchema={uiSchema}
            onSubmit={async ({ formData }) => {
              const methods = formData.methods.reduce((obj, method) => {
                obj[method.methodName] = method.methodCode
                return obj
              }, {})
              await napi.updateNodeSide(node, 'methods/methods', methods)
              Router.push({ pathname: Router.pathname, query: { ...Router.query, node: node.id, [`${node.id}-view`]: 'methods' } })
            }}
          />
        </Box>
      </Box>
    )
  }

  const icon = ({ node }) => <Box fill align='center' justify='center'><icons.Calculator size={iconSize} /></Box>
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
