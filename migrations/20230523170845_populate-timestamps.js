/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.alterTable('articles', (table) => table.timestamps(true))
    await knex.schema.alterTable('article-tags', (table) => table.timestamps(true))
    await knex.schema.alterTable('categories', (table) => table.timestamps(true))
    await knex.schema.alterTable('departments', (table) => table.timestamps(true))
    await knex.schema.alterTable('images', (table) => table.timestamps(true))
    await knex.schema.alterTable('tags', (table) => table.timestamps(true))
    
    await knex.schema.alterTable('terms', (table) => table.timestamps(true))
    await knex.schema.alterTable('users', (table) => table.timestamps(true))
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.alterTable('articles', (table) => table.dropTimestamps())
    await knex.schema.alterTable('article-tags', (table) => table.dropTimestamps())
    await knex.schema.alterTable('categories', (table) => table.dropTimestamps())
    await knex.schema.alterTable('departments', (table) => table.dropTimestamps())
    await knex.schema.alterTable('images', (table) => table.dropTimestamps())
    await knex.schema.alterTable('tags', (table) => table.dropTimestamps())
    
    await knex.schema.alterTable('terms', (table) => table.dropTimestamps())
    await knex.schema.alterTable('users', (table) => table.dropTimestamps())
};