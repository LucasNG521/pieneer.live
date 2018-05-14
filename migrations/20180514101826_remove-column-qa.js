exports.up = function (knex, Promise) {
    return knex.schema.table('q_a', (table) => {
        table.dropColumn("presentation_id");
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.table('q_a', (table) => {
        table.integer("presentation_id");
    })
};