import { allSearch } from './all-search/all-search.js'

import { aggregators } from './aggregators/aggregators.js'

import { keywords } from './keywords/keywords.js'

import { terms } from './terms/terms.js'

import { articleTags } from './article-tags/article-tags.js'

import { tags } from './tags/tags.js'

import { categories } from './categories/categories.js'

import { search } from './search/search.js'

import { images } from './images/images.js'

import { departments } from './departments/departments.js'

import { articles } from './articles/articles.js'

import { user } from './users/users.js'

export const services = (app) => {
  app.configure(allSearch)

  app.configure(aggregators)

  app.configure(keywords)

  app.configure(terms)

  app.configure(articleTags)

  app.configure(tags)

  app.configure(categories)

  app.configure(search)

  app.configure(images)

  app.configure(departments)

  app.configure(articles)

  app.configure(user)

  // All services will be registered here
}
