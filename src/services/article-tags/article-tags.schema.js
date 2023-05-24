// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'
import { articlesSchema } from '../articles/articles.schema.js'
import { tagsSchema } from '../tags/tags.schema.js'

// Main data model schema
export const articleTagsSchema = Type.Object(
  {
    id: Type.Number(),
    article_id: Type.Number(),
    article: Type.Ref(articlesSchema),
    tag_id: Type.Number(),
    tag: Type.Ref(tagsSchema),
    created_at: Type.String(),
    updated_at: Type.String()
  },
  { $id: 'ArticleTags', additionalProperties: false }
)
export const articleTagsValidator = getValidator(articleTagsSchema, dataValidator)
export const articleTagsResolver = resolve({
  tag: virtual(async (data, context) => {
    if (data.tag_id)
      return await context.app.service('tags').get(data.tag_id);
    return null;
  })
})

export const articleTagsExternalResolver = resolve({})

// Schema for creating new entries
export const articleTagsDataSchema = Type.Pick(articleTagsSchema, ['tag_id', 'article_id'], {
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
export const articleTagsQueryProperties = Type.Pick(articleTagsSchema, ['id', 'article_id', 'tag_id', 'created_at', 'updated_at'])
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
