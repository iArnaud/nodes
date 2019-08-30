import { ThemeContext, Box } from 'grommet'

import Avatar from 'react-avatar'

const NodeAvatar = ({ node, theme }) => (
  <Box animation={node.status === 'error' ? 'pulse' : null}><Avatar name={node.name} size={35} round color={theme.global.colors[`status-${node.status}`]} /></Box>
)

export default ({ node }) => (
  <ThemeContext.Consumer>
    {theme => <NodeAvatar node={node} theme={theme} />}
  </ThemeContext.Consumer>
)
