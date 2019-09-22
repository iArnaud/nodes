// Initializes the `nodes` service on path `/nodes`
const { Nodes } = require('./nodes.class')
const createModel = require('../../models/nodes.model')
const hooks = require('./nodes.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    Model,
    paginate,
    multi: true,
    id: 'id'
  }

  // Initialize our service with any options it requires
  app.use('/nodes', new Nodes(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('nodes')

  service.hooks(hooks)
}
