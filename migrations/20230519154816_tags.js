export async function up(knex) {
  await knex.schema.createTable('tags', (table) => {
    table.increments('id')
    table.string('name')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('tags')
}
