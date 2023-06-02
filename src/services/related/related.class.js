// This is a skeleton for a custom service class. Remove or add the methods you need here
export class RelatedService {
  constructor(options) {
    this.options = options
  }

  async get(article_id, _params) {
    return {
      id: 0,
      text: `A new message with ID: ${id}!`
    }
  }
}

export const getOptions = (app) => {
  return { app }
}
