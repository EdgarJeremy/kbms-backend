/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('articles', (table) => {
    table.dropColumn('access_level')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('articles', (table) => {
    table.enum('access_level', ['internal', 'department', 'public'])
  })
};
