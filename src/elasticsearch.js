import { Client } from '@elastic/elasticsearch';
import fs from 'fs';

export const elasticSearch = (app) => {
  const config = app.get('elasticsearch');
  const elasticClient = new Client({
    node: config.node,
    auth: config.auth,
    tls: config.useSecure ? {
      ca: fs.readFileSync('./certs/elasticsearch.crt'),
      rejectUnauthorized: false
    } : undefined
  });
  app.set('elasticClient', elasticClient);
}