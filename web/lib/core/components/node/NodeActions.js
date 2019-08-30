import Router from 'next/router'
import { Box, Menu } from 'grommet'
import { More, Services, Pin, Trash } from 'grommet-icons'

const MenuIcon = ({ icon, onClick }) => (
  <Box fill align='center' onClick={onClick}>
    {icon}
  </Box>
)

const NodeActions = ({ node, napi, viewer }) => {
  const items = []
  items.push({
    icon: (<MenuIcon icon={<Services />} />),
    onClick: () => {
      return Router.push({ pathname: Router.pathname, query: { ...Router.query, node: node.id, [`${node.id}-view`]: 'settings-edit' } })
    } })
  items.push({
    icon: (<MenuIcon icon={<Pin />} />),
    onClick: async () => {
      return napi.pinNode(node, viewer.node)
    } })
  items.push({
    icon: <MenuIcon icon={<Trash />} />,
    onClick: async () => Router.push({ pathname: Router.pathname, query: { ...Router.query, node: node.id, [`${node.id}-view`]: 'remove' } }) })

  return (
    <Menu items={items} dropAlign={{ top: 'bottom', right: 'right' }}><Box align='center'><More /></Box></Menu>
  )
}

export default NodeActions
