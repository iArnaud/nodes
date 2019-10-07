import React from 'react'
import { Box, defaultProps } from 'grommet'
import Avatar from 'react-avatar'

import { NodeLink } from '../node'

const NodeUsers = React.memo(({ users, size, node }) => {
  const avatarSize = size === 'small' ? 22 : 30
  return (
    <Box fill gap={size !== 'small' ? 'small' : 'xsmall'} direction='row' align='center' justify='center'>
      {users.map(user => {
        return (
          <Box key={user.id} style={user.role === 'admin' ? { boxShadow: '0px 0px 3px 1px white' } : null} round>
            <Avatar value='?' email={user.email} src={user.avatar} name={user.name} size={size === 'small' ? 20 : 28} round />
          </Box>
        )
      })}
      <NodeLink node={node.id} view='users'>
        <Box round style={{ cursor: 'pointer' }} align='center' justify='center' data-testid='viewUsers.action'>
          <Avatar
            style={{ opacity: 0.5 }}
            textSizeRatio={2.5}
            color={defaultProps.theme.global.colors.black}
            value={`${users.length}`}
            size={avatarSize}
            round
          />
        </Box>
      </NodeLink>
    </Box>
  )
})

const NodeUsersContainer = ({ node, size, napi }) => {
  const [users, setUsers] = React.useState(node.users || [])
  React.useEffect(() => {
    const getUsers = async () => {
      setUsers((await napi.getNodeUsers(node)).items)
    }
    getUsers()
  }, node.id)
  return <NodeUsers size={size} node={node} users={users} />
}

export default NodeUsersContainer
