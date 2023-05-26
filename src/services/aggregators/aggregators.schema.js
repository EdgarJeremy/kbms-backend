// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const aggregatorsSchema = Type.Object(
  {
    id: Type.Number(),
    type: Type.Union([Type.Literal('keyword')]),
    from: Type.String({ format: 'date' }),
    to: Type.String({ format: 'date' }),
    data: Type.Array(Type.Object({ count: Type.Number(), date: Type.String() }))
  },
  { $id: 'Aggregators', additionalProperties: false }
)
export const aggregatorsValidator = getValidator(aggregatorsSchema, dataValidator)
export const aggregatorsResolver = resolve({})

export const aggregatorsExternalResolver = resolve({})

// Schema for creating new entries
export const aggregatorsDataSchema = Type.Pick(aggregatorsSchema, ['text'], {
  $id: 'AggregatorsData'
})
export const aggregatorsDataValidator = getValidator(aggregatorsDataSchema, dataValidator)
export const aggregatorsDataResolver = resolve({})

// Schema for updating existing entries
export const aggregatorsPatchSchema = Type.Partial(aggregatorsSchema, {
  $id: 'AggregatorsPatch'
})
export const aggregatorsPatchValidator = getValidator(aggregatorsPatchSchema, dataValidator)
export const aggregatorsPatchResolver = resolve({})

// Schema for allowed query properties
export const aggregatorsQueryProperties = Type.Pick(aggregatorsSchema, ['id', 'from', 'to'])
export const aggregatorsQuerySchema = Type.Intersect(
  [
    querySyntax(aggregatorsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const aggregatorsQueryValidator = getValidator(aggregatorsQuerySchema, queryValidator)
export const aggregatorsQueryResolver = resolve({})
