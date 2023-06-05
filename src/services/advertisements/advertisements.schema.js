// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const advertisementsSchema = Type.Object(
  {
    id: Type.Number(),
    data: Type.String(),
    name: Type.String(),
    mime: Type.String(),
    created_at: Type.String(),
    updated_at: Type.String()
  },
  { $id: 'Advertisements', additionalProperties: false }
)
export const advertisementsValidator = getValidator(advertisementsSchema, dataValidator)
export const advertisementsResolver = resolve({})

export const advertisementsExternalResolver = resolve({})

// Schema for creating new entries
export const advertisementsDataSchema = Type.Pick(advertisementsSchema, ['data', 'name'], {
  $id: 'AdvertisementsData'
})
export const advertisementsDataValidator = getValidator(advertisementsDataSchema, dataValidator)
export const advertisementsDataResolver = resolve({
  data: async (value, raw, context) => {
    const b64 = raw.data;
    const data = b64.split(',')[1];
    return Buffer.from(data, 'base64');
  },
  mime: async (value, raw, context) => {
    const b64 = raw.data;
    const mime = b64.split(',')[0].replace('data:', '').replace(';base64', '');
    return mime;
  }
})

// Schema for updating existing entries
export const advertisementsPatchSchema = Type.Partial(advertisementsSchema, {
  $id: 'AdvertisementsPatch'
})
export const advertisementsPatchValidator = getValidator(advertisementsPatchSchema, dataValidator)
export const advertisementsPatchResolver = resolve({})

// Schema for allowed query properties
export const advertisementsQueryProperties = Type.Pick(advertisementsSchema, ['id', 'name', 'mime', 'created_at', 'updated_at'])
export const advertisementsQuerySchema = Type.Intersect(
  [
    querySyntax(advertisementsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const advertisementsQueryValidator = getValidator(advertisementsQuerySchema, queryValidator)
export const advertisementsQueryResolver = resolve({})
