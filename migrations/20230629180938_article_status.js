/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.alterTable('articles', (table) => {
        table.enum('status', ['draft', 'review', 'verification', 'complete']).defaultTo('review')
        table.string('reject_note').nullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.alterTable('articles', (table) => {
        table.dropColumn('status')
        table.dropColumn('reject_note')
    })
};
