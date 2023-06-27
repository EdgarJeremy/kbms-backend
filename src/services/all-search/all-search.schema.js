// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const allSearchSchema = Type.Object(
  {
    id: Type.Number(),
    q: Type.String(),
    category_id: Type.Number(),
    tags: Type.Array(Type.Number()),
    size: Type.Number(),
    from: Type.Number()
  },
  { $id: 'AllSearch', additionalProperties: false }
)
export const allSearchValidator = getValidator(allSearchSchema, dataValidator)
export const allSearchResolver = resolve({})

export const allSearchExternalResolver = resolve({})

// Schema for creating new entries
export const allSearchDataSchema = Type.Pick(allSearchSchema, [], {
  $id: 'AllSearchData'
})
export const allSearchDataValidator = getValidator(allSearchDataSchema, dataValidator)
export const allSearchDataResolver = resolve({})

// Schema for updating existing entries
export const allSearchPatchSchema = Type.Partial(allSearchSchema, {
  $id: 'AllSearchPatch'
})
export const allSearchPatchValidator = getValidator(allSearchPatchSchema, dataValidator)
export const allSearchPatchResolver = resolve({})

// Schema for allowed query properties
export const allSearchQueryProperties = Type.Pick(allSearchSchema, ['q', 'category_id', 'tags', 'from', 'size'])
export const allSearchQuerySchema = Type.Intersect(
  [
    querySyntax(allSearchQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const allSearchQueryValidator = getValidator(allSearchQuerySchema, queryValidator)
export const allSearchQueryResolver = resolve({})
