import * as Babel from '@babel/standalone'

const transformCode = source => Babel.transform(
  source, {
    presets: ['es2017', 'react'],
    parserOpts: { allowImportExportEverywhere: true, allowReturnOutsideFunction: true, allowAwaitOutsideFunction: true }
  }).code

export default async ({ __deps__, __imports__ }) => {
  const { Box } = __imports__.grommet
  const { React, lodash: _, Router, PreviewEditor, icons } = __imports__.utils
  const { napi, NodeView, iconSize, viewer } = __deps__

  const defaultSrc = `
    const { React } = __imports__.utils
    const { Box } = __imports__.grommet
    const { node } = __deps__

    return (
    <Box fill align='center' justify='center'>
      {node.name} Custom View
    </Box>
  )`

  const Node = (props) => React.createElement(NodeView, { ...props, napi, plain: true })

  // FIXME: move napi.createViewFromSrc to this side, then remove from napi
  const view = ({ node }) => React.createElement(napi.createViewFromSrc(transformCode(_.get(node.sides, 'custom.code', defaultSrc)), { napi, NodeView, node, Node }))

  const edit = ({ node }) => (
    <PreviewEditor
      value={_.get(node, 'sides.custom.code', defaultSrc)}
      onCancel={() => Router.push({ pathname: Router.pathname, query: { ...Router.query, [`${node.id}-view`]: 'custom' } })}
      onSave={value => napi.updateNodeSide(node, 'custom/code', value)}
      onSaveAndQuit={async value => {
        await napi.updateNodeSide(node, 'custom/code', value)
        Router.push({ pathname: Router.pathname, query: { ...Router.query, [`${node.id}-view`]: 'custom' } })
      }}
      options={{
        ..._.get(node, 'sides.settings.ui.editor', {}),
        readOnly: false,
        mode: 'jsx'
      }}
      // Preview={({ value }) => React.createElement(view, { node })}
      Preview={({ value }) => <NodeView node={node} napi={napi} viewer={viewer} plain view='custom' />}
    />
  )

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
