// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'
import { userSchema } from '../users/users.schema.js';

// Main data model schema
export const articlesSchema = Type.Object(
  {
    id: Type.Number(),
    headline: Type.String(),
    content: Type.String(),
    user_id: Type.Number(),
    user: Type.Ref(userSchema)
  },
  { $id: 'Articles', additionalProperties: false }
)
export const articlesValidator = getValidator(articlesSchema, dataValidator)
export const articlesResolver = resolve({
  user: virtual(async (data, context) => {
    if (data.user_id)
      return await context.app.service('users').get(data.user_id);
    return null;
  })
})

export const articlesExternalResolver = resolve({})

// Schema for creating new entries
export const articlesDataSchema = Type.Pick(articlesSchema, ['headline', 'content'], {
  $id: 'ArticlesData'
})
export const articlesDataValidator = getValidator(articlesDataSchema, dataValidator)
export const articlesDataResolver = resolve({
  user_id: async (value, data, context) => context.params.users.id
})

// Schema for updating existing entries
export const articlesPatchSchema = Type.Partial(articlesSchema, {
  $id: 'ArticlesPatch'
})
export const articlesPatchValidator = getValidator(articlesPatchSchema, dataValidator)
export const articlesPatchResolver = resolve({})

// Schema for allowed query properties
export const articlesQueryProperties = Type.Pick(articlesSchema, ['id', 'headline', 'content'])
export const articlesQuerySchema = Type.Intersect(
  [
    querySyntax(articlesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const articlesQueryValidator = getValidator(articlesQuerySchema, queryValidator)
export const articlesQueryResolver = resolve({})
