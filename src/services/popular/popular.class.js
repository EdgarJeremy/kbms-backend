
// This is a skeleton for a custom service class. Remove or add the methods you need here
export class PopularService {
  constructor(options, app) {
    this.options = options
    this.app = app;
    this.limit = 6;
  }

  async get(id, _params) {
    if (id === 'keyword') return await this.keyword();
    if (id === 'category') return await this.category();
    if (id === 'term') return await this.term();
    if(id ==='tag') return await this.tag();

    throw new Error('Invalid type');
  }

  async keyword() {
    const knex = this.app.get('postgresqlClient');
    const result = await knex('keywords').select(knex.raw('text as value, count(text) as freq')).limit(this.limit).orderBy('freq', 'desc').groupBy('text');
    return result;
  }

  async category() {
    const knex = this.app.get('postgresqlClient');
    const result = await knex('categories').select('name as value', 'freq').limit(this.limit).orderBy('freq', 'desc')
    return result;
  }

  async term() {
    const knex = this.app.get('postgresqlClient');
    const result = await knex('terms').select('text as value', 'freq').limit(this.limit).orderBy('freq', 'desc')
    return result;
  }
  async tag() {
    const knex = this.app.get('postgresqlClient');
    const result = await knex('tags').select('name as value', 'freq').limit(this.limit).orderBy('freq', 'desc')
    return result;
  }

}

export const getOptions = (app) => {
  return { app }
}
