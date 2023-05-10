import { search } from './search/search.js'

import { images } from './images/images.js'

import { departments } from './departments/departments.js'

import { articles } from './articles/articles.js'

import { user } from './users/users.js'

export const services = (app) => {
  app.configure(search)

  app.configure(images)

  app.configure(departments)

  app.configure(articles)

  app.configure(user)

  // All services will be registered here
}
