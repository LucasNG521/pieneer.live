
exports.up = function (knex, Promise) {
  return knex.schema.createTable('login', (table) => {
    table.increments();
    table.string('username', 100);
    table.string('password', 20);
    table.json('social_login');
    table.timestamps(false, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('login');
};