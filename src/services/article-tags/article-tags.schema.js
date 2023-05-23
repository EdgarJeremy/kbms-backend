// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const articleTagsSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'ArticleTags', additionalProperties: false }
)
export const articleTagsValidator = getValidator(articleTagsSchema, dataValidator)
export const articleTagsResolver = resolve({})

export const articleTagsExternalResolver = resolve({})

// Schema for creating new entries
export const articleTagsDataSchema = Type.Pick(articleTagsSchema, ['text'], {
  $id: 'ArticleTagsData'
})
export const articleTagsDataValidator = getValidator(articleTagsDataSchema, dataValidator)
export const articleTagsDataResolver = resolve({})

// Schema for updating existing entries
export const articleTagsPatchSchema = Type.Partial(articleTagsSchema, {
  $id: 'ArticleTagsPatch'
})
export const articleTagsPatchValidator = getValidator(articleTagsPatchSchema, dataValidator)
export const articleTagsPatchResolver = resolve({})

// Schema for allowed query properties
export const articleTagsQueryProperties = Type.Pick(articleTagsSchema, ['id', 'text'])
export const articleTagsQuerySchema = Type.Intersect(
  [
    querySyntax(articleTagsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const articleTagsQueryValidator = getValidator(articleTagsQuerySchema, queryValidator)
export const articleTagsQueryResolver = resolve({})
