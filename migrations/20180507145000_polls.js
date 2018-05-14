exports.up = function (knex, Promise) {
  return knex.schema.createTable('polls', (table) => {
    table.increments();
    // FIXME: Remove start
    table.integer('pages_id').unsigned();
    table.foreign('pages_id').references('pages.id');
    // FIXME: Remove end
    table.string('question');
    table.json('answer_content');
    table.json('style');
    table.timestamps(false, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('polls');
};