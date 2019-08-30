export default async ({ __deps__, __imports__ }) => {
  const { Box, TextInput, Button } = __imports__.grommet
  const { React, Peer, Router, icons } = __imports__.utils
  const { iconSize, viewer, napi } = __deps__

  const SetupConnection = ({ node, peer }) => {
    const [remoteId, setRemoteId] = React.useState()

    const handleClick = () => {
      const conn = peer.connect(remoteId, { serialization: 'json', metadata: { node: node.id, viewer } })
      conn.on('data', async function (data) {
        console.log('Received', data)
        const [firstNode, ...rest] = data.nodes
        const _node = { ...firstNode, parentId: node.id, sides: { ...firstNode.sides, users: [{ id: viewer.node, role: 'admin' }] } }
        const syncNode = await napi.createNode(null, _node)
        for (const _node of rest) {
          await napi.createNode(null, { ..._node, sides: { ..._node.sides, users: [{ id: viewer.node, role: 'admin' }] } })
        }
        console.log('synced', syncNode)
        Router.push({ pathname: Router.pathname, query: { node: syncNode.id } })
      })
    }
    return (
      <Box>
        <Box direction='row' gap='small'>
          <TextInput onChange={event => setRemoteId(event.target.value)} />
          <Button primary label='Import' onClick={handleClick} />
        </Box>
      </Box>
    )
  }

  const view = ({ node }) => {
    const [peer, setPeer] = React.useState()
    React.useEffect(() => {
      const _peer = new Peer()
      _peer.on('open', function (id) {
        console.log('My peer ID is: ', _peer.id)
        setPeer(_peer)
      })
      _peer.on('connection', function (conn) {
        console.log('New connection!', conn)

        conn.on('open', function () {
          conn.send({ node, viewer })
        })
      })
    }, [])

    return (
      <Box fill align='center' justify='center'>{
        peer
          ? <SetupConnection node={node} peer={peer} />
          : 'loading...'
      }</Box>
    )
  }
  return {
    modes: {
      icon: () => <Box align='center' justify='center'><icons.Download size={iconSize} /></Box>,
      preview: view,
      view,
      edit: view
    }
  }
}
