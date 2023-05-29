import { stripHtml } from 'string-strip-html';
import _ from 'lodash';

export const registerEsIndex = async (context) => {
  const app = context.app;
  const article = context.result;

  if (article.access_level == 'public') {
    const result = await Promise.all([
      index(article, true),
      index(article, false)
    ]);
  } else {
    const result = await index(article, true);
  }

  async function index(article, internal) {
    const config = app.get('elasticsearch');
    const elastic = app.get('elasticClient');
    const articleDocument = await elastic.index({
      index: internal ? config.searchIndex : `${config.searchIndex}-public`,
      refresh: true,
      id: article.id,
      document: {
        headline: article.headline,
        content: stripHtml(article.content_raw).result,
        user_id: article.user_id,
        department_id: article.department_id ? article.department_id : -1,
        access_level: article.access_level,
        allowed_departments: !_.isEmpty(article.allowed_departments) ? article.allowed_departments : -1
      }
    });
  }
}
