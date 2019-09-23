/* eslint-disable no-console */
const logger = require('./logger')
const seed = require('./seed')
const app = require('./app')

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
)

seed(app).then(() => {
  const port = app.get('port')
  const server = app.listen(port)
  server.on('listening', () =>
    logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
  )
}).catch(err => {
  logger.error('Error in seed', err)
})
