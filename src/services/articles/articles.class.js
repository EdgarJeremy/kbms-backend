import { KnexService } from '@feathersjs/knex'

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ArticlesService extends KnexService {
  constructor(options, app) {
    super(options, app);
    this.app = app;
  }

  async get(id, params) {
    const article = await super.get(id, params);
    const user = params.users;
    if (article.access_level === 'internal')
      if (!user) throw new Error('Access denied');

    return article;
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

  async patch(id, data) {
    data.allowed_departments = null;
    let tags = [];
    if (data.tags) tags = [...data.tags]
    delete data.tags;
    data.updated_at = new Date();
    const article = await super.patch(id, data);
    const ats = (await this.app.service('article-tags').find({ query: { article_id: id } }));
    if (tags.length > 0) {
      for (let i = 0; i < ats.data.length; i++) {
        await this.app.service('article-tags').remove(ats.data[i].id);
      }
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i]
        await this.app.service('article-tags').create({ tag_id: tag, article_id: article.id })
      }
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
