exports.up = function (knex, Promise) {
  return knex.schema.createTable('q_a', (table) => {
    table.increments();
    // TODO: remove me start
    table.integer('presentation_id').unsigned();
    table.foreign('presentation_id').references('presentation.id');
    // TODO: remove me end
    table.string('question');
    table.string('visiter_name', 100);
    table.integer('likes');
    table.timestamps(false, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('q_a');
};