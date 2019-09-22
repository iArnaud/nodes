export default async ({ __deps__, __imports__ }) => {
  const { Box, Button } = __imports__.grommet
  const { React, lodash: _, Avatar, icons, Router, JSONSchemaForm } = __imports__.utils
  const { NodeLink } = __imports__.nodehub
  const { iconSize, viewer, napi } = __deps__
  const _view = ({ showControls }) => ({ node }) => {
    const user = _.get(node, 'sides.user', {})
    return (
      <Box fill align='center' justify='center' pad={{ top: 'xsmall', left: 'xsmall', right: 'xsmall' }}>
        <Box fill align='center' justify='center' round='small' overflow='auto' background={{ color: 'black', opacity: 'medium' }}>
          <Box fill>
            {(showControls && viewer && user.name === viewer.name) && (
              <Box fill='horizontal' direction='row' pad='small' gap='small' align='center' justify='end'>
                <NodeLink node={viewer.node} view='user-edit' ><Box align='center' justify='center'><icons.UserSettings /></Box></NodeLink>
                <Box align='center' justify='center' onClick={async () => {
                  await napi.logout()
                  document.location.reload()
                }}><Button data-testid='logout.action' icon={<icons.Logout />} plain /></Box>
              </Box>
            )}
            <Box fill align='center' justify='center'><Avatar src={user.avatar} name={user.name} email={user.email} round /></Box>
          </Box>
        </Box>
      </Box>
    )
  }

  const icon = ({ node }) => <Box fill align='center' justify='center'><icons.User size={iconSize} /></Box>
  const preview = _view({ showControls: false })
  const view = _view({ showControls: true })

  const userSchema = {
    type: 'object',
    required: [],
    properties: {
      name: {
        type: ['string', 'null'],
        title: 'Name'
      },
      email: {
        type: ['string', 'null'],
        title: 'Email'
      },
      avatar: {
        type: ['string', 'null'],
        title: 'Avatar URL'
      }
    }
  }

  const uiSchema = {
    name: {
      'ui:emptyValue': null,
      'ui:options': {
        testid: 'name.input'
      }
    },
    email: {
      'ui:emptyValue': null,
      'ui:options': {
        testid: 'email.input'
      }
    },
    avatar: {
      'ui:emptyValue': null,
      'ui:options': {
        testid: 'avatar.input'
      }
    }
  }

  const edit = ({ node }) => {
    const user = _.get(node, 'sides.user', {})
    const { name, email, avatar } = user
    return (
      <Box fill align='center' justify='center'>
        <Box width='large' overflow='scroll'>
          <JSONSchemaForm
            formData={{ name, email, avatar }}
            schema={userSchema}
            uiSchema={uiSchema}
            onSubmit={async ({ formData }) => {
              await napi.updateNodeSide(node, 'user', { ...user, ...formData })
              Router.push({ pathname: Router.pathname, query: { node: node.id } })
            }}
          />
        </Box>
      </Box>
    )
  }

  return {
    modes: {
      icon,
      preview,
      view,
      edit
    }
  }
}
