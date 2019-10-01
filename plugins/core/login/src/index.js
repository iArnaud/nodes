export default async ({ __deps__, __imports__ }) => {
  const { Box, Text } = __imports__.grommet
  const { React, CoolBox, JSONSchemaForm, Router, lodash: _, NodehubLogo, icons } = __imports__.utils
  const { napi, iconSize } = __deps__

  const LoginForm = ({ node, setError }) => {
    const loginSchema = {
      type: 'object',
      required: [
        'login',
        'password'
      ],
      properties: {
        login: {
          type: 'string',
          title: 'Login'
        },
        password: {
          type: 'string',
          title: 'Password'
        }
      }
    }

    const uiSchema = {
      login: {
        'ui:autofocus': true,
        'ui:emptyValue': '',
        'ui:options': {
          testid: 'login.input'
        }
      },
      password: {
        'ui:widget': 'password',
        'ui:options': {
          testid: 'password.input'
        }
      }
    }

    return (
      <JSONSchemaForm schema={loginSchema} uiSchema={uiSchema} onSubmit={async ({ formData }) => {
        const { login, password } = formData
        const user = await napi.login(login, password)
        if (user) {
          Router.push({ pathname: Router.pathname, query: { node: node.parentId || user.node } })
        } else {
          setError({ message: 'Invalid email or password.' })
        }
      }} />
    )
  }

  const view = ({ node }) => {
    const background = _.get(node, 'sides.settings.ui.background', {})
    const defaultBackground = 'background'
    const [error, setError] = React.useState()
    return (
      <CoolBox background={background.video ? null : napi.getNodeBackground(node)} align='center' justify='center'>
        <Box fill align='center' justify='center' gap='small' background={napi.getNodeBackground(node) ? { color: 'black', opacity: 'medium' } : { image: defaultBackground }}>
          <Box round='medium' height='small' width='small' align='center' justify='center' background={napi.getNodeBackground(node) ? { color: 'black', opacity: 'medium' } : null}>
            <NodehubLogo />
          </Box>
          <Text weight='bold'>{node.name}</Text>
          {error && <Text data-testid='login.error' color='status-error'>{error.message}</Text>}
          <Box width='medium' align='center' justify='center'>
            <LoginForm node={node} setError={setError} />
          </Box>

        </Box>
      </CoolBox>
    )
  }

  const icon = ({ node }) => <Box fill align='center' justify='center'><icons.Login size={iconSize} /></Box>
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
