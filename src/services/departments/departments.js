// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication';
import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  departmentsDataValidator,
  departmentsPatchValidator,
  departmentsQueryValidator,
  departmentsResolver,
  departmentsExternalResolver,
  departmentsDataResolver,
  departmentsPatchResolver,
  departmentsQueryResolver
} from './departments.schema.js'
import { DepartmentsService, getOptions } from './departments.class.js'

export const departmentsPath = 'departments'
export const departmentsMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './departments.class.js'
export * from './departments.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const departments = (app) => {
  // Register our service on the Feathers application
  app.use(departmentsPath, new DepartmentsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: departmentsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(departmentsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(departmentsExternalResolver),
        schemaHooks.resolveResult(departmentsResolver)
      ],
      find: [],
      get: [],
      create: [authenticate('jwt')],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [
        schemaHooks.validateQuery(departmentsQueryValidator),
        schemaHooks.resolveQuery(departmentsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(departmentsDataValidator),
        schemaHooks.resolveData(departmentsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(departmentsPatchValidator),
        schemaHooks.resolveData(departmentsPatchResolver)
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
