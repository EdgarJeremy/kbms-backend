// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  aggregatorsDataValidator,
  aggregatorsPatchValidator,
  aggregatorsQueryValidator,
  aggregatorsResolver,
  aggregatorsExternalResolver,
  aggregatorsDataResolver,
  aggregatorsPatchResolver,
  aggregatorsQueryResolver
} from './aggregators.schema.js'
import { AggregatorsService, getOptions } from './aggregators.class.js'

export const aggregatorsPath = 'aggregators'
export const aggregatorsMethods = ['get']

export * from './aggregators.class.js'
export * from './aggregators.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const aggregators = (app) => {
  // Register our service on the Feathers application
  app.use(aggregatorsPath, new AggregatorsService(getOptions(app), app), {
    // A list of all methods this service exposes externally
    methods: aggregatorsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(aggregatorsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(aggregatorsExternalResolver),
        schemaHooks.resolveResult(aggregatorsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(aggregatorsQueryValidator),
        schemaHooks.resolveQuery(aggregatorsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(aggregatorsDataValidator),
        schemaHooks.resolveData(aggregatorsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(aggregatorsPatchValidator),
        schemaHooks.resolveData(aggregatorsPatchResolver)
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
