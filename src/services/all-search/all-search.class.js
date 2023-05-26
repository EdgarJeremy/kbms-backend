// This is a skeleton for a custom service class. Remove or add the methods you need here
export class AllSearchService {
  constructor(options, app) {
    this.options = options
    this.app = app
  }

  async find(_params) {
    const config = this.app.get('elasticsearch');
    const elastic = this.app.get('elasticClient');
    const user = _params.users;
    const q = _params.query.q;

    this.recordKeyword(q);
    q.split(' ').forEach((term) => { this.recordTerm(term) });

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
            { term: { allowed_departments: user.department_id ? user.department_id : -1 } },
            { term: { allowed_departments: -1 } }
          ],
          minimum_should_match: 1
        }
      }
    });
    return data;
  }


  async recordTerm(term) {
    const found = (await this.app.service('terms').find({ query: { text: term.toLowerCase().trim() } })).data[0];
    if (!found)
      await this.app.service('terms').create({ text: term.toLowerCase().trim() });
    else
      await this.app.service('terms').patch(found.id, { freq: found.freq + 1 });
  }

  async recordKeyword(keyword) {
    await this.app.service('keywords').create({ text: keyword.toLowerCase().trim() });
  }
}

export const getOptions = (app) => {
  return { app }
}
