// This is a skeleton for a custom service class. Remove or add the methods you need here
export class SearchService {
  constructor(options, app) {
    this.options = options;
    this.app = app;
  }

  async find(_params) {
    const config = this.app.get('elasticsearch');
    const elastic = this.app.get('elasticClient');
    const q = _params.query.q;

    this.recordKeyword(q);
    q.split(' ').forEach((term) => { this.recordTerm(term) });

    const data = await elastic.search({
      index: config.searchIndex + '-public',
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
