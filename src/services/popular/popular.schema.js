// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const popularSchema = Type.Object(
  {
    id: Type.Number(),
    result: Type.Array(Type.Object({
      value: Type.String(),
      freq: Type.Number()
    }))
  },
  { $id: 'Popular', additionalProperties: false }
)
export const popularValidator = getValidator(popularSchema, dataValidator)
export const popularResolver = resolve({})

export const popularExternalResolver = resolve({})

// Schema for creating new entries
export const popularDataSchema = Type.Pick(popularSchema, ['text'], {
  $id: 'PopularData'
})
export const popularDataValidator = getValidator(popularDataSchema, dataValidator)
export const popularDataResolver = resolve({})

// Schema for updating existing entries
export const popularPatchSchema = Type.Partial(popularSchema, {
  $id: 'PopularPatch'
})
export const popularPatchValidator = getValidator(popularPatchSchema, dataValidator)
export const popularPatchResolver = resolve({})

// Schema for allowed query properties
export const popularQueryProperties = Type.Pick(popularSchema, ['id', 'text'])
export const popularQuerySchema = Type.Intersect(
  [
    querySyntax(popularQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const popularQueryValidator = getValidator(popularQuerySchema, queryValidator)
export const popularQueryResolver = resolve({})
