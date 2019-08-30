import Head from 'next/head'
import get from 'lodash/get'

import config from '../../../../lib/config'

const getTwitterTags = ({ cardType, site, handle }) => {
  const tagsToRender = []
  if (cardType) tagsToRender.push(<meta key='twitter:card' name='twitter:card' content={cardType} />)
  if (site) tagsToRender.push(<meta key='twitter:site' name='twitter:site' content={site} />)
  if (handle) tagsToRender.push(<meta key='twitter:creator' name='twitter:creator' content={handle} />)
  return tagsToRender
}

const getFacebookTags = ({ appId }) => {
  const tagsToRender = []
  if (appId) tagsToRender.push(<meta key='fb:app_id' property='fb:app_id' content={appId} />)
  return tagsToRender
}

const getOpenGraphTags = ({ node }) => {
  const tagsToRender = []
  tagsToRender.push(<meta key='og:title' property='og:title' content={node.name} />)
  if (get(node, 'sides.description')) tagsToRender.push(<meta key='og:description' property='og:description' content={node.sides.description} />)
  if (get(node, 'sides.settings.ui.background.image')) tagsToRender.push(<meta key='og:image' property='og:image' content={node.sides.settings.ui.background.image} />)
  return tagsToRender
}

const NodeSEO = ({ node }) => (
  <Head>
    <title key='title'>{node.name} | Nodes</title>
    <meta name='description' content={node.name} />
    <meta key='robots' name='robots' content={get(node, 'sides.settings.public') ? 'index,follow' : 'noindex,nofollow'} />
    <meta key='robots' name='googlebot' content={get(node, 'sides.settings.public') ? 'index,follow' : 'noindex,nofollow'} />
    {get(node, 'sides.description') && <meta key='description' name='description' content={node.sides.description} />}
    {get(node, 'sides.settings.twitter') && getTwitterTags(node.sides.settings.twitter)}
    {get(node, 'sides.settings.facebook') && getFacebookTags(node.sides.settings.facebook)}
    {getOpenGraphTags({ node })}
    <link rel='canonical' href={`${config.WEB_BASE_URL}?node=${node.id}`} key='canonical' />
  </Head>
)

export default NodeSEO
