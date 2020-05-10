const http = require('http')
const config = require('./config')[process.env.NODE_ENV || 'development']
const service = require('./config/server/service')(config)
const server = http.createServer(service)
const log = config.log()
server.listen(process.env.NODE_ENV || 3000)

server.on('listening', () => {
    log.info(
      `Hi there! I'm listening on port ${server.address().port} in ${service.get('env')} mode.`,
    )
})
  