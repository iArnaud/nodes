import { Box } from 'grommet'
import hooks from '../utils/hooks'

import {
  StatusGood, StatusGoodSmall,
  StatusCritical, StatusCriticalSmall,
  StatusWarning, StatusWarningSmall,
  StatusDisabled, StatusDisabledSmall,
  StatusUnknown, StatusUnknownSmall
} from 'grommet-icons'

const statusToIcon = (status, small) => {
  switch (status) {
    case 'ok':
      return small ? StatusGoodSmall : StatusGood
    case 'error':
      return small ? StatusCriticalSmall : StatusCritical
    case 'warning':
      return small ? StatusWarningSmall : StatusWarning
    case 'disabled':
      return small ? StatusDisabledSmall : StatusDisabled
    default:
      return small ? StatusUnknownSmall : StatusUnknown
  }
}

const statusToColor = (status) => `status-${status}`

export default ({ node, size = 'medium' }) => {
  const online = hooks.useOnlineStatus()
  const nodeStatus = online ? (node.status || 'unknown') : 'disabled'
  const Status = statusToIcon(nodeStatus, ['xsmall', 'small'].includes(size))
  return (
    <Box animation={nodeStatus === 'error' ? 'pulse' : null} >
      <Status color={statusToColor(nodeStatus)} size={size} />
    </Box>
  )
}
