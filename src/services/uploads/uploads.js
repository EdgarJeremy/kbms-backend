// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { UploadsService, getOptions } from './uploads.class.js'
import multer from 'multer'

const multipartMiddleware = multer()

export const uploadsPath = 'uploads'
export const uploadsMethods = ['create']

export * from './uploads.class.js'

// A configure function that registers the service and its hooks via `app.configure`
export const uploads = (app) => {
  // Register our service on the Feathers application
  app.use(uploadsPath, multipartMiddleware.single('file'), (req, res, next) => {
    req.feathers.file = req.file;
    next();
  }, new UploadsService(getOptions(app), app), {
    // A list of all methods this service exposes externally
    methods: uploadsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(uploadsPath).hooks({
    around: {
      all: [authenticate('jwt')]
    },
    before: {
      all: [],
      find: [],
      get: [],
      create: [],
      patch: [],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
