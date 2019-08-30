export default async ({ __deps__, __imports__ }) => {
  const { Box } = __imports__.grommet
  const { React, lodash: _, icons, CodeEditor } = __imports__.utils
  const { napi, iconSize } = __deps__

  const _view = ({ size }) => ({ node }) => {
    const value = _.get(node, 'sides.note.content', 'Type your note here..')
    const background = _.get(node, 'sides.note.background', { color: 'black', opacity: 'strong' })
    return (
      <Box fill align='center' justify='center' pad='small' >
        <Box fill align='center' justify='center' round='small' background={background} overflow='scroll'>
          <Box fill align='start' justify='start' pad='small' overflow='scroll'>
            <CodeEditor value={value} onChange={newValue => napi.updateNodeSide(node, 'note/content', newValue)} options={{ size, language: null }} />
          </Box>
        </Box>
      </Box>
    )
  }

  const icon = ({ node }) => <Box fill align='center' justify='center'><icons.Note size={iconSize} /></Box>
  const preview = _view({ size: 'small' })
  const view = _view({ size: 'medium' })
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
