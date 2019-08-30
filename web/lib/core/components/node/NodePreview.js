import { Box } from 'grommet'
import { NodeBar, NodeLink } from '../node'
import CoolBox from '../utils/CoolBox'
import get from 'lodash/get'

import NodeView from './NodeView'

const NodePreview = ({ node, napi, viewer, showPreview = true, onClick }) => {
  return (
    <Box
      background={get(node.sides, 'settings.ui.item.background', { color: 'black', opacity: 'medium' })}
      border={get(node.sides, 'settings.ui.item.border', false)}
      elevation={get(node.sides, 'settings.ui.item.elevation', null)}
      round='small'
      align='center'
      justify='center'
      pad='xsmall'
      gap='xsmall'
      height='small'
      fill='horizontal'
      data-testid={`${node.name}.nodePreview`}
      data-nodeid={node.id}
    >
      <Box fill='horizontal' direction='row' justify='between' overflow='scroll' gap='xsmall' pad='xsmall'>
        {
          Object.keys(node.sides).filter(key => key !== 'layout').map(view => (
            <NodeLink key={view} node={node.id} view={view}>
              <Box height='12px' width='12px' style={{ cursor: 'pointer' }}><NodeView node={node} view={view} mode='icon' iconSize='small' viewer={viewer} napi={napi} /></Box>
            </NodeLink>
          ))
        }
      </Box>
      <CoolBox filter='blur(1px)' height='small' fill='horizontal' align='center' justify='center' background={showPreview ? napi.getNodeBackground(node) : null} data-testid={`${node.name}.nodePreview.action`} >
        { onClick
          ? (
            <Box style={{ cursor: 'pointer' }} fill align='center' justify='center' background={showPreview ? { color: 'black', opacity: 'weak' } : null} onClick={() => onClick(node, napi, viewer)}>
              <NodeView node={node} napi={napi} viewer={viewer} mode='preview' />
            </Box>
          )
          : (
            <NodeLink node={node.id} >
              <Box style={{ cursor: 'pointer' }} fill align='center' justify='center' background={showPreview ? { color: 'black', opacity: 'weak' } : null}>
                <NodeView node={node} napi={napi} viewer={viewer} mode='preview' />
              </Box>
            </NodeLink>
          )
        }
      </CoolBox>
      <Box fill='horizontal'>
        <NodeBar
          node={node}
          napi={napi}
          viewer={viewer}
          canRename={false}
          showPrevious={false}
          size={{ status: 'small', name: 'small', sidelink: 'small', menu: 'medium', users: 'small' }}
          actions={{ addUser: false, search: false, viewSides: false, addSide: false, addNode: false, more: true }}
        />
      </Box>
    </Box>
  )
}

export default NodePreview
