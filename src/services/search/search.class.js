// This is a skeleton for a custom service class. Remove or add the methods you need here
export class SearchService {
  constructor(options, app) {
    this.options = options;
    this.app = app;
  }

  async find(_params) {
    const config = this.app.get('elasticsearch');
    const elasticSearch = this.app.get('elasticClient');
    const user = _params.user;

    const conds = user ? {
      should: [{
        term: { allowed_departments: null }
      }, {
        term: { allowed_departments: [user.department_id] }
      }]
    } : {
      must: [{
        term: { access_level: 'public' }
      }]
    }

    const data = await elasticSearch.search({
      index: config.index,
      from: _params.query.from ? _params.query.from : 0,
      size: _params.query.size ? _params.query.size : 10,
      query: {
        multi_match: {
          query: `*${_params.query.q}*`,
          fields: ['headline^2', 'content']
        },
        // bool: conds
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
