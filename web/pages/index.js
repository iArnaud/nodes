import React from 'react'
import { dark } from 'grommet/themes'

import { Page } from '../lib/utils'
import { Box, Anchor, Text, Button } from 'grommet'
import { Github, Twitter, Spectrum, FacebookOption, Favorite, Deploy } from 'grommet-icons'

const Nodes = () => (
  <Box fill='horizontal' direction='column' align='center' justify='center'>
    <Anchor style={{ textDecoration: 'none' }} href='/app'><Text style={{
      fontFamily: 'Nonchalance Bold',
      background: 'linear-gradient(to bottom, #0cc5f6 0%, #6b0edb 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }} color='info' weight='bold' size='10vw'>N O D E S</Text></Anchor>
  </Box>
)

const IndexPage = () => {
  return (
    <Page theme={dark}>
      <Box fill background='background'>
        <Box fill='horizontal' height='xsmall' as='header' align='center' justify='center' />
        <Box as='main' fill>
          <Box fill align='center' justify='center' gap='small'>
            <Box fill='horizontal' direction='row' align='center' justify='center' gap='small'>
              <Anchor icon={<Github size='large' />} href='https://github.com/nodes-ws/nodes' target='_blank' />
              <Anchor icon={<FacebookOption size='large' />} href='https://facebook.com/nodesws' target='_blank' />
              <Anchor icon={<Twitter size='large' />} href='https://twitter.com/nodes_ws' target='_blank' />
              <Anchor icon={<Spectrum size='large' />} href='https://spectrum.chat/nodes' target='_blank' />
              <Anchor icon={<Favorite size='large' color='red' />} href='https://patreon.com/nodes' target='_blank' />
            </Box>
            <Nodes />
            <Box pad='small' fill='horizontal' align='center' justify='center'><Text size='xlarge'><i>Reimagined web OS with composable apps.</i></Text></Box>
            <Box round='small' align='center' justify='center'><Button color='control' margin='small' href='/app' icon={<Deploy color='control' />} label='l a u n c h' /></Box>
          </Box>
        </Box>
        <Box fill='horizontal' height='xsmall' as='footer'>
          <Box align='center' justify='center' fill='horizontal' direction='row' pad='large'><Text size='small'>Nodes © 2019</Text></Box>
        </Box>
      </Box>
      <style jsx>{`
        @font-face {
          font-family: 'Nonchalance Bold';
          font-style: normal;
          font-weight: normal;
          src: local('Nonchalance Bold'), url('/static/fonts/Nonchalance Bold.woff') format('woff');
        }
      `}</style>
    </Page>
  )
}

export default IndexPage
