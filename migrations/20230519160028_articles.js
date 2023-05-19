/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('articles', (table) => {
    table.integer('category_id').references('id').inTable('categories')
    table.integer('tag_id').references('id').inTable('tags')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('articles', (table) => {
    table.dropColumn('category_id')
    table.dropColumn('tag_id')
  })
};
