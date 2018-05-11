exports.up = function (knex, Promise) {
  return knex.schema.createTable('presenter', (table) => {
    table.increments();
    table.integer('login_id').unsigned();
    table.foreign('login_id').references('login.id');
    table.string('first_name',50);
    table.string('last_name',50);
    table.string('email', 100);
    table.integer('phone');
    table.string('company', 100);
    table.timestamps(false, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('presenter');
};