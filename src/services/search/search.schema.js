// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const searchSchema = Type.Object(
  {
    id: Type.Number(),
    headline: Type.String(),
    content: Type.String(),
    q: Type.String()
  },
  { $id: 'Search', additionalProperties: false }
)
export const searchValidator = getValidator(searchSchema, dataValidator)
export const searchResolver = resolve({})

export const searchExternalResolver = resolve({})

// Schema for creating new entries
export const searchDataSchema = Type.Pick(searchSchema, ['headline', 'content'], {
  $id: 'SearchData'
})
export const searchDataValidator = getValidator(searchDataSchema, dataValidator)
export const searchDataResolver = resolve({})

// Schema for updating existing entries
export const searchPatchSchema = Type.Partial(searchSchema, {
  $id: 'SearchPatch'
})
export const searchPatchValidator = getValidator(searchPatchSchema, dataValidator)
export const searchPatchResolver = resolve({})

// Schema for allowed query properties
export const searchQueryProperties = Type.Pick(searchSchema, ['q'])
export const searchQuerySchema = Type.Intersect(
  [
    querySyntax(searchQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const searchQueryValidator = getValidator(searchQuerySchema, queryValidator)
export const searchQueryResolver = resolve({})
