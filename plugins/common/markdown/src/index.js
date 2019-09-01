export default async ({ __deps__, __imports__ }) => {
  const { Box, Text, Image, Table, Anchor, Markdown, Paragraph } = __imports__.grommet
  const { React, lodash: _, icons, CodeEditor } = __imports__.utils
  const { napi, NodeView, iconSize, viewer } = __deps__

  const Node = ({ id, view, ...rest }) => {
    const [node, setNode] = React.useState()
    React.useEffect(() => {
      const getNode = async id => setNode(await napi.getNode(id))
      getNode(id)
    }, [id])
    return node ? <Box {...rest}><NodeView node={node} view={view} viewer={viewer} napi={napi} /></Box> : null
  }

  const components = ({ size = 'medium' } = {}) => ({
    p: { component: Paragraph, props: { size } },
    a: { component: Anchor, props: { size } },
    Box: { component: Box },
    Node: { component: Node },
    Text: { component: Text, props: { size } },
    Image: { component: Image },
    Table: { component: Table },
    Anchor: { component: Anchor }
  })

  const _view = ({ align, justify, pad, size }) => ({ node }) => {
    const content = _.get(node.sides, 'markdown.content', `# ${node.name}`)
    const background = _.get(node.sides, 'markdown.background') || { color: 'black', opacity: 'medium' }
    return (
      <Box fill align='center' justify='center' pad={pad} >
        <Box fill align='center' justify='center' round='small' background={background} overflow='scroll' >
          <Box fill align='start' justify='start' pad='small'>
            <Markdown components={components({ size })}>{content}</Markdown>
          </Box>
        </Box>
      </Box>
    )
  }

  const view = _view({ align: 'center', justify: 'center', pad: 'small', size: 'medium' })

  const _edit = ({ size }) => ({ node }) => {
    const value = _.get(node, 'sides.markdown.content', `# ${node.name}`)
    const background = _.get(node, 'sides.markdown.background', { color: 'black', opacity: 'strong' })
    return (
      <Box fill align='center' justify='center' pad='small' >
        <Box fill align='center' justify='center' round='small' background={background} direction='row'>
          <Box fill overflow='scroll'>
            {view({ node })}
          </Box>
          <Box fill align='start' justify='start' pad='small' overflow='scroll'>
            <CodeEditor value={value} onChange={newValue => napi.updateNodeSide(node, 'markdown/content', newValue)} options={{ size, language: 'markup' }} />
          </Box>
        </Box>
      </Box>
    )
  }

  const edit = _edit({ size: 'medium' })

  const icon = ({ node }) => <Box fill align='center' justify='center'><icons.DocumentText size={iconSize} /></Box>
  const preview = _view({ align: 'start', justify: 'start', pad: 'none', size: 'small' })

  return {
    modes: {
      icon,
      preview,
      view,
      edit
    }
  }
}
