/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('article-tags', (table) => {
    table.increments('id')
    table.integer('article_id').references('id').inTable('articles').onDelete('CASCADE').onUpdate('CASCADE')
    table.integer('tag_id').references('id').inTable('tags').onDelete('CASCADE').onUpdate('CASCADE')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('article-tags')
}
