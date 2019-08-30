import { Stack, Box } from 'grommet'

const CoolBox = ({ children, background, filter = 'blur(10px)', ...rest }) => (
  <Stack fill>
    <Box fill background={background} style={{ filter }} />
    <Box {...rest} fill>{children}</Box>
  </Stack>
)

export default CoolBox
