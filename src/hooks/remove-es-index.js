export const removeEsIndex = async (context) => {
  const app = context.app;
  const article = context.result;

  await remove(article);

  async function remove(article) {
    const config = app.get('elasticsearch');
    const elastic = app.get('elasticClient');
    try {
      await elastic.delete({ index: config.searchIndex, id: article.id });
      await elastic.delete({ index: config.searchIndex + '-public', id: article.id });
    } catch(e) {}
  }
}
