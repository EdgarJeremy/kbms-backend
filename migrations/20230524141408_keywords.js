/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('keywords', (table) => {
    table.increments('id')
    table.string('text')
    table.integer('freq').defaultTo(0)
    table.timestamps(true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('keywords')
}
