// This is a skeleton for a custom service class. Remove or add the methods you need here
export class AggregatorsService {
  constructor(options, app) {
    this.options = options
    this.app = app
  }
  async get(id, _params) {
    if (id === 'keywords') return await this.keywords()
  }

  async keywords() {
    const knex = app.get('postgresqlClient');
    const result = await knex('keywords').select(knex.raw('count(created_at) as count, date(created_at) as date')).groupByRaw('date(created_at)')
    return result;
  }
}

export const getOptions = (app) => {
  return { app }
}
