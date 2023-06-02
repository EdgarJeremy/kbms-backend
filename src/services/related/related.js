import { RelatedService, getOptions } from './related.class.js'

export const relatedPath = 'related'
export const relatedMethods = ['get']

export * from './related.class.js'

// A configure function that registers the service and its hooks via `app.configure`
export const related = (app) => {
  // Register our service on the Feathers application
  app.use(relatedPath, new RelatedService(getOptions(app), app), {
    // A list of all methods this service exposes externally
    methods: relatedMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(relatedPath).hooks({
    around: {
      all: []
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
