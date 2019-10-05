import React from 'react'

import Router from 'next/router'

import { Box, Text, Button, Menu, ResponsiveContext } from 'grommet'
import { Search, Duplicate, Add, More, Services, Pin, Trash, FormPrevious, ChapterAdd, Copy, DocumentDownload, Aggregate, Login, Wifi, Download, Upload } from 'grommet-icons'

import InlineEdit from '../utils/InlineEdit'
import hooks from '../utils/hooks'
import Avatar from 'react-avatar'

import { NodeLink, NodeStatus, NodeSideLink, NodeUsers } from '../node'

const defaultSize = { name: 'medium', status: 'medium', sidelink: 'medium', menu: 'medium', users: 'medium' }
const defaultActions = { addUser: true, search: true, viewSides: true, addSide: true, addNode: true, more: true }

const PreviousNode = ({ node, justify = 'center' }) => (
  <Box fill justify='start' align='center' >
    { node.parentId && <Box align='center' justify='start'><NodeLink node={node.parentId}><Button data-testid='goParent.action' plain icon={<FormPrevious />} /></NodeLink></Box> }
  </Box>
)

const NodeName = ({ node, canRename, screen, napi, viewer, showPrevious, size, justify = 'start' }) => (
  <Box direction='row' align='center' justify={justify} data-testid='nodeName' fill='horizontal' >
    <NodeLink node={node.id} query={Router.query.parent && { parent: Router.query.parent }}><Button style={{ paddingRight: '3px' }} data-testid='viewDefaultSide.action' plain icon={<NodeStatus node={node} size={screen === 'small' ? 'small' : size.status} />} /></NodeLink>
    {canRename && napi.hasPermission(viewer, node, 'rename')
      ? <Text truncate weight='bold' size={screen === 'small' ? 'small' : size.name} data-testid='rename.action'>
        <InlineEdit isEditing={(node.name === 'Untitled node') || node.name.endsWith(' ')} text={node.name} onFocusOut={async name => name && name !== '' && napi.renameNode(node.id, name)} />
      </Text>
      : <NodeLink node={node.id} query={Router.query.parent && { parent: Router.query.parent }}>
        <Box direction='row' fill align='center' style={{ cursor: 'pointer' }}><Text weight='bold' truncate size={screen === 'small' ? 'small' : size.name}>{node.name}</Text></Box>
      </NodeLink>
    }
    <NodeSideLink node={node} size={size.sidelink} />
  </Box>
)

const Users = ({ node, napi, viewer, size }) => (
  <Box direction='row' gap='small' align='center' justify='center' style={{ minWidth: '50px' }} fill='horizontal' >
    <NodeUsers node={node} size={size} napi={napi} viewer={viewer} />
  </Box>
)

const Viewer = ({ node, viewer, screen }) => {
  return (
    <Box align='center' justify='center' >{ viewer
      ? <NodeLink view={Router.query.node === viewer.node ? 'user' : null} node={viewer.node}><Box style={{ cursor: 'pointer' }} align='center' justify='center' round ><Avatar email={viewer.email} name={viewer.name} src={viewer.avatar} size={screen === 'small' ? 26 : 32} round /></Box></NodeLink>
      : <Button data-testid='login.action' plain onClick={async () => Router.push({ pathname: Router.pathname, query: { node: '__login__', parent: node.id } })}><Box align='center'><Login /></Box></Button>
    }</Box>
  )
}

const getMenuItem = ({ label, icon, onClick }) => ({ label, icon: <Box data-testid={`${label}.node.action`} pad={{ right: 'xsmall' }}>{icon}</Box>, onClick })

const NodeActions = ({ node, viewer, actions, napi, screen, size, justify = 'end' }) => {
  actions = { ...defaultActions, ...actions }
  const moreItems = []
  if (napi.hasPermission(viewer, node, 'changeSide')) {
    moreItems.push(getMenuItem({ label: 'Settings', icon: <Services />, onClick: () => Router.push({ pathname: Router.pathname, query: { ...Router.query, node: node.id, [`${node.id}-view`]: 'settings-edit' } }) }))
  }
  if (viewer && napi.hasPermission(viewer, node, 'changeSide')) {
    moreItems.push(getMenuItem({ label: 'Pin', icon: <Pin />, onClick: () => napi.pinNode({ node, parentId: viewer.node }) }))
  }
  if (napi.hasPermission(viewer, node, 'addNode')) {
    moreItems.push(getMenuItem({ label: 'Duplicate', icon: <ChapterAdd />, onClick: async () => napi.duplicateNode(node) }))
  }
  if (napi.hasPermission(viewer, node, 'deleteNode')) {
    moreItems.push(getMenuItem({ label: 'Delete', icon: <Trash />, onClick: async () => Router.push({ pathname: Router.pathname, query: { ...Router.query, node: node.id, [`${node.id}-view`]: 'remove' } }) }))
  }
  if (napi.hasPermission(viewer, node, 'changeSide')) {
    moreItems.push(getMenuItem({ label: 'Copy', icon: <Copy />, onClick: async () => napi.copyToClipboard(node, viewer) }))
  }
  if (napi.hasPermission(viewer, node, 'addNode')) {
    moreItems.push(getMenuItem({ label: 'Paste', icon: <DocumentDownload />, onClick: async () => napi.pasteFromClipboard(node, viewer) }))
  }
  if (napi.hasPermission(viewer, node, 'addNode')) {
    moreItems.push(getMenuItem({ label: 'Merge',
      icon: <Aggregate />,
      onClick: async () => {
        Router.push({ pathname: Router.pathname, query: { ...Router.query, node: node.id, [`${node.id}-view`]: 'merge' } })
      } }))
  }
  if (napi.hasPermission(viewer, node, 'addNode')) {
    moreItems.push(getMenuItem({ label: 'Import...', icon: <Download />, onClick: async () => Router.push({ pathname: Router.pathname, query: { ...Router.query, node: node.id, [`${node.id}-view`]: 'import' } }) }))
    moreItems.push(getMenuItem({ label: 'Export...', icon: <Upload />, onClick: async () => Router.push({ pathname: Router.pathname, query: { ...Router.query, node: node.id, [`${node.id}-view`]: 'export' } }) }))
  }
  return (
    <Box direction='row' gap={screen === 'small' ? 'xsmall' : 'small'} align='center' justify={justify} fill>
      {actions.search && napi.hasPermission(viewer, node, 'search') && <Button data-testid='search.action' plain icon={<Search />} onClick={async () => Router.push({ pathname: Router.pathname, query: { ...Router.query, [`${node.id}-view`]: 'search' } })} />}
      {actions.addSide && napi.hasPermission(viewer, node, 'addSide') && <NodeLink node='__side__' query={{ parent: node.id }}><Button data-testid='addSide.action' plain icon={<Duplicate />} /></NodeLink>}
      {actions.addNode && napi.hasPermission(viewer, node, 'addNode') && <NodeLink node='__node__' query={{ parent: node.id }}><Button data-testid='addNode.action' plain icon={<Add />} /></NodeLink>}
      {moreItems.length > 0 && actions.more && <Menu data-testid='More.node.action' items={moreItems} dropAlign={{ left: 'left', right: 'right', top: 'bottom', bottom: 'top' }}><Box align='center'><More size={size.menu} /></Box></Menu>}
    </Box>
  )
}

