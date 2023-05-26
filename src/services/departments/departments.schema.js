// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const departmentsSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    short_name: Type.String(),
  },
  { $id: 'Departments', additionalProperties: false }
)
export const departmentsValidator = getValidator(departmentsSchema, dataValidator)
export const departmentsResolver = resolve({})

export const departmentsExternalResolver = resolve({})

// Schema for creating new entries
export const departmentsDataSchema = Type.Pick(departmentsSchema, ['name', 'short_name'], {
  $id: 'DepartmentsData'
})
export const departmentsDataValidator = getValidator(departmentsDataSchema, dataValidator)
export const departmentsDataResolver = resolve({})

// Schema for updating existing entries
export const departmentsPatchSchema = Type.Partial(departmentsSchema, {
  $id: 'DepartmentsPatch'
})
export const departmentsPatchValidator = getValidator(departmentsPatchSchema, dataValidator)
export const departmentsPatchResolver = resolve({})

// Schema for allowed query properties
export const departmentsQueryProperties = Type.Pick(departmentsSchema, ['id', 'name', 'short_name'])
export const departmentsQuerySchema = Type.Intersect(
  [
    querySyntax(departmentsQueryProperties, {
      name: {
        $ilike: Type.String()
      }
    }),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const departmentsQueryValidator = getValidator(departmentsQuerySchema, queryValidator)
export const departmentsQueryResolver = resolve({})
