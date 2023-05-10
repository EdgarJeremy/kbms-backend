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
      content: stripHtml(article.content).result,
    }
  });
  console.log(articleDocument);
}
