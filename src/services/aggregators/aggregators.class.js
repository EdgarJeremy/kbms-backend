import moment from 'moment';

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class AggregatorsService {
  constructor(options, app) {
    this.options = options
    this.app = app
  }
  async get(id, _params) {
    const from = _params.query.from ? moment(_params.query.from) : moment();
    const to = _params.query.to ? moment(_params.query.to) : moment();

    if (id === 'keyword') return await this.keyword(from, to)

    return {
      type: 'unknown',
      from: from,
      to: to,
      data: []
    };
  }

  async keyword(from, to) {
    const knex = this.app.get('postgresqlClient');
    const result = await knex('keywords').select(knex.raw('count(created_at) as count, date(created_at) as date')).groupByRaw('date(created_at)')
    let list = enumerateBetweenMoment(from, to);

    const data = {
      type: 'keyword',
      from: from,
      to: to,
      data: list.map((l) => {
        let count = 0;
        for (let i = 0; i < result.length; i++) {
          const r = result[i];
          if (moment(l).isSame(moment(r.date))) {
            count = parseInt(r.count);
          }
        }
        return { count: count, date: l }
      })
    }
    return data;
  }
}


var enumerateBetweenMoment = function (start, end, interval = 'days') {
  const result = [];
  const currDate = moment(start);
  const lastDate = moment(end);
  result.push(currDate.clone().toDate());
  while (currDate.add(1, interval).diff(lastDate, interval) < 0) {
    result.push(currDate.clone().toDate());
  }
  result.push(lastDate.toDate());
  return result;
};

export const getOptions = (app) => {
  return { app }
}
