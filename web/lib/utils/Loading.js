import { Box } from 'grommet'

export default ({ indicator, ...rest }) => (
  <Box fill align='center' justify='center' background='black' {...rest} >
    {indicator}
  </Box>
)
