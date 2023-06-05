// This is a skeleton for a custom service class. Remove or add the methods you need here
export class RelatedService {
  constructor(options, app) {
    this.options = options
    this.app = app;
  }

  async get(article_id, _params) {
    const config = this.app.get('elasticsearch');
    const elastic = this.app.get('elasticClient');

    const data = await elastic.search({
      index: config.searchIndex,
      size: 6,
      query: {
        more_like_this: {
          fields: ['content'],
          like: [{
            _index: config.searchIndex,
            _id: `${article_id}`
          }],
          min_term_freq: 1,
          max_query_terms: 10
        },
      }
    })

    return data;
  }
}

export const getOptions = (app) => {
  return { app }
}
