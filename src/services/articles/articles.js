// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication';
import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  articlesDataValidator,
  articlesPatchValidator,
  articlesQueryValidator,
  articlesResolver,
  articlesExternalResolver,
  articlesDataResolver,
  articlesPatchResolver,
  articlesQueryResolver
} from './articles.schema.js'
import { ArticlesService, getOptions } from './articles.class.js'
import { registerEsIndex } from '../../hooks/register-es-index.js';
import { updateEsIndex } from '../../hooks/update-es-index.js';
import { removeEsIndex } from '../../hooks/remove-es-index.js';
import { allowAnonymous } from '../../hooks/allow-anonymous.js';

export const articlesPath = 'articles'
export const articlesMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './articles.class.js'
export * from './articles.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const articles = (app) => {
  // Register our service on the Feathers application
  app.use(articlesPath, new ArticlesService(getOptions(app), app), {
    // A list of all methods this service exposes externally
    methods: articlesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(articlesPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(articlesExternalResolver),
        schemaHooks.resolveResult(articlesResolver)
      ],
      create: [authenticate('jwt')],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [
        schemaHooks.validateQuery(articlesQueryValidator),
        schemaHooks.resolveQuery(articlesQueryResolver)
      ],
      find: [],
      get: [allowAnonymous, authenticate('jwt', 'anonymous')],
      create: [
        schemaHooks.validateData(articlesDataValidator),
        schemaHooks.resolveData(articlesDataResolver),
      ],
      patch: [
        schemaHooks.validateData(articlesPatchValidator),
        schemaHooks.resolveData(articlesPatchResolver)
      ],
      remove: []
    },
    after: {
      all: [],
      create: [registerEsIndex],
      patch: [updateEsIndex],
      remove: [removeEsIndex]
    },
    error: {
      all: []
    }
  })
}
