export default async ({ __deps__, __imports__ }) => {
  const { Box, Text, Button } = __imports__.grommet
  const { React, icons } = __imports__.utils
  const { napi, iconSize, viewer } = __deps__

  const opBackgroundColors = {
    add: 'status-ok',
    replace: 'status-warning',
    remove: 'status-error'
  }

  const view = ({ node }) => {
    const [diff, setDiff] = React.useState([])
    React.useEffect(() => {
      const getDiff = async () => {
        const _diff = await napi.mergeFromClipboard(node, viewer)
        setDiff(_diff)
      }
      getDiff()
    }, [])
    return (
      <Box align='center' justify='center' fill pad='xsmall' gap='small'>
        <Box align='center' justify='start' width='large' gap='small' background={{ color: 'black', opacity: 'medium' }} pad='small' round overflow='scroll'>
          {diff.map(({ op, path, value }, i) => (
            <Box key={`${op}-${path}-${i}`} fill='horizontal' background={{ color: 'black', opacity: 'medium' }} pad='small' round style={{ minHeight: '300px' }}>
              <Box direction='row' align='center' justify='between'>
                <Box pad='small' round direction='row' gap='xsmall' align='center' justify='center' >
                  <Text size='medium' weight='bold'>{op}</Text>
                </Box>
                <Box pad='small' round direction='row' gap='xsmall' align='center' justify='center' >
                  <Text size='medium'>{path}</Text>
                </Box>
                <Box direction='row'>
                  <Button icon={<icons.Action />} onClick={async () => {
                    if (path !== '/children') {
                      await napi.updateNode(node.id, [{ op, path, value }])
                      setDiff(diff.filter((elm, _i) => _i !== i))
                    } else {
                      console.log(op, path, value)
                    }
                  }} />
                </Box>
              </Box>
              <Box fill overflow='scroll' align='center' justify='center' background={{ color: opBackgroundColors[op], opacity: 'strong' }} round>
                <pre>{JSON.stringify(value, null, 2)}</pre>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    )
  }

  const icon = ({ node }) => <Box fill align='center' justify='center'><icons.Aggregate size={iconSize} /></Box>
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
