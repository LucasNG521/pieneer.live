exports.up = function (knex, Promise) {
    return knex.schema.table('pages', (table) => {
        table.string('img_url');
        table.integer('poll_id');
        table.integer('q_a_id');
        table.foreign('poll_id').references('polls.id');
        table.foreign('q_a_id').references('q_a.id');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table('pages', (table) => {
        table.dropColumn('img_url');
    });
};