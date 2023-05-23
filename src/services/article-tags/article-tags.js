// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  articleTagsDataValidator,
  articleTagsPatchValidator,
  articleTagsQueryValidator,
  articleTagsResolver,
  articleTagsExternalResolver,
  articleTagsDataResolver,
  articleTagsPatchResolver,
  articleTagsQueryResolver
} from './article-tags.schema.js'
import { ArticleTagsService, getOptions } from './article-tags.class.js'

export const articleTagsPath = 'article-tags'
export const articleTagsMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './article-tags.class.js'
export * from './article-tags.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const articleTags = (app) => {
  // Register our service on the Feathers application
  app.use(articleTagsPath, new ArticleTagsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: articleTagsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(articleTagsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(articleTagsExternalResolver),
        schemaHooks.resolveResult(articleTagsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(articleTagsQueryValidator),
        schemaHooks.resolveQuery(articleTagsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(articleTagsDataValidator),
        schemaHooks.resolveData(articleTagsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(articleTagsPatchValidator),
        schemaHooks.resolveData(articleTagsPatchResolver)
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
