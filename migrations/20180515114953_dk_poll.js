
exports.up = function (knex, Promise) {
  return knex.schema.createTable('dk_poll', (table) => {
    table.increments();
    table.integer("vote0").unsigned();
    table.integer("vote1").unsigned();
    table.integer("vote2").unsigned();
    table.integer("vote3").unsigned();
    table.integer("vote4").unsigned();
    table.integer("vote5").unsigned();
    table.timestamps(false, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.deleteTable('dk_poll');
};