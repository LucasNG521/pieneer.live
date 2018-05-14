exports.up = function (knex, Promise) {
    return knex.schema.table('polls', (table) => {
        table.dropColumn("pages_id");
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.table('polls', (table) => {
        table.integer("pages_id");
    })
};