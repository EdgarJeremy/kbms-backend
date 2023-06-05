// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  attachmentsDataValidator,
  attachmentsPatchValidator,
  attachmentsQueryValidator,
  attachmentsResolver,
  attachmentsExternalResolver,
  attachmentsDataResolver,
  attachmentsPatchResolver,
  attachmentsQueryResolver
} from './attachments.schema.js'
import { AttachmentsService, getOptions } from './attachments.class.js'

export const attachmentsPath = 'attachments'
export const attachmentsMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './attachments.class.js'
export * from './attachments.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const attachments = (app) => {
  // Register our service on the Feathers application
  app.use(attachmentsPath, new AttachmentsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: attachmentsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(attachmentsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(attachmentsExternalResolver),
        schemaHooks.resolveResult(attachmentsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(attachmentsQueryValidator),
        schemaHooks.resolveQuery(attachmentsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        authenticate('jwt'),
        schemaHooks.validateData(attachmentsDataValidator),
        schemaHooks.resolveData(attachmentsDataResolver)
      ],
      patch: [
        authenticate('jwt'),
        schemaHooks.validateData(attachmentsPatchValidator),
        schemaHooks.resolveData(attachmentsPatchResolver)
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
