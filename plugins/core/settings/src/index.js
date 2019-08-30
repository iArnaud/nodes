export default async ({ __deps__, __imports__ }) => {
  const { Box } = __imports__.grommet
  const { React, lodash: _, Router, JSONSchemaForm, icons } = __imports__.utils
  const { napi, iconSize } = __deps__

  const e = React.createElement

  const settingsSchema = node => ({
    type: 'object',
    title: `${node.name} Settings`,
    properties: {
      defaultView: {
        type: ['string', 'null'],
        title: 'default view',
        default: _.get(node, 'sides.settings.defaultView') || 'auto',
        enum: ['auto', ...Object.keys(node.sides)]
      },
      public: {
        type: 'boolean',
        title: 'public',
        description: 'Anyone can view this node.',
        default: _.get(node, 'sides.settings.public', false)
      },
      ui: {
        type: 'object',
        title: 'UI',
        properties: {
          background: {
            type: 'object',
            title: 'Background',
            properties: {
              image: {
                type: ['string', 'null'],
                default: _.get(node, 'sides.settings.ui.background.image', null)
              },
              color: {
                type: 'string',
                default: _.get(node, 'sides.settings.ui.background.color', 'background')
              },
              dark: {
                type: 'boolean',
                default: _.get(node, 'sides.settings.ui.background.dark', true)
              },
              video: {
                type: ['string', 'null'],
                default: _.get(node, 'sides.settings.ui.background.video', null)
              },
              audio: {
                type: ['string', 'null'],
                default: _.get(node, 'sides.settings.ui.background.audio', null)
              }
            }
          },
          showHidden: {
            type: 'boolean',
            title: 'Show hidden',
            default: _.get(node, 'sides.settings.ui.showHidden', false)
          }
        }
      }
    }
  })

  const uiSchema = {
    defaultView: {
      'ui:emptyValue': 'auto'
    },
    ui: {
      background: {
        image: {
          'ui:emptyValue': null
        },
        video: {
          'ui:emptyValue': null
        },
        audio: {
          'ui:emptyValue': null
        }
      }
    }
  }

  const edit = ({ node }) => e(Box, { fill: true },
    e(Box, { overflow: 'scroll', fill: true, align: 'center', justify: 'center', gap: 'small' },
      e(Box, { width: 'large' }, e(JSONSchemaForm, {
        schema: settingsSchema(node),
        uiSchema,
        onSubmit: async ({ formData }) => {
          const defaultView = formData.defaultView === 'auto' ? null : formData.defaultView
          await napi.updateNodeSide(node, 'settings', { ...formData, defaultView })
          const { [`${node.id}-view`]: view, ...newQuery } = Router.query
          Router.push({ pathname: Router.pathname, query: { ...newQuery, node: node.id } })
        } }))

    ))

  const view = edit
  const icon = ({ node }) => <Box fill align='center' justify='center'><icons.Services size={iconSize} /></Box>

  return {
    modes: {
      icon,
      view,
      edit
    }
  }
}
