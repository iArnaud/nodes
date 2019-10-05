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
      html,body {
        box-sizing: border-box;
      }
      *, *:before, *:after { box-sizing: inherit; }

      /* Set full height: http://stackoverflow.com/questions/6654958/make-body-have-100-of-the-browser-height */
      html {
        /* body will set it's height based on its parent, which is html */
        height: 100%;

        /* set full width as well */
        width: 100%;
      }
      body {
        /* min-height is needed for pages that might scroll, ie they may contain _more_ than 100% of viewport height */
        min-height: 100%;

        /* needed to prevent unwanted scroll-bars */
        margin: 0;
        padding: 0;

        /* This is just so we can tell the body block apart from the app container */
        background-color: black;
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
    <ThemeContext.Extend value={{ anchor: { color: theme.global.colors.text } }}>
      {children}
    </ThemeContext.Extend>
  </Grommet>
)
