import path from 'path';
import fs from 'fs';

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class UploadsService {
  constructor(options, app) {
    this.options = options
    this.app = app
  }
  async create(raw, params) {
    const file = params.file;

    raw.article_id = parseInt(raw.article_id);
    raw.name = file.originalname;
    raw.mime = file.mimetype;

    const result = await this.app.service('attachments').create(raw);

    const storagePath = path.resolve('./storage/');
    const ext = file.originalname.split('.')[file.originalname.split('.').length - 1];

    fs.writeFileSync(`${storagePath}/attachment-${result.id}.${ext}`, file.buffer, 'binary');

    return result;
  }
}

export const getOptions = (app) => {
  return { app }
}
