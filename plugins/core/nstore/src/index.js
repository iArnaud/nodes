export default async ({ __deps__, __imports__ }) => {
  const { Box, Grid, ResponsiveContext, Button, Anchor, Text } = __imports__.grommet
  const { React, http, icons, Avatar } = __imports__.utils
  const { NodePreview } = __imports__.nodehub
  const { iconSize, napi, viewer } = __deps__

  const getPluginsFromGithub = async () => {
    const res = await http.get(
      'https://api.github.com/search/repositories?q=topic:nodes-plugin&sort=stars&order=desc',
      { headers: { Accept: 'application/vnd.github.mercy-preview+json' } }
    )
    const plugins = res.data.items
    return plugins.map(p => ({
      name: p.name,
      sides: { plugin:
        {
          canAdd: true,
          url: `https://cdn.jsdelivr.net/gh/${p.full_name}/${p.name}.js`,
          description: p.description,
          homepage: p.homepage,
          metadata: {
            provider: 'github',
            stars: p.stargazers_count,
            owner: p.owner,
            repoUrl: p.html_url,
            createdAt: p.created_at
          }
        } } }))
  }

  const view = ({ node }) => {
    const [plugins, setPlugins] = React.useState([])
    React.useEffect(() => {
      const getPlugins = async () => {
        // const _plugins = (await http.get('https://api.npms.io/v2/search?q=keywords:nodes-plugin')).data.results
        // console.log(await getPluginsFromGithub())
        // const _plugins = [...Array(5)].map((e, i) => ({ id: `plugin${i}`, name: `Plugin${i}`, sides: { plugin: { canAdd: true, url: 'http://localhost:3000/static/plugins/core/json/index.bundled.js' } } }))
        // let _plugins = [...Array(5)].map((e, i) => ({ name: `Plugin${i}`, sides: { plugin: { canAdd: true, url: 'http://localhost:3000/static/plugins/core/json/index.bundled.js' } } }))
        let _plugins = await getPluginsFromGithub()
        _plugins = await Promise.all(_plugins.map(async p => {
          const res = await napi.findNode({ name: p.name, parentId: 'plugins' })
          return res.status === 'ok' ? res : p
        }))
        console.log('plugins', _plugins)
        setPlugins(_plugins)
      }
      getPlugins()
    }, [])
    const screen = React.useContext(ResponsiveContext)
    const gridPad = screen === 'small' ? 'xsmall' : 'small'
    return (
      <Box fill pad={gridPad} overflow='scroll'>
        <Grid
          fill
          columns={{ count: 'fill', size: 'small' }}
          rows='small'
          gap={{ row: gridPad, column: gridPad }}
        >
          {plugins.map(plugin => {
            if (plugin.id) {
              return (
                <NodePreview
                  key={`${plugin.name}-${plugin.id}`}
                  node={plugin}
                  showPreview={false}
                  napi={napi}
                  viewer={viewer}
                />
              )
            }
            return (
              <Box key={plugin.name} height='small' width='small' align='center' justify='between' round='small' background={{ color: 'black', opacity: 'medium' }}>
                <Box fill align='start' justify='between' direction='row' pad='xsmall'>
                  <Box align='center' justify='center' direction='row' gap='xsmall'>
                    <Anchor style={{ padding: '0px' }} size='small' href={`${plugin.sides.plugin.metadata.repoUrl}/stargazers`} icon={<icons.Star color='plain' />} target='_blank' />
                    <Text size='small'>{plugin.sides.plugin.metadata.stars}</Text>
                  </Box>
                  <Box align='center' justify='center' direction='row' gap='xsmall'>
                    <Avatar round size={25} src={plugin.sides.plugin.metadata.owner.avatar_url} />
                    <Text size='small'>{plugin.sides.plugin.metadata.owner.login}</Text>
                  </Box>
                </Box>
                <Box fill align='center' justify='center'>
                  <Anchor href={plugin.sides.plugin.homepage} target='_blank'>{plugin.name}</Anchor>
                  <Text size='small'>{plugin.sides.plugin.description}</Text>
                </Box>
                <Box fill align='end' justify='end'>
                  <Button icon={<icons.InstallOption color='control' onClick={async () => {
                    console.log(`installing plugin ${plugin.name}...`)
                    const newPlugin = await napi.createNode(null, { ...plugin, parentId: 'plugins', sides: { ...plugin.sides, users: [{ id: viewer.node, role: 'admin' }] } })
                    console.log(`plugin ${newPlugin.name} installed.`)
                    setPlugins(plugins.map(p => p.name === newPlugin.name ? newPlugin : p))
                  }} />} />
                </Box>
              </Box>
            )
          }
          )}
        </Grid>
      </Box>
    )
  }
  return {
    modes: {
      icon: () => <Box align='center' justify='center'><icons.Apps size={iconSize} /></Box>,
      preview: view,
      view,
      edit: view
    }
  }
}
