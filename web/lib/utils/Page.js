import React from 'react'

import Head from 'next/head'

import { Grommet, ThemeContext } from 'grommet'
import { dark } from 'grommet/themes'

const Meta = () => (
  <>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <title key='title'>Nodes</title>
      <meta name='description' content='Hackable lightweight offline-first web OS with composable apps.' />
      <meta name='theme-color' content='#000000' />
      <link rel='manifest' href='/static/manifest.json' />
      <link rel='apple-touch-icon' href='/static/apple-touch-icon.png' />
      <noscript>You need to enable javascript to run this app.</noscript>
    </Head>
    <style jsx global>{`
      body {
        background: black;
        margin: 0;
        height: '100%';
      }

      * {
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none;  /* IE 10+ */
      }

      ::-webkit-scrollbar {
        display: none;
      }

    `}
    </style>
  </>
)

export default ({ theme = dark, children }) => (
  <Grommet full theme={theme}>
    <Meta />
    <ThemeContext.Extend value={{
      anchor: {
        color: theme.global.colors.text
      }
    }}>
      {children}
    </ThemeContext.Extend>
  </Grommet>
)
