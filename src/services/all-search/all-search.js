// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  allSearchDataValidator,
  allSearchPatchValidator,
  allSearchQueryValidator,
  allSearchResolver,
  allSearchExternalResolver,
  allSearchDataResolver,
  allSearchPatchResolver,
  allSearchQueryResolver
} from './all-search.schema.js'
import { AllSearchService, getOptions } from './all-search.class.js'

export const allSearchPath = 'all-search'
export const allSearchMethods = ['find']

export * from './all-search.class.js'
export * from './all-search.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const allSearch = (app) => {
  // Register our service on the Feathers application
  app.use(allSearchPath, new AllSearchService(getOptions(app), app), {
    // A list of all methods this service exposes externally
    methods: allSearchMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(allSearchPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(allSearchExternalResolver),
        schemaHooks.resolveResult(allSearchResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(allSearchQueryValidator),
        schemaHooks.resolveQuery(allSearchQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(allSearchDataValidator),
        schemaHooks.resolveData(allSearchDataResolver)
      ],
      patch: [
        schemaHooks.validateData(allSearchPatchValidator),
        schemaHooks.resolveData(allSearchPatchResolver)
      ],
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
