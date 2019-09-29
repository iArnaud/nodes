import * as buble from 'buble'

const transformCode = code => {
  const opts = {
    transforms: {
      dangerousForOf: true,
      dangerousTaggedTemplateString: true
    }
  }
  console.log('before', code)
  const newCode = buble.transform(code, opts).code
  console.log('after', newCode)
  return newCode
}

export default async ({ __deps__, __imports__ }) => {
  const { Box } = __imports__.grommet
  const { React, lodash: _, icons, CodeEditor } = __imports__.utils
  const { napi, NodeView, iconSize, viewer } = __deps__

  // eslint-disable-next-line no-new-func
  const createViewFromSrc = (fbody, deps = {}) => props => Function(
    '__props__', '__imports__', '__deps__',
    fbody
  )(
    props, __imports__, deps
  )

  // const defaultSrc = `
  //   const { React } = __imports__.utils
  //   const { Box } = __imports__.grommet
  //   const { node } = __deps__
  //   const e = React.createElement
  //
  //   return e(Box, { align: 'center', justify: 'center', fill: true }, node.name)
  // `

  const defaultSrc = `
    const { React } = __imports__.utils
    const { Box } = __imports__.grommet
    const { node } = __deps__

    return (
      <Box fill align='center' justify='center'>
        {node.name}
      </Box>
    )
  `

  const Node = (props) => React.createElement(NodeView, { ...props, napi, plain: true })

  const view = ({ node }) => React.createElement(createViewFromSrc(transformCode(_.get(node.sides, 'web.src', defaultSrc)), { napi, NodeView, node, Node }))

  const edit = ({ node }) => {
    const size = 'medium'
    const value = _.get(node, 'sides.web.src', defaultSrc)
    const background = _.get(node, 'sides.web.background', { color: 'black', opacity: 'strong' })
    return (
      <Box fill align='center' justify='center' pad='small'>
        <Box fill align='center' justify='center' round='small' background={background} direction='row'>
          <Box fill overflow='scroll'>
            {/* {view({ node })} */}
            <NodeView node={node} view='web' napi={napi} viewer={viewer} />
          </Box>
          <Box fill align='start' justify='start' pad='small' overflow='scroll'>
            <CodeEditor value={value} onChange={newValue => napi.updateNodeSide(node, 'web/src', newValue)} options={{ size, language: 'javascript' }} />
          </Box>
        </Box>
      </Box>
    )
  }

  const icon = ({ node }) => <Box fill align='center' justify='center'><icons.Code size={iconSize} /></Box>
  const preview = icon

  return {
    create: async ({ node }) => ({ side: { code: defaultSrc } }),
    modes: {
      icon,
      preview,
      view,
      edit
    }
  }
}
