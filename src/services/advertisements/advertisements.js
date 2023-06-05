// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  advertisementsDataValidator,
  advertisementsPatchValidator,
  advertisementsQueryValidator,
  advertisementsResolver,
  advertisementsExternalResolver,
  advertisementsDataResolver,
  advertisementsPatchResolver,
  advertisementsQueryResolver
} from './advertisements.schema.js'
import { AdvertisementsService, getOptions } from './advertisements.class.js'

export const advertisementsPath = 'advertisements'
export const advertisementsMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './advertisements.class.js'
export * from './advertisements.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const advertisements = (app) => {
  // Register our service on the Feathers application
  app.use(advertisementsPath, new AdvertisementsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: advertisementsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(advertisementsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(advertisementsExternalResolver),
        schemaHooks.resolveResult(advertisementsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(advertisementsQueryValidator),
        schemaHooks.resolveQuery(advertisementsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        authenticate('jwt'),
        schemaHooks.validateData(advertisementsDataValidator),
        schemaHooks.resolveData(advertisementsDataResolver)
      ],
      patch: [
        authenticate('jwt'),
        schemaHooks.validateData(advertisementsPatchValidator),
        schemaHooks.resolveData(advertisementsPatchResolver)
      ],
      remove: [
        authenticate('jwt')
      ]
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
