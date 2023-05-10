// This is a skeleton for a custom service class. Remove or add the methods you need here
export class SearchService {
  constructor(options, app) {
    this.options = options;
    this.app = app;
  }

  async find(_params) {
    const config = this.app.get('elasticsearch');
    const elasticSearch = this.app.get('elasticClient');
    const data = await elasticSearch.search({
      index: config.index,
      query: {
        multi_match: {
          query: _params.query.q,
          fields: ['headline', 'content']
        }
      }
    });
    return data;
  }

  async get(id, _params) { }
  async create(data, params) { }

  // This method has to be added to the 'methods' option to make it available to clients
  async update(id, data, _params) { }

  async patch(id, data, _params) { }

  async remove(id, _params) { }
}

export const getOptions = (app) => {
  return { app }
}
