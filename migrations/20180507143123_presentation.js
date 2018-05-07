
exports.up = function(knex, Promise) {
  return knex.schema.createTable('presentation',(table)=>{
    table.increments();
    table.integer('presenter_id').unsigned();
    table.foreign('presenter_id').references('presenter.id');
    table.string('title',100);
    // table.decimal('location');
    table.specificType('location', 'point');
    table.string('address');
    table.dateTime('dateTime');
    table.timestamps(false,true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('presentation');
};
