import get from 'lodash/get'

export const getNodeBackground = (node, defaultValue) => {
  const background = get(node, 'sides.settings.ui.background')
  return background ? { ...background, image: background.image && background.image.startsWith('http') ? `url(${background.image})` : background.image } : defaultValue
}
