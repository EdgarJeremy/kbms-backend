/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('articles', (table) => {
    table.integer('department_id').references('id').inTable('departments')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('articles', (table) => {
    table.dropColumn('department_id')
  })
};
