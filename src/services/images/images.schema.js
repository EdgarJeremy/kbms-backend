// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const imagesSchema = Type.Object(
  {
    id: Type.Number(),
    data: Type.String(),
    name: Type.String(),
    mime: Type.String()
  },
  { $id: 'Images', additionalProperties: false }
)
export const imagesValidator = getValidator(imagesSchema, dataValidator)
export const imagesResolver = resolve({})

export const imagesExternalResolver = resolve({})

// Schema for creating new entries
export const imagesDataSchema = Type.Pick(imagesSchema, ['data', 'name'], {
  $id: 'ImagesData'
})
export const imagesDataValidator = getValidator(imagesDataSchema, dataValidator)
export const imagesDataResolver = resolve({
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
export const imagesPatchSchema = Type.Partial(imagesSchema, {
  $id: 'ImagesPatch'
})
export const imagesPatchValidator = getValidator(imagesPatchSchema, dataValidator)
export const imagesPatchResolver = resolve({})

// Schema for allowed query properties
export const imagesQueryProperties = Type.Pick(imagesSchema, ['id', 'text'])
export const imagesQuerySchema = Type.Intersect(
  [
    querySyntax(imagesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const imagesQueryValidator = getValidator(imagesQuerySchema, queryValidator)
export const imagesQueryResolver = resolve({})
