import { stripHtml } from 'string-strip-html';

export const updateEsIndex = async (context) => {
  const app = context.app;
  const article = context.result;
  const data = context.data;

  if (article.status === 'complete') {
    if (data.status !== 'complete') {
      // Patch action after verification complete
      if (article.access_level == 'public') {
        const result = await Promise.all([
          update(article, true),
          update(article, false)
        ]);
      } else {
        const result = await update(article, true);
      }
    } else {
      // Patch action to verificate article
      if (article.access_level == 'public') {
        const result = await Promise.all([
          index(article, true),
          index(article, false)
        ]);
      } else {
        const result = await index(article, true);
      }
    }
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

  async function update(article, internal) {
    const config = app.get('elasticsearch');
    const elastic = app.get('elasticClient');
    const articleDocument = await elastic.update({
      index: internal ? config.searchIndex : `${config.searchIndex}-public`,
      refresh: true,
      id: article.id,
      doc: {
        headline: article.headline,
        content: stripHtml(article.content_raw).result,
        user_id: article.user_id,
        department_id: article.department_id ? article.department_id : -1,
        access_level: article.access_level,
        allowed_departments: article.allowed_departments ? article.allowed_departments : -1
      }
    });
  }
}