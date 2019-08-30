export default async ({ __deps__, __imports__ }) => {
  const { Box, Text, Button, CheckBox, Anchor } = __imports__.grommet
  const { React, Avatar, icons } = __imports__.utils
  const { NodeUsersProvider, NodeLink, NodeSelect } = __imports__.nodehub
  const { napi, iconSize } = __deps__

  const _view = ({ node, users }) => {
    const [state, setState] = React.useState({ addUser: false, newUser: { role: 'user', id: undefined } })
    return (
      <Box align='center' justify='center' fill pad='xsmall' gap='small'>
        <Box align='center' justify='center' width='large' gap='small' background={{ color: 'black', opacity: 'medium' }} pad='small' round>
          {users.map((user, i) => (
            <Box data-testid={`addUser.${user.name}.user`} key={user.id} direction='row' align='center' justify='between' fill='horizontal' background={{ color: 'black', opacity: 'medium' }} pad='small' round>
              <Box pad='small' round direction='row' gap='xsmall' align='center' justify='center' >
                <Avatar round name={user.name} src={user.avatar} size={36} />
                <NodeLink node={user.id} view='user'><Anchor><Text size='medium' weight='bold'>{user.name}</Text></Anchor></NodeLink>
              </Box>
              <Box direction='row'>
                <CheckBox disabled={users.length < 2} label={<Text weight={user.role === 'admin' ? 'bold' : null} color={user.role === 'admin' ? 'control' : null} >{user.role}</Text>} reverse onChange={async () => {
                  await napi.updateNode(node.id, [{ op: 'replace', path: `/sides/users/${i}/role`, value: user.role === 'admin' ? 'user' : 'admin' }])
                }} toggle checked={user.role === 'admin'} />
                <Button disabled={users.length < 2} icon={<icons.Close />} onClick={async () => {
                  await napi.updateNode(node.id, [{ op: 'remove', path: `/sides/users/${i}` }])
                }} />
              </Box>
            </Box>
          ))}
          {state.addUser && (
            <Box direction='row' align='center' justify='between' fill='horizontal' background={{ color: 'black', opacity: 'medium' }} pad='small' round>
              <Box pad='small' round direction='row' gap='xsmall' align='center' justify='center' >
                <NodeSelect napi={napi} users onSelect={user => setState({ ...state, newUser: { ...state.newUser, id: user.id } })} />
              </Box>
              <Box direction='row'>
                <CheckBox label={<Text weight={state.newUser.role === 'admin' ? 'bold' : null} color={state.newUser.role === 'admin' ? 'control' : null} >{state.newUser.role}</Text>} reverse onChange={async () => {
                  setState({ ...state, newUser: { ...state.newUser, role: state.newUser.role === 'admin' ? 'user' : 'admin' } })
                }} toggle checked={state.newUser.role === 'admin'} />
                <Button data-testid='addUser.confirm.action' disabled={!state.newUser.id} icon={<icons.Checkmark color='status-ok' />} onClick={async () => {
                  await napi.updateNode(node.id, [{ op: 'add', path: `/sides/users/${users.length}`, value: state.newUser }])
                  setState({ addUser: false, newUser: { role: 'user', id: undefined } })
                }} />
              </Box>
            </Box>
          )}
          <Button data-testid='addUser.action' label='Add User' icon={<icons.Add />} primary onClick={() => setState({ ...state, addUser: true })} />
        </Box>
      </Box>
    )
  }

  const icon = ({ node }) => <Box fill align='center' justify='center'><icons.Group size={iconSize} /></Box>
  const preview = icon
  const view = ({ node }) => {
    return <NodeUsersProvider node={node} napi={napi}><_view node={node} /></NodeUsersProvider>
  }
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
