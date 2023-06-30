/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('articles', (table) => {
    table.integer('verified_by_id').references('id').inTable('users')
    table.integer('rejected_by_id').references('id').inTable('users')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('articles', (table) => {
    table.dropColumn('verified_by_id')
    table.dropColumn('rejected_by_id')
  })
};
