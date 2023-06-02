// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'
// import { articlesDataSchema } from '../articles/articles.schema.js'

// Main data model schema
export const attachmentsSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    mime: Type.String(),
    article_id: Type.Number(),
    created_at: Type.String(),
    updated_at: Type.String()
  },
  { $id: 'Attachments', additionalProperties: false }
)
export const attachmentsValidator = getValidator(attachmentsSchema, dataValidator)
export const attachmentsResolver = resolve({})

export const attachmentsExternalResolver = resolve({})

// Schema for creating new entries
export const attachmentsDataSchema = Type.Pick(attachmentsSchema, ['name', 'mime', 'article_id'], {
  $id: 'AttachmentsData'
})
export const attachmentsDataValidator = getValidator(attachmentsDataSchema, dataValidator)
export const attachmentsDataResolver = resolve({
  // data: async (value, raw, context) => {
  //   return Buffer.from(raw.data, 'base64');
  // },
})

// Schema for updating existing entries
export const attachmentsPatchSchema = Type.Partial(attachmentsSchema, {
  $id: 'AttachmentsPatch'
})
export const attachmentsPatchValidator = getValidator(attachmentsPatchSchema, dataValidator)
export const attachmentsPatchResolver = resolve({})

// Schema for allowed query properties
export const attachmentsQueryProperties = Type.Pick(attachmentsSchema, ['id', 'name', 'article_id'])
export const attachmentsQuerySchema = Type.Intersect(
  [
    querySyntax(attachmentsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const attachmentsQueryValidator = getValidator(attachmentsQuerySchema, queryValidator)
export const attachmentsQueryResolver = resolve({})
