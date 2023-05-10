/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('articles', (table) => {
    table.increments('id')
    table.text('headline', 'long')
    table.text('content', 'long')
    table.integer('user_id').references('id').inTable('users')
  })
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('articles')
}
