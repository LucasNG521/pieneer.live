
exports.up = function (knex, Promise) {
  return knex.schema.createTable('q_a', (table) => {
    table.increments();
    table.string('q_a_question');
    table.string('nickname', 100);
    table.integer('likes');
    table.timestamps(false, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('q_a');
};