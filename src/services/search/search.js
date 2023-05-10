// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  searchDataValidator,
  searchPatchValidator,
  searchQueryValidator,
  searchResolver,
  searchExternalResolver,
  searchDataResolver,
  searchPatchResolver,
  searchQueryResolver
} from './search.schema.js'
import { SearchService, getOptions } from './search.class.js'

export const searchPath = 'search'
export const searchMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './search.class.js'
export * from './search.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const search = (app) => {
  // Register our service on the Feathers application
  app.use(searchPath, new SearchService(getOptions(app), app), {
    // A list of all methods this service exposes externally
    methods: searchMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(searchPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(searchExternalResolver), schemaHooks.resolveResult(searchResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(searchQueryValidator), schemaHooks.resolveQuery(searchQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(searchDataValidator), schemaHooks.resolveData(searchDataResolver)],
      patch: [schemaHooks.validateData(searchPatchValidator), schemaHooks.resolveData(searchPatchResolver)],
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
