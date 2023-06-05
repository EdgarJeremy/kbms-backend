import { NewsService, getOptions } from './news.class.js'

export const newsPath = 'news'
export const newsMethods = ['find', 'get']

export * from './news.class.js'

// A configure function that registers the service and its hooks via `app.configure`
export const news = (app) => {
  // Register our service on the Feathers application
  app.use(newsPath, new NewsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: newsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(newsPath).hooks({
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
