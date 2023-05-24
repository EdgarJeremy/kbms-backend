// This is a skeleton for a custom service class. Remove or add the methods you need here
export class SearchService {
  constructor(options, app) {
    this.options = options;
    this.app = app;
  }

  async find(_params) {
    const config = this.app.get('elasticsearch');
    const elastic = this.app.get('elasticClient');
    const user = _params.user;
    const q = _params.query.q;

    q.split(' ').forEach((term) => { this.recordTerm(term) });

    if (user) {
      const data = await elastic.search({
        index: config.searchIndex,
        from: _params.query.from ? _params.query.from : 0,
        size: _params.query.size ? _params.query.size : 10,
        query: {
          bool: {
            must: {
              multi_match: {
                query: `*${q}*`,
                fields: ['headline^2', 'content']
              },
            },
            should: [
              { term: { allowed_departments: user.department_id } },
              { term: { allowed_departments: null } }
            ]
          }
        }
      });
      return data;
    } else {
      const data = await elastic.search({
        index: config.searchIndex,
        from: _params.query.from ? _params.query.from : 0,
        size: _params.query.size ? _params.query.size : 10,
        query: {
          multi_match: {
            query: `*${q}*`,
            fields: ['headline^2', 'content']
          }
        }
      });
      return data;
    }
  }

  async recordTerm(term) {
    const found = (await this.app.service('terms').find({ query: { text: term.toLowerCase() } })).data[0];
    if (!found)
      await this.app.service('terms').create({ text: term.toLowerCase() });
    else
      await this.app.service('terms').patch(found.id, { freq: found.freq + 1 });
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
