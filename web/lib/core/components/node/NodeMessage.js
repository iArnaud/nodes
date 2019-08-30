import { Box, Text } from 'grommet'

const NodeMessage = ({ node, message, color }) => {
  return (
    <Box fill align='center' justify='center' background={{ color, opacity: 'strong' }} overflow='scroll'>
      <Text as='pre'>{message}</Text>
    </Box>
  )
}

export default NodeMessage
