// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  popularDataValidator,
  popularPatchValidator,
  popularQueryValidator,
  popularResolver,
  popularExternalResolver,
  popularDataResolver,
  popularPatchResolver,
  popularQueryResolver
} from './popular.schema.js'
import { PopularService, getOptions } from './popular.class.js'

export const popularPath = 'popular'
export const popularMethods = ['get']

export * from './popular.class.js'
export * from './popular.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const popular = (app) => {
  // Register our service on the Feathers application
  app.use(popularPath, new PopularService(getOptions(app), app), {
    // A list of all methods this service exposes externally
    methods: popularMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(popularPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        schemaHooks.resolveExternal(popularExternalResolver),
        schemaHooks.resolveResult(popularResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(popularQueryValidator), schemaHooks.resolveQuery(popularQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(popularDataValidator), schemaHooks.resolveData(popularDataResolver)],
      patch: [schemaHooks.validateData(popularPatchValidator), schemaHooks.resolveData(popularPatchResolver)],
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
