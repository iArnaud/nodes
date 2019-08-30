export default async ({ __deps__, __imports__ }) => {
  const { Box, Text, Anchor } = __imports__.grommet
  const { React, CoolBox, JSONSchemaForm, Router, lodash: _, NodehubLogo, icons } = __imports__.utils
  const { NodeLink } = __imports__.nodehub
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
        const token = await napi.login(login, password)
        if (token) {
          Router.push({ pathname: Router.pathname, query: { node: node.parentId } })
        } else {
          setError({ message: 'Invalid email or password.' })
        }
      }} />
    )
  }

  const CreateUserForm = ({ node, setError }) => {
    const createUserSchema = {
      type: 'object',
      required: [
        'login',
        'password1',
        'password2'
      ],
      properties: {
        login: {
          type: 'string',
          title: 'Username'
        },
        password1: {
          type: 'string',
          title: 'Password'
        },
        password2: {
          type: 'string',
          title: 'Repeat password'
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
      password1: {
        'ui:widget': 'password',
        'ui:options': {
          testid: 'password1.input'
        }
      },
      password2: {
        'ui:widget': 'password',
        'ui:options': {
          testid: 'password2.input'
        }
      }
    }

    return (
      <JSONSchemaForm schema={createUserSchema} uiSchema={uiSchema} onSubmit={async ({ formData }) => {
        const { login, password1, password2 } = formData
        if (password1 !== password2) {
          setError({ message: 'Passwords should match.' })
        } else {
          const userNode = await napi.createUserNode({ provider: 'local', id: login, password: password1 })
          Router.push({ pathname: Router.pathname, query: { node: '__login__', parent: userNode.id } })
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
            {node.parentId ? (
              <LoginForm node={node} setError={setError} />
            ) : node.children.length ? (
              <Box gap='small'>
                {node.children.map(userNode => {
                  return <NodeLink node='__login__' query={{ parent: userNode.id }}><Anchor>{userNode.name}</Anchor></NodeLink>
                })}
              </Box>
            ) : (
              <CreateUserForm node={node} setError={setError} />
            )
            }
          </Box>

        </Box>
      </CoolBox>
    )
  }

  const icon = () => ({ node }) => <Box fill align='center' justify='center'><icons.Login size={iconSize} /></Box>
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
