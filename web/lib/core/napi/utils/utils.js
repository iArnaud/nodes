export const _isUrl = id => id.startsWith('http') // FIXME: refactor
export const _isSystemNodeId = id => id.startsWith('__') && id.endsWith('__')
