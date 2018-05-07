
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Presentation',(table)=>{
    table.increments();
    table.integer('Presenter_id').unsigned();
    table.foreign('Presenter_id').references('Presenter.id');
    table.string('title',100);
    // table.decimal('location');
    table.specificType('location', 'POINT');
    table.string('address');
    table.dateTime('dateTime');
    table.timestamps(false,true);
  });
};

exports.down = function(knex, Promise) {
  
};
