import https from 'https'
import fs from 'fs'
import { app } from './app.js'
import { logger } from './logger.js'

const port = app.get('port')
const host = app.get('host')

const server = https.createServer({
	key: fs.readFileSync('./certs/insight-key.pem'),
	cert: fs.readFileSync('./certs/insight-cert.pem')
}, app).listen(port)

process.on('unhandledRejection', (reason) => logger.error('Unhandled Rejection %O', reason))

app.setup(server)

server.on('listening', () => {
  logger.info(`Feathers app listening on http://${host}:${port}`)
})
