export default async ({ __deps__, __imports__ }) => {
  const { Box } = __imports__.grommet
  const { React, Peer, icons, hooks } = __imports__.utils
  const { iconSize, viewer, napi } = __deps__

  const getNodeTree = async (node, nodes = []) => {
    nodes.push(node)
    const { items } = await napi.getNodeChildren(node)
    for (const _node of items) {
      await getNodeTree(_node, nodes)
    }
    return nodes
  }

  const view = ({ node }) => {
    const [peer, setPeer] = React.useState()
    // const [loaded] = hooks.useScript('https://cdn.jsdelivr.net/npm/webtorrent@latest/webtorrent.min.js')
    // React.useEffect(() => {
    //   loaded && console.log(window.WebTorrent)
    // }, [loaded])
    React.useEffect(() => {
      const _peer = new Peer()
      _peer.on('open', function (id) {
        console.log('My peer ID is: ', _peer.id)
        setPeer(_peer)
      })
      _peer.on('connection', function (conn) {
        console.log('New connection!', conn)
        conn.on('open', async function () {
          const nodes = await getNodeTree(node)
          conn.send({ nodes, viewer })
        })
      })
    }, [])

    return (
      <Box fill align='center' justify='center'>{
        peer
          ? <Box>{peer.id}</Box>
          : 'loading...'
      }</Box>
    )
  }
  return {
    modes: {
      icon: () => <Box align='center' justify='center'><icons.Upload size={iconSize} /></Box>,
      preview: view,
      view,
      edit: view
    }
  }
}
