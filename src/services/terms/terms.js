// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  termsDataValidator,
  termsPatchValidator,
  termsQueryValidator,
  termsResolver,
  termsExternalResolver,
  termsDataResolver,
  termsPatchResolver,
  termsQueryResolver
} from './terms.schema.js'
import { TermsService, getOptions } from './terms.class.js'

export const termsPath = 'terms'
export const termsMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './terms.class.js'
export * from './terms.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const terms = (app) => {
  // Register our service on the Feathers application
  app.use(termsPath, new TermsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: termsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(termsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(termsExternalResolver),
        schemaHooks.resolveResult(termsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(termsQueryValidator), schemaHooks.resolveQuery(termsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(termsDataValidator), schemaHooks.resolveData(termsDataResolver)],
      patch: [schemaHooks.validateData(termsPatchValidator), schemaHooks.resolveData(termsPatchResolver)],
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
