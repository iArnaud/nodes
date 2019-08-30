import get from 'lodash/get'

const getNodeView = node => {
  const commonSides = ['json', 'chat', 'settings', 'desktop', 'users', 'user']
  if (node.id.startsWith('__')) {
    return Object.keys(node.sides)[0]
  }
  if (get(node, 'sides.settings.defaultView') && node.sides[node.sides.settings.defaultView]) {
    return node.sides.settings.defaultView
  }
  let view = 'desktop'
  if ((node.children || []).length) { // FIXME: broken as now with paginaiton node does not have children property
    view = 'desktop'
  } else if (Object.keys(node.sides || {}).filter(key => !commonSides.includes(key)).length) {
    view = Object.keys(node.sides).filter(key => !commonSides.includes(key))[0]
  }
  return view
}

export default getNodeView
