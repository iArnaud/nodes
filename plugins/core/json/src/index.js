export default async ({ __deps__, __imports__ }) => {
  const { Box, Text } = __imports__.grommet
  const { React } = __imports__.utils
  const { iconSize } = __deps__
  const view = ({ node }) => <Box fill background={{ color: 'black', opacity: 'medium' }} overflow='scroll'><pre>{JSON.stringify(node, null, 2)}</pre></Box>
  return {
    modes: {
      icon: () => <Box align='center' justify='center'><Text size={iconSize}>{'{}'}</Text></Box>,
      preview: view,
      view,
      edit: view
    }
  }
}
