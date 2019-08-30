import { Anchor, Button, Box } from 'grommet'
import { Share } from 'grommet-icons'

import { NodeLink } from '../node'

import get from 'lodash/get'

const LinkIcon = ({ size, color = 'control' }) => <Share size={size} color={color} />

const NodeSideLink = ({ node, size }) => {
  const url = get(node, 'sides.link.url')
  const nodeId = get(node, 'sides.link.nodeId')
  if (nodeId) {
    return (
      <NodeLink node={nodeId}><Button plain icon={<LinkIcon size={size} />} /></NodeLink>
    )
  } else if (url) {
    return (
      <Anchor href={url} target='_blank'><Box align='center'><LinkIcon size={size} /></Box></Anchor>
    )
  }
  return null
}

export default NodeSideLink
