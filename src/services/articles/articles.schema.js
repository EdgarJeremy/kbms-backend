// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'
import { userSchema } from '../users/users.schema.js';
import { departmentsSchema } from '../departments/departments.schema.js'
import { categoriesSchema } from '../categories/categories.schema.js'
import { attachmentsSchema } from '../attachments/attachments.schema.js'

// Main data model schema
export const articlesSchema = Type.Object(
  {
    id: Type.Number(),
    headline: Type.String(),
    content: Type.String(),
    content_raw: Type.String(),
    user_id: Type.Number(),
    user: Type.Ref(userSchema),
    department_id: Type.Optional(Type.Number()),
    department: Type.Ref(departmentsSchema),
    category_id: Type.Number(),
    category: Type.Ref(categoriesSchema),
    tags: Type.Array(Type.Number()),
    attachments: Type.Array(Type.Ref(attachmentsSchema)),
    access_level: Type.Union([Type.Literal('internal'), Type.Literal('public')]),
    allowed_departments: Type.Optional(Type.Array(Type.Number())),
    created_at: Type.String(),
    updated_at: Type.String()
  },
  { $id: 'Articles', additionalProperties: false }
)
export const articlesValidator = getValidator(articlesSchema, dataValidator)
export const articlesResolver = resolve({
  user: virtual(async (data, context) => {
    if (data.user_id)
      return await context.app.service('users').get(data.user_id);
    return null;
  }),
  department: virtual(async (data, context) => {
    if (data.department_id)
      return await context.app.service('departments').get(data.department_id)
    return null;
  }),
  category: virtual(async (data, context) => {
    if (data.category_id)
      return await context.app.service('categories').get(data.category_id)
    return null;
  }),
  tags: virtual(async (data, context) => {
    return (await context.app.service('article-tags').find({ query: { article_id: data.id } })).data;
  }),
  attachments: virtual(async (data, context) => {
    return (await context.app.service('attachments').find({ query: { article_id: data.id } })).data;
  })
})

export const articlesExternalResolver = resolve({})

// Schema for creating new entries
export const articlesDataSchema = Type.Pick(articlesSchema, ['headline', 'content', 'content_raw', 'access_level', 'content_raw', 'category_id', 'tags', 'allowed_departments'], {
  $id: 'ArticlesData'
})
export const articlesDataValidator = getValidator(articlesDataSchema, dataValidator)
export const articlesDataResolver = resolve({
  user_id: async (value, data, context) => context.params.users.id,
  allowed_departments: async (value, data, context) => JSON.stringify(value)
})

// Schema for updating existing entries
export const articlesPatchSchema = Type.Partial(articlesSchema, {
  $id: 'ArticlesPatch'
})
export const articlesPatchValidator = getValidator(articlesPatchSchema, dataValidator)
export const articlesPatchResolver = resolve({
  allowed_departments: async (value, data, context) => JSON.stringify(value)
})

// Schema for allowed query properties
export const articlesQueryProperties = Type.Pick(articlesSchema, ['id', 'headline', 'content', 'category_id', 'department_id', 'access_level', 'created_at', 'updated_at'])
export const articlesQuerySchema = Type.Intersect(
  [
    querySyntax(articlesQueryProperties, {
      headline: {
        $ilike: Type.String()
      }
    }),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const articlesQueryValidator = getValidator(articlesQuerySchema, queryValidator)
export const articlesQueryResolver = resolve({})
