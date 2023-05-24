import { KnexService } from '@feathersjs/knex'

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ArticlesService extends KnexService {
  constructor(options, app) {
    super(options, app);
    this.app = app;
  }

  async create(data) {
    const tags = [...data.tags];
    delete data.tags;
    const article = await super.create(data);
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i]
      await this.app.service('article-tags').create({ tag_id: tag, article_id: article.id })
    }
    return article;
  }
}

export const getOptions = (app) => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'articles'
  }
}