const OnlineStatus = () => {
  const online = hooks.useOnlineStatus()
  console.log('online status:', online)
  return online ? <Wifi color='status-ok' /> : <Wifi color='status-disabled' />
}

const NodeBar = ({ node, napi, viewer, showPrevious = true, canRename = true, size = {}, actions = {}, showViewer = false, showOnlineStatus = false }) => {
  actions = { ...defaultActions, ...actions }
  size = { ...defaultSize, ...size }
  const screen = React.useContext(ResponsiveContext)
  return (
    <React.Fragment>
      {
        screen === 'small' && size.users !== 'small'
          ? (
            <Box fill='horizontal' align='center' justify='center' pad='small' gap='small'>
              <Box direction='row' fill='horizontal' justify='between'>
                <Box>{showPrevious && <PreviousNode node={node} />}</Box>
                <Box><NodeName node={node} napi={napi} viewer={viewer} canRename={canRename} showPrevious={showPrevious} size={size} screen={screen} /></Box>
                {showOnlineStatus && <Box align='center' justify='center'><OnlineStatus /></Box>}
                <Box>{showViewer && <Viewer node={node} viewer={viewer} screen={screen} />}</Box>
              </Box>
              <Box fill='horizontal' direction='row' align='center' justify='between'>
                <Box fill>{napi.hasPermission(viewer, node, 'viewUsers') && <Users node={node} viewer={viewer} napi={napi} size={screen === 'small' ? 'small' : size.users} /> }</Box>
                <Box fill><NodeActions node={node} viewer={viewer} napi={napi} screen={screen} actions={actions} size={size} justify='between' /></Box>
              </Box>
            </Box>
          )
          : screen !== 'small' && size.users !== 'small' ? (
            <Box fill='horizontal' direction='row' align='center'>
              <Box basis='1/3' direction='row' justify='between'>
                <Box>{showPrevious && <PreviousNode node={node} />}</Box>
                <Box fill />
              </Box>
              <Box basis='1/3' justify='center'><NodeName justify='center' node={node} napi={napi} viewer={viewer} canRename={canRename} showPrevious={showPrevious} size={size} screen={screen} /></Box>
              <Box basis='1/3' direction='row' justify='evenly'>
                <Box fill>{napi.hasPermission(viewer, node, 'viewUsers') && <Users node={node} viewer={viewer} napi={napi} size={screen === 'small' ? 'small' : size.users} /> }</Box>
                <Box direction='row' gap='small' justify='end' fill>
                  <Box><NodeActions node={node} viewer={viewer} napi={napi} screen={screen} actions={actions} size={size} /></Box>
                  {showOnlineStatus && <Box align='center' justify='center'><OnlineStatus /></Box>}
                  <Box>{showViewer && <Viewer node={node} viewer={viewer} screen={screen} />}</Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box fill='horizontal' align='center' justify='center' pad='xsmall' gap='small'>
              <Box direction='row' fill='horizontal' justify='center'>
                <Box fill>{napi.hasPermission(viewer, node, 'viewUsers') && <Users node={node} viewer={viewer} napi={napi} size={screen === 'small' ? 'small' : size.users} /> }</Box>
              </Box>
              <Box fill='horizontal' direction='row' align='center' justify='between'>
                <Box fill><NodeName node={node} napi={napi} viewer={viewer} canRename={canRename} showPrevious={showPrevious} size={size} screen={screen} /></Box>
                <Box><NodeActions node={node} viewer={viewer} napi={napi} screen={screen} actions={actions} size={size} justify='end' /></Box>
              </Box>
            </Box>
          )
      }
    </React.Fragment>
  )
}

export default NodeBar
