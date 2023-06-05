import axios from 'axios'

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class NewsService {
  constructor(options) {
    this.options = options
  }

  async find(_params) {
    const response = (await axios.get(`https://bitungkota.go.id/api/v1/berita`)).data
    return response;
  }

  async get(id, _params) {
    return {
      id: 0,
      text: `A new message with ID: ${id}!`
    }
  }
}

export const getOptions = (app) => {
  return { app }
}
