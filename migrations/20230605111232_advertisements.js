/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('advertisements', (table) => {
    table.increments('id')
    table.binary('data')
    table.string('name')
    table.string('mime')
    table.timestamps(true, true)
  })
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('advertisements')
}
