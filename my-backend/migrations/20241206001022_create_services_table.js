/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('services', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.decimal('car', 10, 2);
        table.decimal('van', 10, 2);
        table.decimal('minibus', 10, 2);
        table.decimal('midi_bus', 10, 2);
        table.decimal('bus', 10, 2);
        table.decimal('f_ht', 10, 2);
        table.decimal('f_ss', 10, 2);
        table.decimal('g_ht', 10, 2);
        table.decimal('g_ss', 10, 2);
        table.string('abf');
        table.string('lun');
        table.string('din');
        table.string('fees');
        table.string('misc');
        table.string('guid');
        table.string('excursion_details');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('services');
};
