import urlParser from 'js-video-url-parser'

export default async ({ __deps__, __imports__ }) => {
  const { Box, Image, Anchor } = __imports__.grommet
  const { React, lodash: _, icons, JSONSchemaForm, Router, Link } = __imports__.utils
  const { napi, iconSize } = __deps__

  const IframeView = ({ url }) => (
    <Box pad={{ bottom: '56.25%' }} style={{ position: 'relative' }} fill >
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0
        }}
        width='100%'
        height='100%'
        src={url}
        frameBorder='0'
        allowFullScreen
      />
    </Box>
  )

  const guessUrlType = url => {
    let type = 'default'
    if (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.webp') || url.endsWith('.png')) {
      type = 'image'
    } else if (url.endsWith('.pdf')) {
      type = 'pdf'
    } else if (urlParser.parse(url)) {
      type = 'video'
    }
    return type
  }

  const _view = ({ size }) => ({ node }) => {
    const url = _.get(node, 'sides.link.url')
    const urlObj = new URL(url)
    const modes = {
      video: <Box fill pad={size === 'small' ? null : 'small'}><IframeView url={urlParser.create({ videoInfo: urlParser.parse(url), format: 'embed', params: { controls: '1' } })} /></Box>,
      pdf: <Box overflow='auto' fill align='center' justify='center'><IframeView url={url} /></Box>,
      image: <Box fill pad='small' align='center' justify='center'><Image src={url} fit={size === 'small' ? 'contain' : 'cover'} style={{ height: '100%', width: '100%' }} /></Box>,
      default: (
        <Box fill align='center' justify='center'>
          {
            window.location.hostname === urlObj.hostname
              ? <Link href={urlObj.pathname + urlObj.search}><Anchor size={size === 'small' ? 'xsmall' : size} label={node.name} /></Link>
              : <Anchor size={size === 'small' ? 'xsmall' : size} label={size === 'small' ? `${urlObj.hostname}...` : url} href={url} target='_blank' />
          }
        </Box>
      )
    }

    return (
      <Box align='center' justify='center' fill overflow='scroll' pad='small'>
        {modes[guessUrlType(url)]}
      </Box>
    )
  }

  const pluginSchema = {
    type: 'object',
    required: [
      'url'
    ],
    properties: {
      url: {
        type: 'string',
        title: 'URL'
      }
    }
  }

  const uiSchema = {
    url: {
      'ui:autofocus': true,
      'ui:options': {
        testid: 'url.input'
      }
    }
  }

  const edit = ({ node }) => {
    const { url } = _.get(node, 'sides.link', {})
    return (
      <Box fill align='center' justify='center'>
        <Box width='large' overflow='scroll'>
          <JSONSchemaForm
            formData={{ url }}
            schema={pluginSchema}
            uiSchema={uiSchema}
            onSubmit={async ({ formData }) => {
              await napi.updateNodeSide(node, 'link', formData)
              Router.push({ pathname: Router.pathname, query: { node: node.id } })
            }}
          />
        </Box>
      </Box>
    )
  }

  const icon = ({ node }) => {
    const linkIcons = {
      video: <icons.CirclePlay size={iconSize} />,
      pdf: <icons.DocumentPdf size={iconSize} />,
      image: <icons.Image size={iconSize} />,
      default: <icons.Link size={iconSize} />
    }
    const url = _.get(node, 'sides.link.url')
    return (
      <Box fill align='center' justify='center'>
        {linkIcons[url ? guessUrlType(url) : 'default']}
      </Box>
    )
  }

  const preview = _view({ size: 'small' })
  const view = _view({ size: 'medium' })

  return {
    modes: {
      icon,
      preview,
      view,
      edit
    }
  }
}
