import React from 'react'
import { Box, defaultProps } from 'grommet'
import Avatar from 'react-avatar'

import { NodeUsersProvider, NodeLink } from '../node'

const NodeUsers = ({ users, size, node }) => {
  const avatarSize = size === 'small' ? 22 : 30
  return (
    <Box fill gap={size !== 'small' ? 'small' : 'xsmall'} direction='row' align='center' justify='center'>
      {users.map(user => {
        return (
          <Box key={user.id} style={user.role === 'admin' ? { boxShadow: '0px 0px 3px 1px white' } : null} round >
            <Avatar value='?' email={user.email} src={user.avatar} name={user.name} size={size === 'small' ? 20 : 28} round />
          </Box>
        )
      })}
      <NodeLink node={node.id} view='users'>
        <Box round style={{ cursor: 'pointer' }} align='center' justify='center' data-testid='viewUsers.action'>
          <Avatar
            style={{ opacity: 0.5 }}
            textSizeRatio={2.5}
            color={defaultProps.theme.global.colors['black']}
            value={`${users.length}`}
            size={avatarSize}
            round
          />
        </Box>
      </NodeLink>
    </Box>
  )
}

const NodeUsersContainer = ({ node, size, napi }) => (
  <NodeUsersProvider node={node} napi={napi}>
    <NodeUsers size={size} node={node} />
  </NodeUsersProvider>
)

export default NodeUsersContainer
