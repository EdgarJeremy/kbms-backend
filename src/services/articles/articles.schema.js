// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'
import { userSchema } from '../users/users.schema.js';
import { departmentsSchema } from '../departments/departments.schema.js'
import { categoriesSchema } from '../categories/categories.schema.js'
import { tagsSchema } from '../tags/tags.schema.js';

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
    tag_id: Type.Number(),
    tag: Type.Ref(tagsSchema),
    access_level: Type.Union([Type.Literal('internal'), Type.Literal('public')]),
    allowed_departments: Type.Array(Type.Number())
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
    if(data.category_id)
      return await context.app.service('categories').get(data.category_id)
    return null;
  }),
  tag: virtual(async (data, context) => {
    if(data.tag_id)
      return await context.app.service('tags').get(data.tag_id);
    return null;
  })
})

export const articlesExternalResolver = resolve({})

// Schema for creating new entries
export const articlesDataSchema = Type.Pick(articlesSchema, ['headline', 'content', 'content_raw', 'access_level', 'content_raw'], {
  $id: 'ArticlesData'
})
export const articlesDataValidator = getValidator(articlesDataSchema, dataValidator)
export const articlesDataResolver = resolve({
  user_id: async (value, data, context) => context.params.users.id
})

// Schema for updating existing entries
export const articlesPatchSchema = Type.Partial(articlesSchema, {
  $id: 'ArticlesPatch'
})
export const articlesPatchValidator = getValidator(articlesPatchSchema, dataValidator)
export const articlesPatchResolver = resolve({})

// Schema for allowed query properties
export const articlesQueryProperties = Type.Pick(articlesSchema, ['id', 'headline', 'content', 'department_id', 'access_level'])
export const articlesQuerySchema = Type.Intersect(
  [
    querySyntax(articlesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const articlesQueryValidator = getValidator(articlesQuerySchema, queryValidator)
export const articlesQueryResolver = resolve({})
