// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import { feathers } from '@feathersjs/feathers'
import express, {
  rest,
  json,
  urlencoded,
  cors,
  serveStatic,
  notFound,
  errorHandler
} from '@feathersjs/express'

import configuration from '@feathersjs/configuration'
import socketio from '@feathersjs/socketio'
import { configurationValidator } from './configuration.js'
import { logger } from './logger.js'
import { logError } from './hooks/log-error.js'
import { postgresql } from './postgresql.js'
import { elasticSearch } from './elasticsearch.js';

import { authentication } from './authentication.js'

import { services } from './services/index.js'
import { channels } from './channels.js'

const app = express(feathers())

// Load app configuration
app.configure(configuration(configurationValidator))
app.use(cors())
app.use(json({ limit: '2000kb' }))
app.use(urlencoded({ extended: true, limit: '2000kb' }))
// Host the public folder
app.use('/', serveStatic(app.get('public')))

app.use('/cdn/:service/:id/:col', async (req, res, next) => {
  const { service, id, col } = req.params;
  let mime = 'image/jpeg';
  try {
    const data = await app.service(service).get(id);
    if (data.name)
      res.setHeader('Content-Disposition', 'attachment; filename=' + data.name);
    res.setHeader('Content-type', data.mime ? data.mime : mime);
    res.send(data[col]);
  } catch (e) {
    res.status(404);
    res.json({ message: 'File not found' });
  }
})

// Configure services and real-time functionality
app.configure(rest())
app.configure(
  socketio({
    cors: {
      origin: app.get('origins')
    }
  })
)
app.configure(postgresql)
app.configure(elasticSearch);

app.configure(authentication)

app.configure(services)
app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(notFound())
app.use(errorHandler({ logger }))

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
})
// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: []
})

export { app }
