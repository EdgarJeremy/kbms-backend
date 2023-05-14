import { stripHtml } from 'string-strip-html';

export const registerEsIndex = async (context) => {
  const app = context.app;
  const config = app.get('elasticsearch');
  const article = context.result;
  const elasticClient = app.get('elasticClient');
  const articleDocument = await elasticClient.index({
    index: config.searchIndex,
    refresh: true,
    id: article.id,
    document: {
      headline: article.headline,
      content: stripHtml(article.content_raw).result,
      user_id: article.user_id,
      department_id: article.department_id,
      access_level: article.access_level,
      allowed_departments: article.allowed_departments
    }
  });
  console.log(articleDocument);
}
