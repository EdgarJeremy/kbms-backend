// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const termsSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String(),
    freq: Type.Number(),
    created_at: Type.String(),
    updated_at: Type.String()
  },
  { $id: 'Terms', additionalProperties: false }
)
export const termsValidator = getValidator(termsSchema, dataValidator)
export const termsResolver = resolve({})

export const termsExternalResolver = resolve({})

// Schema for creating new entries
export const termsDataSchema = Type.Pick(termsSchema, ['text'], {
  $id: 'TermsData'
})
export const termsDataValidator = getValidator(termsDataSchema, dataValidator)
export const termsDataResolver = resolve({})

// Schema for updating existing entries
export const termsPatchSchema = Type.Partial(termsSchema, {
  $id: 'TermsPatch'
})
export const termsPatchValidator = getValidator(termsPatchSchema, dataValidator)
export const termsPatchResolver = resolve({})

// Schema for allowed query properties
export const termsQueryProperties = Type.Pick(termsSchema, ['id', 'text', 'freq', 'created_at', 'updated_at'])
export const termsQuerySchema = Type.Intersect(
  [
    querySyntax(termsQueryProperties, {
      text: {
        $ilike: Type.String()
      }
    }),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const termsQueryValidator = getValidator(termsQuerySchema, queryValidator)
export const termsQueryResolver = resolve({})
