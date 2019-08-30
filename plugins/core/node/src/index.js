export default async ({ __deps__, __imports__ }) => {
  const { Box, ResponsiveContext, Grid, Text, Stack } = __imports__.grommet
  const { React, lodash: _, icons, Router } = __imports__.utils
  const { NodePreview } = __imports__.nodehub
  const { napi, viewer, iconSize } = __deps__

  const view = ({ node }) => {
    const handleFileInputChange = async e => {
      const _files = e.target.files
      console.log('file input', _files)
      let createdNodes = {}
      const files = []
      for (let i = 0; i < _files.length; i++) {
        files.push(_files[i])
      }
      for (const file of files) {
        if (file.webkitRelativePath) {
          console.log(`Processing file ${file.webkitRelativePath}`)
          const folders = file.webkitRelativePath.split('/')
          console.log('created nodes:', createdNodes)
          let prevFolder = null
          for (let folder of folders) {
            if (!createdNodes[folder]) {
              console.log('creating node', folder)
              console.log('prev folder', prevFolder)
              const parentId = prevFolder ? createdNodes[prevFolder].id : node.parentId
              const newNode = await napi.createNode(null, { name: folder, parentId, sides: { desktop: true } })
              createdNodes[folder] = newNode
            }
            prevFolder = folder
          }
        }
      }
      Router.push({ pathname: Router.pathname, query: { node: node.parentId } })
    }
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
          <Box data-testid='addNode.dropzone' style={{ border: '2px dashed', cursor: 'pointer' }} background={{ color: 'black', opacity: 'medium' }} round='small' pad='xsmall' align='center' justify='center'>
            <Stack fill>
              <Box fill align='center' justify='center'>
                <Text>Drop or click to create node from files or directories</Text>
              </Box>
              <input data-testid='upload.input' style={{ opacity: 0, height: '100%', width: '100%', cursor: 'pointer' }} type='file' multiple directory='true' webkitdirectory='true' allowdirs='true' onChange={handleFileInputChange} />
            </Stack>
          </Box>
          {node.children.map(child => (
            <NodePreview
              key={`${child.name}-${child.id}`}
              node={child}
              showPreview={_.get(child.sides, 'settings.ui.background.image') !== _.get(node.sides, 'settings.ui.background.image')}
              napi={napi}
              viewer={viewer}
              onClick={async () => {
                const newNode = await napi.copyNode(child, node.parentId, 'Untitled node')
                Router.push({ pathname: Router.pathname, query: { ...Router.query, node: newNode.id, [`${newNode.id}-view`]: `${napi.getNodeView(newNode, false)}-edit` } })
              }}
            />
          ))}
        </Grid>
      </Box>
    )
  }

  const icon = ({ node }) => <Box fill align='center' justify='center'><icons.Add size={iconSize} /></Box>
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
